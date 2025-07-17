import 'package:flutter/material.dart';

class GameView extends StatefulWidget {
  const GameView({super.key, required String quizGameId});

  @override
  GameViewState createState() => GameViewState();
}

class GameViewState extends State<GameView> {
  String questionText = '';
  List<String> answers = [];
  int questionId = 0;
  bool isLoading = true;

  @override
  void initState() {
    super.initState();
    fetchQuestion();
  }

  Future<void> fetchQuestion() async {
    setState(() => isLoading = true);

    /*
    do api here
    */

    // TODO(Aaron): API
    await Future.delayed(Duration(seconds: 2));
    setState(() {
      questionText = "Question";
      answers = ["Answer 1", "Answer 2", "Answer 3", "Answer 4"];
      questionId = 0;
      isLoading = false;
    });
  }

  Future<void> handleSubmitAnswer(String selectedAnswer) async {
    setState(() => isLoading = true);

    /*
    final response = await http.post(
      Uri.parse('https://your-api.com/submit-answer'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({
        'questionId': questionId,
        'selectedAnswer': selectedAnswer,
      }),
    );

    if (response.statusCode == 200) {
      await fetchQuestion();
    } else {
      setState(() => isLoading = false);
      if (mounted) context.notifyServerError();
    }
    */

    // TODO(Aaron): API
    await Future.delayed(Duration(seconds: 2));
    setState(() {
      isLoading = false;
    });
    await fetchQuestion();
  }

  @override
  Widget build(BuildContext context) {
    if (isLoading) {
      return Scaffold(
        appBar: AppBar(title: Text('Quiz')),
        body: Center(child: CircularProgressIndicator()),
      );
    }

    return Scaffold(
      appBar: AppBar(title: Text('Quiz')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            Text(
              questionText,
              style: TextStyle(fontSize: 20),
              textAlign: TextAlign.center,
            ),
            SizedBox(height: 24),
            Expanded(
              child: GridView.count(
                crossAxisCount: 2,
                mainAxisSpacing: 12,
                crossAxisSpacing: 12,
                children: answers.map((answer) {
                  return ElevatedButton(
                    onPressed: () => handleSubmitAnswer(answer),
                    child: Text(answer, textAlign: TextAlign.center),
                  );
                }).toList(),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
