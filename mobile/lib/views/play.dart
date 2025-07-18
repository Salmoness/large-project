import 'dart:convert';
import 'package:flutter/material.dart';
import '../utils/snackbars.dart';
import '../utils/api_base_url.dart';
import '../utils/api_fetcher.dart';
import '../utils/center_widget.dart';
import '../utils/jwt_auth_service.dart';
import '../utils/debug_mode_print.dart';

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
  bool isLoading = false;

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

  Future<void> handlePlay() async {
    if (!playForm.currentState!.validate()) {
      debugModePrint('Play form is invalid');
      return;
    }
    setState(() {
      isLoading = true;
    });
    try {
      await Future.delayed(Duration(seconds: 2));

      final displayName = displayNameController.text.trim();
      final accessCode = accessCodeController.text.trim();
      final responseTEXT = await fetchAPI(
        url: '${getAPIBaseURL()}/quiz/join',
        body: {'username': displayName, 'accessCode': accessCode},
      );
      final Map<String, dynamic> responseJSON = jsonDecode(responseTEXT);
      if (responseJSON['error'] != null && responseJSON['error'] != '') {
        statusMessage = responseJSON['error'];
      } else {
        if (mounted) {
          // TODO(Aaron)
          // responseJSON should contain the entire quiz data. Push
          // the quiz data to the game page.
          Navigator.pushNamed(context, "/game");
        }
      }
    } catch (e) {
      setState(() {
        debugModePrint('Exception: $e');
        if (mounted) context.notifyUserOfServerError();
      });
    } finally {
      setState(() {
        isLoading = false;
      });
    }
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
      body: SuperCentered(
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
                if (notLoggedIn) SizedBox(height: 24),
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
                isLoading
                    ? CircularProgressIndicator()
                    : ElevatedButton(
                        onPressed: handlePlay,
                        child: Text('Play'),
                      ),
                SizedBox(height: 24),
                Text(statusMessage),
                SizedBox(height: 24),
              ],
            ),
          ),
          SizedBox(height: 24),
          if (notLoggedIn)
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text("Want a permanent display name?"),

                TextButton(
                  onPressed: () =>
                      Navigator.pushReplacementNamed(context, '/login'),
                  child: Text('Log in'),
                ),
              ],
            ),
        ],
      ),
    );
  }
}
