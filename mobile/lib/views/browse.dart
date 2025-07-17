import 'package:flutter/material.dart';
import '../list_item_card.dart';
import '../user_auth_only_view.dart';

class BrowseView extends StatefulWidget {
  const BrowseView({super.key});

  @override
  BrowseViewState createState() => BrowseViewState();
}

class BrowseViewState extends State<BrowseView> {
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
        {"title": "Title", "description": "Description", "quiz_id": "abc123"},
      ];
    });
  }

  void handleHost(String quizId) {
    Navigator.pushNamed(context, '/host', arguments: quizId);
  }

  @override
  Widget build(BuildContext context) {
    return UserAuthOnlyView(
      appBar: AppBar(title: Text('Browse Quizzes')),
      child: isLoading
          ? Center(child: CircularProgressIndicator())
          : quizzes.isEmpty
          ? Center(child: Text("No quizzes have been made yet!"))
          : Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                children: [
                  Text(
                    "Browse quizzes you or others have created",
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
                            onPressed: () => handleHost(quiz['quiz_id']),
                            child: Text('Host'),
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
