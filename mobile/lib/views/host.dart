import 'package:flutter/material.dart';
import '../user_auth_only_view.dart';

class HostView extends StatefulWidget {
  final String quizId;

  const HostView({super.key, required this.quizId});

  @override
  HostViewState createState() => HostViewState();
}

class HostViewState extends State<HostView> {
  bool isLoading = true;
  bool isHosting = false;
  String? title, description, topic;
  String? accessCode, quizGameId;

  @override
  void initState() {
    super.initState();
    fetchQuizInformation();
  }

  Future<void> fetchQuizInformation() async {
    /*
    final url = Uri.parse('https://your-api.com/quizzes/${widget.quizId}');
    try {
      final resp = await http.get(url);
      if (resp.statusCode == 200) {
        final data = jsonDecode(resp.body);
        setState(() {
          title = data['title'];
          description = data['description'];
          topic = data['topic'];
          isLoadingDetails = false;
        });
      } else {
        setState(() => isLoadingDetails = false);
        _showError('Failed to load quiz details');
      }
    } catch (e) {
      setState(() => isLoadingDetails = false);
      _showError('Error: $e');
    }
    */

    // TODO(Aaron): API
    await Future.delayed(Duration(seconds: 2));
    setState(() {
      title = "Title";
      description = 'Description';
      topic = 'Topic';
      isLoading = false;
    });
  }

  Future<void> handleHost() async {
    setState(() => isHosting = true);

    /*
    do api here
    */

    // TODO(Aaron): API
    await Future.delayed(Duration(seconds: 2));
    setState(() {
      accessCode = '12345';
      quizGameId = 'abc123';
    });
  }

  void handlePlay() {
    Navigator.pushNamed(context, '/game', arguments: quizGameId);
  }

  @override
  Widget build(BuildContext context) {
    return UserAuthOnlyView(
      appBar: AppBar(title: Text('Host Quiz')),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: isLoading
            ? Center(child: CircularProgressIndicator())
            : Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  if (title != null)
                    Text(
                      title!,
                      style: TextStyle(
                        fontSize: 22,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  if (topic != null)
                    Padding(
                      padding: const EdgeInsets.symmetric(vertical: 8),
                      child: Text(
                        'Topic: $topic',
                        style: TextStyle(fontSize: 16),
                      ),
                    ),
                  if (description != null) Text(description!),
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
      ),
    );
  }
}
