import 'package:flutter/material.dart';
import '../jwt_auth_service.dart';

class PlayView extends StatefulWidget {
  const PlayView({super.key});

  @override
  PlayViewState createState() => PlayViewState();
}

class PlayViewState extends State<PlayView> {
  final playForm = GlobalKey<FormState>();
  AuthType? authType;
  final TextEditingController displayNameController = TextEditingController();
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
    if (!playForm.currentState!.validate()) {
      debugPrint('Play form is invalid');
      return;
    }

    // TODO(Aaron): API
    final displayName = displayNameController.text.trim();
    final accessCode = accessCodeController.text.trim();
    debugPrint(
      'Trying to join quiz session with displayName=$displayName and accessCode=$accessCode',
    );
    final quizGameId = "abc123";
    Navigator.pushNamed(context, "/game", arguments: quizGameId);
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
            Form(
              key: playForm,
              child: Column(
                children: [
                  if (notLoggedIn)
                    TextFormField(
                      controller: displayNameController,
                      decoration: InputDecoration(labelText: 'Display Name'),
                      validator: (value) {
                        if (value == null || value.trim().isEmpty) {
                          return 'You must provide a display name';
                        }
                        return null;
                      },
                    ),
                  TextFormField(
                    controller: accessCodeController,
                    decoration: InputDecoration(labelText: 'Access Code'),
                    validator: (value) {
                      if (value == null || value.trim().isEmpty) {
                        return 'You must provide an access code';
                      }
                      return null;
                    },
                  ),
                  SizedBox(height: 24),
                  Text(statusMessage),
                  SizedBox(height: 24),
                  ElevatedButton(onPressed: handlePlay, child: Text('Play')),
                ],
              ),
            ),
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
