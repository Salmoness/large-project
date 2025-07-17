import 'dart:convert';

import 'package:flutter/material.dart';
import '../utils/snackbars.dart';
import '../utils/api_base_url.dart';
import '../utils/api_fetcher.dart';
import '../utils/debug_mode_print.dart';
import '../utils/user_auth_only_view.dart';

class CreateView extends StatefulWidget {
  const CreateView({super.key});

  @override
  CreateViewState createState() => CreateViewState();
}

class CreateViewState extends State<CreateView> {
  final createForm = GlobalKey<FormState>();
  final topicController = TextEditingController();
  bool isLoading = false;
  String? quizId;

  Future<void> _handleSubmit() async {
    if (!createForm.currentState!.validate()) {
      debugModePrint('Create form invalid');
      return;
    }
    setState(() {
      isLoading = true;
    });
    try {
      final responseTEXT = await fetchAPI(
        url: '${getAPIBaseURL()}/quiz/generate',
        body: {'topic': topicController.text},
      );
      debugModePrint('Received: $responseTEXT');
      final Map<String, dynamic> responseJSON = jsonDecode(responseTEXT);
      if (responseJSON['error'] != null && responseJSON['error'] != '') {
        throw Exception(responseJSON['error']);
      }
      setState(() {
        quizId = responseJSON['quizId'] ?? [];
        isLoading = false;
      });
    } catch (e) {
      setState(() {
        isLoading = false;
        debugModePrint('Exception: $e');
        if (mounted) context.notifyUserOfServerError();
      });
    }
  }

  void handleHost() {
    Navigator.pushReplacementNamed(context, '/host', arguments: quizId);
  }

  @override
  Widget build(BuildContext context) {
    return UserAuthOnlyView(
      appBar: AppBar(title: Text('Create Quiz')),
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: isLoading
            ? Center(child: CircularProgressIndicator())
            : quizId == null
            ? Form(
                key: createForm,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    TextFormField(
                      controller: topicController,
                      decoration: InputDecoration(labelText: 'Topic'),
                      validator: (value) {
                        if (value == null || value.trim().isEmpty) {
                          return 'You must provide a topic';
                        }
                        return null;
                      },
                    ),
                    SizedBox(height: 20),
                    ElevatedButton(
                      onPressed: _handleSubmit,
                      child: Text('Create'),
                    ),
                  ],
                ),
              )
            : Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  Text('Quiz generated!', style: TextStyle(fontSize: 18)),
                  SizedBox(height: 20),
                  ElevatedButton(onPressed: handleHost, child: Text('Host')),
                ],
              ),
      ),
    );
  }
}
