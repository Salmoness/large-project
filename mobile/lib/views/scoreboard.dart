import 'dart:convert';
import 'package:flutter/material.dart';
import '../utils/snackbars.dart';
import '../utils/api_base_url.dart';
import '../utils/api_fetcher.dart';
import '../utils/debug_mode_print.dart';

class ScoreboardView extends StatefulWidget {
  final String quizGameId;

  const ScoreboardView({super.key, required this.quizGameId});

  @override
  ScoreboardViewState createState() => ScoreboardViewState();
}

class ScoreboardViewState extends State<ScoreboardView> {
  List<dynamic> scoreboard = [];
  bool isLoading = true;

  @override
  void initState() {
    super.initState();
    fetchScoreboard();
  }

  Future<void> fetchScoreboard() async {
    try {
      final responseTEXT = await fetchAPI(
        url: '${getAPIBaseURL()}/quiz/leaderboard',
        body: {'quizGameID': widget.quizGameId},
      );
      final Map<String, dynamic> responseJSON = jsonDecode(responseTEXT);
      if (responseJSON['error'] != null && responseJSON['error'] != '') {
        throw Exception(responseJSON['error']);
      }
      setState(() {
        scoreboard = responseJSON['leaderboard'] ?? [];
      });
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
    return Scaffold(
      appBar: AppBar(title: Text('Scoreboard')),
      body: isLoading
          ? Center(child: CircularProgressIndicator())
          : scoreboard.isEmpty
          ? Center(child: Text("No scores available yet!"))
          : SingleChildScrollView(
              scrollDirection: Axis.vertical,
              child: DataTable(
                columns: const [
                  DataColumn(label: Text('Username')),
                  DataColumn(label: Text('Score')),
                  DataColumn(label: Text('Time Taken')),
                ],
                rows: scoreboard.map((entry) {
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
