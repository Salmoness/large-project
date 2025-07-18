import 'package:flutter/material.dart';
import '../utils/center_widget.dart';

class GameView extends StatefulWidget {
  const GameView({super.key, required String quizGameId});

  @override
  GameViewState createState() => GameViewState();
}

class GameViewState extends State<GameView> {
  String questionText = '';
  List<String> answers = [];
  int questionId = 0;
  bool isLoading = false;

  @override
  void initState() {
    super.initState();
    handleLoadQuestion();
  }

  Future<void> handleLoadQuestion() async {
    setState(() => isLoading = true);
    // TODO(Aaron): add logic for this
    setState(() => isLoading = false);
  }

  Future<void> handleSelectAnswer(String selectedAnswer) async {
    setState(() => isLoading = true);
    // TODO(Aaron): add logic for this
    setState(() => isLoading = false);
  }

  Future<void> handleSubmitQuiz() async {
    setState(() => isLoading = true);
    // TODO(Aaron): add logic for this (the entire quiz is done, submit it)
    setState(() => isLoading = false);
  }

  Future<void> requestUserExitConfirmation() async {
    bool? confirmed = await showDialog<bool>(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('Are you sure?'),
          content: const Text('You won\'t be able to come back to this quiz'),
          actions: <Widget>[
            TextButton(
              child: const Text('Exit quiz'),
              onPressed: () => Navigator.of(context).pop(true),
            ),
            TextButton(
              child: const Text('Continue playing'),
              onPressed: () => Navigator.of(context).pop(false),
            ),
          ],
        );
      },
    );
    if (confirmed!) {
      if (mounted) Navigator.of(context).pop();
    }
  }

  @override
  Widget build(BuildContext context) {
    final content = [
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
              onPressed: () => handleSelectAnswer(answer),
              child: Text(answer, textAlign: TextAlign.center),
            );
          }).toList(),
        ),
      ),
    ];

    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          icon: const Icon(Icons.close),
          onPressed: () => requestUserExitConfirmation(),
        ),
        title: const Text('Playing Quiz'),
      ),
      body: SuperCentered(
        children: isLoading ? [CircularProgressIndicator()] : content,
      ),
    );
  }
}
