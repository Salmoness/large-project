import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:mobile/api_base_url.dart';
import 'package:mobile/snackbars.dart';

class ScoreboardView extends StatefulWidget {
  final String quizGameId;

  const ScoreboardView({super.key, required this.quizGameId});

  @override
  ScoreboardViewState createState() => ScoreboardViewState();
}

class ScoreboardViewState extends State<ScoreboardView> {
  List<Map<String, dynamic>> entries = [];
  bool isLoading = true;

  @override
  void initState() {
    super.initState();
    fetchScoreboard();
  }

  Future<void> fetchScoreboard() async {
    // use widget.quizId to access
    final url = Uri.parse('$getAPIBaseURL()/TODO');

    try {
      final response = await http.get(url);
      if (response.statusCode == 200) {
        debugPrint("Received data from scoreboard endpoint: ${response.body}");
        final data = jsonDecode(response.body) as List;
        setState(() {
          entries = data.map((e) => Map<String, dynamic>.from(e)).toList();
          isLoading = false;
        });
      } else {
        setState(() => isLoading = false);
        if (mounted) context.notifyServerError();
      }
    } catch (e) {
      setState(() => isLoading = false);
      if (mounted) context.notifyServerError();
      debugPrint('Error fetching scorebard: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Scoreboard')),
      body: isLoading
          ? Center(child: CircularProgressIndicator())
          : entries.isEmpty
          ? Center(child: Text("No scores available yet!"))
          : SingleChildScrollView(
              scrollDirection: Axis.vertical,
              child: DataTable(
                columns: const [
                  DataColumn(label: Text('Username')),
                  DataColumn(label: Text('Score')),
                  DataColumn(label: Text('Time Taken')),
                ],
                rows: entries.map((entry) {
                  return DataRow(
                    cells: [
                      DataCell(Text(entry['username'].toString())),
                      DataCell(Text(entry['score'].toString())),
                      DataCell(Text(entry['time_taken'].toString())),
                    ],
                  );
                }).toList(),
              ),
            ),
    );
  }
}
