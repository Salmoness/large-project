import 'package:flutter/material.dart';
import '../user_auth_only_view.dart';
import '../list_item_card.dart';

class HistoryView extends StatefulWidget {
  const HistoryView({super.key});

  @override
  HistoryViewState createState() => HistoryViewState();
}

class HistoryViewState extends State<HistoryView> {
  List<Map<String, dynamic>> quizzes = [];
  bool isLoading = true;

  @override
  void initState() {
    super.initState();
    fetchAllQuizzes();
  }

  Future<void> fetchAllQuizzes() async {
    /*
   do api here
    */

    // TODO(Aaron): API
    await Future.delayed(Duration(seconds: 2));
    setState(() {
      isLoading = false;
      quizzes = [
        {
          "title": "Title",
          "description": "Description",
          "quiz_game_id": "5ecd3bbf875e60b4166f6699",
        },
      ];
    });
  }

  void handleScoreboard(String quizGameId) {
    Navigator.pushNamed(context, '/scoreboard', arguments: quizGameId);
  }

  @override
  Widget build(BuildContext context) {
    return UserAuthOnlyView(
      appBar: AppBar(title: Text('Quiz History')),
      child: isLoading
          ? Center(child: CircularProgressIndicator())
          : quizzes.isEmpty
          ? Center(child: Text("You have not played any quizzes yet!"))
          : Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                children: [
                  Text(
                    "Browse quizzes you've played previously",
                    style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                  ),
                  SizedBox(height: 12),
                  Expanded(
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
                                style: TextStyle(
                                  fontSize: 16,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                              SizedBox(height: 4),
                              Text(quiz['description']),
                            ],
                          ),
                          actions: ElevatedButton(
                            onPressed: () =>
                                handleScoreboard(quiz['quiz_game_id']),
                            child: Text('View Scoreboard'),
                          ),
                        );
                      },
                    ),
                  ),
                ],
              ),
            ),
    );
  }
}
