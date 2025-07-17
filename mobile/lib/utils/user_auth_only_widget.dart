import 'package:flutter/material.dart';
import '../utils/center_widget.dart';
import 'debug_mode_print.dart';
import 'jwt_auth_service.dart';

class UserAuthOnly extends StatefulWidget {
  final Widget child;

  const UserAuthOnly({super.key, required this.child});

  @override
  UserOnlyAuthState createState() => UserOnlyAuthState();
}

class UserOnlyAuthState extends State<UserAuthOnly> {
  bool isLoading = true;

  @override
  void initState() {
    super.initState();
    checkAuthorization();
  }

  Future<void> checkAuthorization() async {
    final authType = await AuthService.getAuthType();
    debugModePrint("Authorization check requested. AuthType is $authType");
    if (authType != AuthType.user && mounted) {
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
        body: CenteredView(children: [CircularProgressIndicator()]),
      );
    }
    return widget.child;
  }
}
