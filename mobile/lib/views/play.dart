import 'package:flutter/material.dart';
import '../jwt_auth_service.dart';

class PlayView extends StatefulWidget {
  const PlayView({super.key});

  @override
  PlayViewState createState() => PlayViewState();
}

class PlayViewState extends State<PlayView> {
  AuthType? authType;

  final TextEditingController displaynameController = TextEditingController();
  final TextEditingController accessCodeController = TextEditingController();

  String statusMessage = '';

  @override
  void initState() {
    super.initState();
    loadUserType();
  }

  Future<void> loadUserType() async {
    AuthType type = await AuthService.getAuthType();
    setState(() {
      authType = type;
    });
  }

  void handlePlay() {
    final displayname = displaynameController.text.trim();
    final accessCode = accessCodeController.text.trim();

    if ((authType == AuthType.guest || authType == AuthType.none) &&
        displayname.isEmpty) {
      setState(() {
        statusMessage = 'Please provide a display name';
      });
      return;
    }

    if (accessCode.isEmpty) {
      setState(() {
        statusMessage = 'You must provide an access code';
      });
      return;
    }

    // NEED API TO PROGRESS HERE
  }

  @override
  Widget build(BuildContext context) {
    if (authType == null) {
      return Scaffold(
        appBar: AppBar(title: Text('Play Quiz')),
        body: Center(child: CircularProgressIndicator()),
      );
    }

    final notLoggedIn = authType == AuthType.guest || authType == AuthType.none;

    return Scaffold(
      appBar: AppBar(title: Text('Play')),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            if (notLoggedIn)
              TextField(
                controller: displaynameController,
                decoration: InputDecoration(labelText: 'Display Name'),
              ),
            TextField(
              controller: accessCodeController,
              decoration: InputDecoration(labelText: 'Access Code'),
            ),
            SizedBox(height: 24),
            Text(statusMessage),
            SizedBox(height: 24),
            ElevatedButton(onPressed: handlePlay, child: Text('Play')),
            SizedBox(height: 24),
            if (notLoggedIn)
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text("Want a permanent display name?"),

                  ElevatedButton(
                    onPressed: () =>
                        Navigator.pushReplacementNamed(context, '/login'),
                    child: Text('Log in'),
                  ),
                ],
              ),
          ],
        ),
      ),
    );
  }
}
