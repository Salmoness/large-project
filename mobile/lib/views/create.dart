import 'package:flutter/material.dart';
import '../snackbars.dart';
import '../api_base_url.dart';
import '../api_fetcher.dart';
import '../debug_mode_print.dart';
import '../user_auth_only_view.dart';

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
      debugPrint('Create form invalid');
      return;
    }
    setState(() {
      isLoading = true;
    });
    try {
      final json = await fetchAPI(
        url: '${getAPIBaseURL()}/quiz/generate',
        body: {'topic': topicController.text},
      );
      debugModePrint('Received: $json');
      setState(() {
        quizId = json['quizId'] ?? [];
        isLoading = false;
      });
    } catch (e) {
      setState(() {
        isLoading = false;
        debugModePrint('Exception: $e');
        if (mounted) context.notifyServerError();
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
