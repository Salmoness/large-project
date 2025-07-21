import 'dart:convert';
import 'package:flutter/material.dart';
import '../utils/jwt_storage.dart';
import '../utils/jwt_types.dart';
import '../utils/jwt_service.dart';
import '../utils/snackbars.dart';
import '../utils/api_base_url.dart';
import '../utils/api_fetcher.dart';
import '../utils/center_widget.dart';
import '../utils/debug_mode_print.dart';

class PlayView extends StatefulWidget {
  const PlayView({super.key});

  @override
  PlayViewState createState() => PlayViewState();
}

class PlayViewState extends State<PlayView> {
  final playForm = GlobalKey<FormState>();
  bool? isLoggedIn;
  final TextEditingController displayNameController = TextEditingController();
  final TextEditingController accessCodeController = TextEditingController();
  String? errorMessage;
  bool isLoading = false;

  @override
  void initState() {
    super.initState();
    loadUserType();
  }

  Future<void> loadUserType() async {
    bool isLoggedInCheck = await JWTService.isJWTValid(JWTType.userAuth);
    setState(() {
      isLoggedIn = isLoggedInCheck;
    });
  }

  Future<void> handlePlay() async {
    if (!playForm.currentState!.validate()) {
      debugModePrint('Play form is invalid');
      return;
    }
    if (isLoggedIn == null) return;
    setState(() {
      isLoading = true;
    });
    // Unfortunately, this logic is duplicated in /views/host. Needs a refactor.
    try {
      final displayName = isLoggedIn! ? "" : displayNameController.text.trim();
      final accessCode = accessCodeController.text.trim();
      final jwtStr = isLoggedIn!
          ? await JWTStorage.getJWT(JWTType.userAuth)
          : "";
      final response = await fetchAPI(
        url: '${getAPIBaseURL()}/quiz/join',
        body: {
          'username': displayName,
          'accessCode': accessCode,
          'jwt': jwtStr,
        },
      );
      final Map<String, dynamic> responseJSON = jsonDecode(response.body);
      if (responseJSON['error'] != null && responseJSON['error'] != '') {
        errorMessage = responseJSON['error'];
      } else {
        await JWTStorage.saveJWT(JWTType.quizSession, responseJSON['jwt']);
        final List<Map<String, dynamic>> questions =
            List<Map<String, dynamic>>.from(responseJSON['questions']);
        if (mounted) {
          // This is not ideal. It would be better if I could just pass
          // the gameQuizId to the game page, and then fetch the
          // questions as I need them.
          Navigator.pushNamed(
            context,
            "/game",
            arguments: [responseJSON['quiz_game_id'], questions],
          );
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
    if (isLoggedIn == null) {
      return Scaffold(
        appBar: AppBar(title: Text('Play')),
        body: Center(child: CircularProgressIndicator()),
      );
    }

    return Scaffold(
      appBar: AppBar(title: Text('Play')),
      body: SuperCentered(
        children: [
          Form(
            key: playForm,
            child: Column(
              children: [
                if (isLoggedIn == false)
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
                if (isLoggedIn == false) SizedBox(height: 24),
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
                        child: Text('Join'),
                      ),
                if (errorMessage != null) SizedBox(height: 24),
                if (errorMessage != null)
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Icon(Icons.warning, color: Colors.red),
                      SizedBox(width: 8),
                      Flexible(
                        child: Text(
                          errorMessage!,
                          style: TextStyle(color: Colors.red),
                        ),
                      ),
                    ],
                  ),
              ],
            ),
          ),
          SizedBox(height: 40),
          if (isLoggedIn == false)
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
