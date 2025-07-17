import 'package:flutter/material.dart';
import '../snackbars.dart';
import '../api_base_url.dart';
import '../api_fetcher.dart';
import '../debug_mode_print.dart';

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
      final json = await fetchAPI(
        url: '${getAPIBaseURL()}/quiz/leaderboard',
        body: {'quizGameID': widget.quizGameId},
      );
      debugModePrint('Received: $json');
      setState(() {
        scoreboard = json['leaderboard'] ?? [];
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
