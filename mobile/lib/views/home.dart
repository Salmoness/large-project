import 'package:flutter/material.dart';
import 'package:mobile/snackbars.dart';
import '../jwt_storage.dart';
import '../user_auth_only_view.dart';

class HomeView extends StatefulWidget {
  const HomeView({super.key});

  @override
  HomeViewState createState() => HomeViewState();
}

class HomeViewState extends State<HomeView> {
  Future<void> handleLogout(BuildContext context) async {
    context.notifySuccess("Logged out");
    Navigator.pushNamedAndRemoveUntil(context, '/', (route) => false);
    await TokenStorage.deleteToken();
  }

  @override
  Widget build(BuildContext context) {
    return UserAuthOnly(
      child: Scaffold(
        appBar: AppBar(title: Text('Home')),
        body: Center(
          child: ElevatedButton(
            child: Text('Log out'),
            onPressed: () => handleLogout(context),
          ),
        ),
      ),
    );
  }
}
