import 'package:flutter/material.dart';
import 'jwt_auth_service.dart';

class UserAuthOnly extends StatefulWidget {
  final Widget child;

  const UserAuthOnly({super.key, required this.child});

  @override
  UserOnlyAuthState createState() => UserOnlyAuthState();
}

class UserOnlyAuthState extends State<UserAuthOnly> {
  bool isLoading = true;
  bool isAuthorized = false;

  @override
  void initState() {
    super.initState();
    checkAuthorization();
  }

  Future<void> checkAuthorization() async {
    final authType = await AuthService.getAuthType();

    debugPrint("Authorization check requested. AuthType is $authType");

    if (authType != AuthType.user && mounted) {
      Navigator.pushReplacementNamed(context, '/login');
    } else if (mounted) {
      setState(() {
        isAuthorized = true;
        isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    if (isLoading) {
      return Scaffold(body: Center(child: CircularProgressIndicator()));
    }

    return widget.child;
  }
}
