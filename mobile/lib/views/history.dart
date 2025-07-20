import 'dart:convert';
import 'package:flutter/material.dart';
import '../utils/jwt_api.dart';
import '../utils/jwt_storage.dart';
import '../utils/jwt_types.dart';
import '../utils/snackbars.dart';
import '../utils/api_base_url.dart';
import '../utils/api_fetcher.dart';
import '../utils/debug_mode_print.dart';
import '../utils/user_auth_only_widget.dart';
import '../utils/list_item_card.dart';

class HistoryView extends StatefulWidget {
  const HistoryView({super.key});

  @override
  HistoryViewState createState() => HistoryViewState();
}

class HistoryViewState extends State<HistoryView> {
  List<dynamic> playedQuizzes = [];
  bool isLoading = true;

  @override
  void initState() {
    super.initState();
    fetchPlayedQuizzes();
  }

  Future<void> fetchPlayedQuizzes() async {
    try {
      final jwtStr = await JWTStorage.getJWT(JWTType.userAuth);
      final response = await fetchAPI(
        url: '${getAPIBaseURL()}/quiz/history',
        body: {'jwt': jwtStr},
      );
      final Map<String, dynamic> responseJSON = jsonDecode(response.body);
      handleAPIJWTAndRefresh(
        state: this,
        response: response,
        type: JWTType.userAuth,
        refresh: responseJSON['jwt'],
      );
      if (responseJSON['error'] != null && responseJSON['error'] != '') {
        throw Exception(responseJSON['error']);
      }
      setState(() {
        playedQuizzes = responseJSON['history'] ?? [];
      });
    } catch (e) {
      setState(() {
        debugModePrint('Exception: $e');
        if (mounted) context.notifyUserOfServerError();
      });
    } finally {
      setState(() {
        isLoading = false;
      });
    }
  }

  void handleScoreboard(String quizGameId) {
    Navigator.pushNamed(context, '/scoreboard', arguments: quizGameId);
  }

  @override
  Widget build(BuildContext context) {
    final history = Expanded(
      child: ListView.builder(
        itemCount: playedQuizzes.length,
        itemBuilder: (context, index) {
          final quiz = playedQuizzes[index];
          return ItemListCard(
            content: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  quiz['title'],
                  style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                ),
                SizedBox(height: 4),
                Text(quiz['summary']),
              ],
            ),
            actions: ElevatedButton(
              onPressed: () => handleScoreboard(quiz['game_quiz_id']),
              child: Text('View Scoreboard'),
            ),
          );
        },
      ),
    );

    return AuthedOnly(
      child: Scaffold(
        appBar: AppBar(title: Text('Quiz History')),
        body: Padding(
          padding: const EdgeInsets.all(12.0),
          child: Column(
            children: [
              SizedBox(height: 12),
              Text(
                "Browse quizzes that you've previously completed",
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
              ),
              SizedBox(height: 12),
              isLoading
                  ? Center(child: CircularProgressIndicator())
                  : playedQuizzes.isEmpty
                  ? Center(
                      child: Text("You have not completed any quizzes yet!"),
                    )
                  : history,
            ],
          ),
        ),
      ),
    );
  }
}
