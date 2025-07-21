import 'dart:convert';
import 'package:flutter/material.dart';
import '../utils/api_fetcher.dart';
import '../utils/jwt_types.dart';
import '../utils/jwt_api.dart';
import '../utils/jwt_storage.dart';
import '../utils/snackbars.dart';
import '../utils/debug_mode_print.dart';
import '../utils/list_item_card.dart';
import '../utils/user_auth_only_widget.dart';
import '../utils/api_base_url.dart';

class BrowseView extends StatefulWidget {
  const BrowseView({super.key});

  @override
  BrowseViewState createState() => BrowseViewState();
}

class BrowseViewState extends State<BrowseView> {
  List<dynamic> quizzes = [];
  bool isLoading = true;

  @override
  void initState() {
    super.initState();
    fetchAllQuizzes();
  }

  Future<void> fetchAllQuizzes() async {
    try {
      final jwtStr = await JWTStorage.getJWT(JWTType.userAuth);
      final response = await fetchAPI(
        url: '${getAPIBaseURL()}/quiz/search',
        body: {'search': '', 'jwt': jwtStr},
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
        quizzes = responseJSON['quizzes'] ?? [];
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

  void handleHost(String quizId) {
    Navigator.pushNamed(context, '/host', arguments: quizId);
  }

  @override
  Widget build(BuildContext context) {
    final browser = Expanded(
      child: ListView.builder(
        itemCount: quizzes.length,
        itemBuilder: (context, index) {
          final quiz = quizzes[index];
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
              onPressed: () => handleHost(quiz['_id']),
              child: Text('Host'),
            ),
          );
        },
      ),
    );

    return AuthedOnly(
      child: Scaffold(
        appBar: AppBar(title: Text('Browse Quizzes')),
        body: Padding(
          padding: const EdgeInsets.all(12.0),
          child: Column(
            children: [
              SizedBox(height: 12),
              Text(
                "Quizzes that you or others have created",
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
              ),
              SizedBox(height: 12),
              isLoading
                  ? Center(child: CircularProgressIndicator())
                  : quizzes.isEmpty
                  ? Center(child: Text("No quizzes have been made yet!"))
                  : browser,
            ],
          ),
        ),
      ),
    );
  }
}
