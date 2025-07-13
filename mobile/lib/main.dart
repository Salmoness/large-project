import 'package:flutter/material.dart';
import 'index_page.dart';
import 'login_page.dart';
import 'register_page.dart';
import 'host_page.dart';
import 'play_page.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Trivia Game Mobile Application',
      initialRoute: '/',
      routes: {
        '/': (context) => IndexPage(),
        '/play': (context) => PlayPage(),
        '/host': (context) => HostPage(),
        '/login': (context) => LoginPage(),
        '/register': (context) => RegisterPage(),
      },
    );
  }
}
