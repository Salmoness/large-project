import 'dart:convert';
import 'package:flutter/material.dart';
import '../utils/snackbars.dart';
import '../utils/api_base_url.dart';
import '../utils/api_fetcher.dart';
import '../utils/center_widget.dart';
import '../utils/debug_mode_print.dart';
import '../utils/jwt_storage.dart';
import '../utils/jwt_types.dart';

class GameView extends StatefulWidget {
  final List<Map<String, dynamic>> questions;
  final String quizGameId;

  const GameView({
    super.key,
    required this.questions,
    required this.quizGameId,
  });

  @override
  GameViewState createState() => GameViewState();
}

class GameViewState extends State<GameView> {
  // The entire design of this is not ideal. The user is given
  // full access to the questions, their answers, and can return
  // any "totalScore" they want to.
  // (I will admit doing it this way simplifies the API, though.)
  int currentQuestionIndex = 0;
  int totalScore = 0;
  int totalCorrect = 0;
  bool isLoading = false;
  bool isFinished = false;
  late DateTime questionStartTime;
  int maxPointsPerQuestion = 1000;
  Duration maxDuration = Duration(seconds: 20);

  @override
  void initState() {
    super.initState();
    handleLoadQuestion();
  }

  Future<void> handleLoadQuestion() async {
    setState(() => isLoading = true);
    debugModePrint('Current question index: $currentQuestionIndex');
    final isLastQuestion = currentQuestionIndex >= widget.questions.length - 1;
    if (isLastQuestion) {
      handleSubmitQuiz();
    } else {
      setState(() {
        questionStartTime = DateTime.now();
        currentQuestionIndex++;
        isLoading = false;
      });
    }
  }

  Future<void> handleSelectAnswer(String selectedAnswer) async {
    setState(() => isLoading = true);
    String correctAnswer =
        widget.questions[currentQuestionIndex]['correctAnswer'];
    debugModePrint('Selected answer: $selectedAnswer');
    debugModePrint('Expected/correct answer: $correctAnswer');
    if (selectedAnswer == correctAnswer) {
      final elapsed = DateTime.now().difference(questionStartTime);
      final elapsedSeconds = elapsed.inMilliseconds / 1000.0;
      double decayRate = maxPointsPerQuestion / maxDuration.inSeconds;
      int score = (maxPointsPerQuestion - (decayRate * elapsedSeconds))
          .clamp(0, 1000)
          .toInt();
      totalScore += score;
      totalCorrect++;
      debugModePrint('Got a score of: $score for this question.');
      debugModePrint('Correct!');
    }
    setState(() => isLoading = false);
    handleLoadQuestion();
  }

  Future<void> handleSubmitQuiz() async {
    debugModePrint('Final score is $totalScore');
    try {
      final jwtStr = await JWTStorage.getJWT(JWTType.quizSession);
      final response = await fetchAPI(
        url: '${getAPIBaseURL()}/quiz/submit',
        body: {'jwt': jwtStr, 'score': totalScore},
      );
      final Map<String, dynamic> responseJSON = jsonDecode(response.body);
      if (responseJSON['error'] != null && responseJSON['error'] != '') {
        throw Exception(responseJSON['error']);
      }
      setState(() {
        isLoading = false;
        isFinished = true;
      });
    } catch (e) {
      setState(() {
        debugModePrint('Exception: $e');
        if (mounted) context.notifyUserOfServerError();
      });
    }
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

  Future<void> handleViewScoreboard() async {
    setState(() => isLoading = true);
    Navigator.pushReplacementNamed(
      context,
      '/scoreboard',
      arguments: widget.quizGameId,
    );
  }

  @override
  Widget build(BuildContext context) {
    final game = [
      Text(
        widget.questions[currentQuestionIndex]['question'],
        style: TextStyle(fontSize: 20),
        textAlign: TextAlign.center,
      ),
      SizedBox(height: 24),
      Expanded(
        child: GridView.count(
          crossAxisCount: 2,
          mainAxisSpacing: 12,
          crossAxisSpacing: 12,
          children:
              List<String>.from(
                widget.questions[currentQuestionIndex]['options'],
              ).map((answer) {
                return ElevatedButton(
                  onPressed: () => handleSelectAnswer(answer),
                  child: Text(answer, textAlign: TextAlign.center),
                );
              }).toList(),
        ),
      ),
    ];

    final finished = [
      Text('Your score is $totalScore'),
      SizedBox(height: 12),
      Text('($totalCorrect / ${widget.questions.length} correct answers)'),
      SizedBox(height: 12),
      ElevatedButton(
        onPressed: handleViewScoreboard,
        child: Text('View Scoreboard'),
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
        children: isLoading
            ? [CircularProgressIndicator()]
            : isFinished
            ? finished
            : game,
      ),
    );
  }
}
