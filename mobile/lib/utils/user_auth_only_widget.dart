import 'package:flutter/material.dart';
import '../utils/jwt_types.dart';
import '../utils/center_widget.dart';
import 'debug_mode_print.dart';
import 'jwt_service.dart';

class AuthedOnly extends StatefulWidget {
  final Widget child;

  const AuthedOnly({super.key, required this.child});

  @override
  UserOnlyAuthState createState() => UserOnlyAuthState();
}

class UserOnlyAuthState extends State<AuthedOnly> {
  bool isLoading = true;

  @override
  void initState() {
    super.initState();
    checkAuth();
  }

  Future<void> checkAuth() async {
    final bool loggedIn = await AuthService.isJWTValid(JWTType.userAuth);
    debugModePrint("Checking auth. User is logged in: $loggedIn");
    if (loggedIn == false && mounted) {
      Navigator.pushReplacementNamed(context, '/login');
    } else if (mounted) {
      setState(() {
        isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    if (isLoading) {
      return Scaffold(
        body: SuperCentered(children: [CircularProgressIndicator()]),
      );
    }
    return widget.child;
  }
}
