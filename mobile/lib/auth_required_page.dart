import 'package:flutter/material.dart';
import 'jwt_utils.dart';

class AuthRequiredPage extends StatefulWidget {
  final Widget child;

  const AuthRequiredPage({super.key, required this.child});

  @override
  _RequireAuthState createState() => _RequireAuthState();
}

class _RequireAuthState extends State<AuthRequiredPage> {
  bool _isLoading = true;
  bool _isAuthorized = false;

  @override
  void initState() {
    super.initState();
    _checkAuth();
  }

  Future<void> _checkAuth() async {
    final loggedIn = await TokenStorage.isLoggedIn();

    if (!loggedIn && mounted) {
      Navigator.pushReplacementNamed(context, '/login');
    } else if (mounted) {
      setState(() {
        _isAuthorized = true;
        _isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    if (_isLoading) {
      return Scaffold(body: Center(child: CircularProgressIndicator()));
    }

    return widget.child;
  }
}
