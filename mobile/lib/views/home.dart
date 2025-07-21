import 'package:flutter/material.dart';
import '../utils/jwt_service.dart';
import '../utils/jwt_types.dart';
import '../utils/center_widget.dart';
import '../utils/snackbars.dart';
import '../utils/jwt_storage.dart';
import '../utils/user_auth_only_widget.dart';

class HomeView extends StatefulWidget {
  const HomeView({super.key});

  @override
  HomeViewState createState() => HomeViewState();
}

class HomeViewState extends State<HomeView> {
  String? username;

  @override
  void initState() {
    super.initState();
    loadUsername();
  }

  Future<void> loadUsername() async {
    Map<String, dynamic>? user = await JWTService.getJWTPayload(
      JWTType.userAuth,
    );
    if (user == null) return;
    setState(() => username = user['username']);
  }

  Future<void> handleLogout(BuildContext context) async {
    context.notifyUserOfSuccess("Logged out");
    Navigator.pushNamedAndRemoveUntil(context, '/', (route) => false);
    await JWTStorage.deleteJWT(JWTType.userAuth);
  }

  @override
  Widget build(BuildContext context) {
    return AuthedOnly(
      child: Scaffold(
        appBar: AppBar(title: Text('TrivAI')),
        body: SuperCentered(
          children: [
            Text('Hello, $username!', style: TextStyle(fontSize: 26)),
            SizedBox(height: 32),
            ElevatedButton(
              style: ButtonStyle(
                backgroundColor: WidgetStatePropertyAll(Colors.green),
              ),
              onPressed: () => Navigator.pushNamed(context, '/play'),
              child: Text('Play'),
            ),
            SizedBox(height: 32),
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
              child: Text('View my History'),
              onPressed: () => Navigator.pushNamed(context, '/history'),
            ),
            SizedBox(height: 32),
            ElevatedButton(
              style: ButtonStyle(
                backgroundColor: WidgetStatePropertyAll(Colors.red),
              ),
              onPressed: () => handleLogout(context),
              child: Text('Log out'),
            ),
          ],
        ),
      ),
    );
  }
}
