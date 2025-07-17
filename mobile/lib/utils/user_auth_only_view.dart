import 'package:flutter/material.dart';
import 'debug_mode_print.dart';
import 'jwt_auth_service.dart';

class UserAuthOnlyView extends StatefulWidget {
  final Widget child;
  final AppBar appBar;

  const UserAuthOnlyView({
    super.key,
    required this.child,
    required this.appBar,
  });

  @override
  UserOnlyAuthState createState() => UserOnlyAuthState();
}

class UserOnlyAuthState extends State<UserAuthOnlyView> {
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
        appBar: widget.appBar,
        body: Center(child: CircularProgressIndicator()),
      );
    }

    return Scaffold(appBar: widget.appBar, body: widget.child);
  }
}
