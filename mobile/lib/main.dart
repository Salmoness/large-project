import 'package:flutter/material.dart';
import 'views/scoreboard.dart';
import 'views/index.dart';
import 'views/login.dart';
import 'views/home.dart';
import 'views/play.dart';
import 'views/game.dart';
import 'views/browse.dart';
import 'views/create.dart';
import 'views/history.dart';
import 'views/host.dart';
import 'dark_theme.dart';

void main() => runApp(TrivAIMobileApp());

class TrivAIMobileApp extends StatelessWidget {
  const TrivAIMobileApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'TrivAI Mobile Application',
      initialRoute: '/',
      theme: darkTheme,
      routes: {
        '/': (context) => IndexView(),
        '/play': (context) => PlayView(),
        '/game': (context) {
          final questions =
              ModalRoute.of(context)!.settings.arguments as List<dynamic>;
          return GameView(questions: questions);
        },
        '/home': (context) => HomeView(),
        '/login': (context) => LoginView(),
        '/scoreboard': (context) {
          final quizGameId =
              ModalRoute.of(context)!.settings.arguments as String;
          return ScoreboardView(quizGameId: quizGameId);
        },
        '/create': (context) => CreateView(),
        '/host': (context) {
          final quizId = ModalRoute.of(context)!.settings.arguments as String;
          return HostView(quizId: quizId);
        },
        '/browse': (context) => BrowseView(),
        '/history': (context) => HistoryView(),
      },
    );
  }
}
