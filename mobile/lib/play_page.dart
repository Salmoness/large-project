import 'package:flutter/material.dart';

class PlayPage extends StatelessWidget {
  const PlayPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Play')),
      body: Center(
        child: ElevatedButton(
          child: Text('Log Out'),
          onPressed: () => {
            Navigator.pushNamedAndRemoveUntil(context, '/', (route) => false),
          },
        ),
      ),
    );
  }
}
