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
  bool isLoading = true;

  @override
  void initState() {
    super.initState();
    fetchQuestion();
  }

  Future<void> fetchQuestion() async {
    setState(() => isLoading = true);

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

    // TODO(Aaron): API
    await Future.delayed(Duration(seconds: 2));
    setState(() {
      isLoading = false;
    });
    await fetchQuestion();
  }

  Future<void> requestUserConfirmation() async {
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
              onPressed: () => handleSubmitAnswer(answer),
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
          onPressed: () => requestUserConfirmation(),
        ),
        title: const Text('Playing Quiz'),
      ),
      body: SuperCentered(
        children: isLoading ? [CircularProgressIndicator()] : content,
      ),
    );
  }
}
