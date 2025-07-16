import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:mobile/api_base_url.dart';
import 'package:mobile/snackbars.dart';

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

    final response = await http.get(Uri.parse('$getAPIBaseURL()/TODO'));

    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);

      if (data['end'] == true) {
        if (mounted) Navigator.pushReplacementNamed(context, '/scoreboard');
        return;
      }

      setState(() {
        questionText = data['question'];
        answers = List<String>.from(data['answers']);
        questionId = data['id'];
        isLoading = false;
      });
    } else {
      setState(() => isLoading = false);
      if (mounted) context.notifyServerError();
    }
  }

  Future<void> handleSubmitAnswer(String selectedAnswer) async {
    setState(() => isLoading = true);

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
