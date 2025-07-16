import 'package:flutter/material.dart';
import 'views/scoreboard.dart';
import 'views/index.dart';
import 'views/login.dart';
import 'views/home.dart';
import 'views/play.dart';
import 'views/game.dart';

void main() => runApp(TrivAIMobileApp());

class TrivAIMobileApp extends StatelessWidget {
  const TrivAIMobileApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'TrivAI Mobile Application',
      initialRoute: '/',
      routes: {
        '/': (context) => IndexView(),
        '/play': (context) => PlayView(),
        '/game': (context) {
          final quizGameId =
              ModalRoute.of(context)!.settings.arguments as String;
          return GameView(quizGameId: quizGameId);
        },
        '/home': (context) => HomeView(),
        '/login': (context) => LoginView(),
        '/scoreboard': (context) {
          final quizGameId =
              ModalRoute.of(context)!.settings.arguments as String;
          return ScoreboardView(quizGameId: quizGameId);
        },
      },
    );
  }
}
