import 'dart:convert';
import 'package:flutter/material.dart';
import '../utils/api_fetcher.dart';
import '../utils/jwt_api.dart';
import '../utils/jwt_storage.dart';
import '../utils/jwt_types.dart';
import '../utils/snackbars.dart';
import '../utils/api_base_url.dart';
import '../utils/center_widget.dart';
import '../utils/debug_mode_print.dart';
import '../utils/user_auth_only_widget.dart';

class HostView extends StatefulWidget {
  final String quizId;

  const HostView({super.key, required this.quizId});

  @override
  HostViewState createState() => HostViewState();
}

class HostViewState extends State<HostView> {
  bool isLoading = true;
  bool isHosting = false;
  String? title, summary, topic;
  String? accessCode, quizGameId;
  String? statusMessage;

  @override
  void initState() {
    super.initState();
    fetchQuizInformation();
  }

  Future<void> fetchQuizInformation() async {
    try {
      final response = await fetchAPI(
        url: '${getAPIBaseURL()}/quiz/info',
        body: {'quizID': widget.quizId},
      );
      final Map<String, dynamic> responseJSON = jsonDecode(response.body);
      if (responseJSON['error'] != null && responseJSON['error'] != '') {
        throw Exception(responseJSON['error']);
      }
      setState(() {
        title = responseJSON['title'];
        summary = responseJSON['summary'];
        topic = responseJSON['topic'];
        isLoading = false;
      });
    } catch (e) {
      setState(() {
        debugModePrint('Exception: $e');
        if (mounted) context.notifyUserOfServerError();
      });
    }
  }

  Future<void> handleHost() async {
    setState(() => isHosting = true);
    try {
      final jwtStr = await JWTStorage.getJWT(JWTType.userAuth);
      final response = await fetchAPI(
        url: '${getAPIBaseURL()}/quiz/start',
        body: {'quizID': widget.quizId, 'jwt': jwtStr},
      );
      final Map<String, dynamic> responseJSON = jsonDecode(response.body);
      handleAPIJWTAndRefresh(
        state: this,
        response: response,
        type: JWTType.userAuth,
        refresh: responseJSON['jwt'],
      );
      if (responseJSON['error'] != null && responseJSON['error'] != '') {
        throw Exception(responseJSON['error']);
      }
      setState(() {
        // API return field is incorrectly named 'gameID', but it is
        // correctly referring to quizGameId.
        quizGameId = responseJSON['gameID'];
        accessCode = responseJSON['accessCode'].toString();
      });
    } catch (e) {
      setState(() {
        debugModePrint('Exception: $e');
        if (mounted) context.notifyUserOfServerError();
      });
    } finally {
      setState(() => isHosting = false);
    }
  }

  Future<void> handlePlay() async {
    setState(() {
      isLoading = true;
    });
    // Unfortunately, this logic is duplicated in /views/play. Needs a refactor.
    try {
      final displayName = "";
      final jwtStr = await JWTStorage.getJWT(JWTType.userAuth);
      final response = await fetchAPI(
        url: '${getAPIBaseURL()}/quiz/join',
        body: {
          'username': displayName,
          'accessCode': accessCode,
          'jwt': jwtStr,
        },
      );
      final Map<String, dynamic> responseJSON = jsonDecode(response.body);
      await JWTStorage.saveJWT(JWTType.quizSession, responseJSON['jwt']);
      if (responseJSON['error'] != null && responseJSON['error'] != '') {
        setState(() => statusMessage = responseJSON['error']);
      } else {
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
    return AuthedOnly(
      child: Scaffold(
        appBar: AppBar(title: Text('Host Quiz')),
        body: SuperCentered(
          children: [
            isLoading
                ? Center(child: CircularProgressIndicator())
                : Column(
                    children: [
                      Text(
                        title!,
                        style: TextStyle(
                          fontSize: 22,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      SizedBox(height: 8),
                      Text(summary!, style: TextStyle(fontSize: 16)),
                      SizedBox(height: 24),
                      if (accessCode == null) ...[
                        if (isHosting)
                          Center(child: CircularProgressIndicator())
                        else
                          Center(
                            child: ElevatedButton(
                              onPressed: handleHost,
                              child: Text('Host'),
                            ),
                          ),
                      ] else ...[
                        Center(
                          child: Text(
                            'Success! Here’s the access code: $accessCode',
                          ),
                        ),
                        SizedBox(height: 12),
                        Center(
                          child: ElevatedButton(
                            onPressed: handlePlay,
                            child: Text('Play'),
                          ),
                        ),
                      ],
                    ],
                  ),
            if (statusMessage != null)
              Column(children: [SizedBox(height: 12), Text(statusMessage!)]),
          ],
        ),
      ),
    );
  }
}
