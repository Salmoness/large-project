import 'package:flutter/material.dart';
import 'package:mobile/utils/snackbars.dart';
import '../utils/jwt_storage.dart';
import '../utils/user_auth_only_view.dart';

class HomeView extends StatefulWidget {
  const HomeView({super.key});

  @override
  HomeViewState createState() => HomeViewState();
}

class HomeViewState extends State<HomeView> {
  Future<void> handleLogout(BuildContext context) async {
    context.notifyUserOfSuccess("Logged out");
    Navigator.pushNamedAndRemoveUntil(context, '/', (route) => false);
    await TokenStorage.deleteToken();
  }

  @override
  Widget build(BuildContext context) {
    return UserAuthOnlyView(
      appBar: AppBar(title: Text('TrivAI')),
      child: Center(
        child: Column(
          children: [
            ElevatedButton(
              child: Text('Log out'),
              onPressed: () => handleLogout(context),
            ),
            SizedBox(height: 16),
            ElevatedButton(
              child: Text('Play'),
              onPressed: () => Navigator.pushNamed(context, '/play'),
            ),
            SizedBox(height: 16),
            ElevatedButton(
              child: Text('Create New Quiz'),
              onPressed: () => Navigator.pushNamed(context, '/create'),
            ),
            SizedBox(height: 16),
            ElevatedButton(
              child: Text('Browse Quizzes'),
              onPressed: () => Navigator.pushNamed(context, '/browse'),
            ),
            SizedBox(height: 16),
            ElevatedButton(
              child: Text('View my Quiz History'),
              onPressed: () => Navigator.pushNamed(context, '/history'),
            ),
          ],
        ),
      ),
    );
  }
}
