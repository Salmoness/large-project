import 'dart:convert';
import 'package:flutter/material.dart';
import '../utils/snackbars.dart';
import '../utils/debug_mode_print.dart';
import '../utils/list_item_card.dart';
import '../utils/user_auth_only_widget.dart';
import '../utils/api_base_url.dart';
import '../utils/api_fetcher.dart';

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
      final responseTEXT = await fetchAPI(
        url: '${getAPIBaseURL()}/quiz/search',
        body: {'search': ''},
      );
      final Map<String, dynamic> responseJSON = jsonDecode(responseTEXT);
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
                Text(quiz['description']),
              ],
            ),
            actions: ElevatedButton(
              onPressed: () => handleHost(quiz['quiz_id']),
              child: Text('Host'),
            ),
          );
        },
      ),
    );

    return UserAuthOnly(
      child: Scaffold(
        appBar: AppBar(title: Text('Browse Quizzes')),
        body: Padding(
          padding: const EdgeInsets.all(12.0),
          child: Column(
            children: [
              SizedBox(height: 12),
              Text(
                "Browse quizzes that you or others have created",
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
