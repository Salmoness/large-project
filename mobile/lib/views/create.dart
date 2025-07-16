import 'package:flutter/material.dart';
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

    /*
    do api here
    */

    // TODO(Aaron): API
    await Future.delayed(Duration(seconds: 2));
    setState(() {
      isLoading = false;
      quizId = "abc123";
    });
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
