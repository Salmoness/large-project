import 'package:flutter/material.dart';

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
    /*
    // use widget.quizGameId to access quizGameId
    do api here
    */

    // TODO(Aaron): API
    await Future.delayed(Duration(seconds: 2));
    setState(() {
      isLoading = false;
      entries = [
        {"username": "Username", "score": "100", "time_taken": "1m"},
      ];
    });
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
