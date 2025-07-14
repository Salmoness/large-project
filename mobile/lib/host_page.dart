import 'package:flutter/material.dart';
import 'jwt_utils.dart';
import 'auth_required_page.dart';

class HostPage extends StatelessWidget {
  const HostPage({super.key});

  Future<void> _handleLogout(BuildContext context) async {
    await TokenStorage.clearToken();
    Navigator.pushNamedAndRemoveUntil(context, '/', (route) => false);
  }

  @override
  Widget build(BuildContext context) {
    return AuthRequiredPage(
      child: Scaffold(
        appBar: AppBar(title: Text('Logged In')),
        body: Center(
          child: ElevatedButton(
            child: Text('Log Out'),
            onPressed: () => _handleLogout(context),
          ),
        ),
      ),
    );
  }
}
