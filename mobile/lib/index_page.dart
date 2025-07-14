import 'package:flutter/material.dart';

class IndexPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Welcome')),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            ElevatedButton(
              child: Text('Play'),
              onPressed: () => Navigator.pushNamed(context, '/play'),
            ),
            SizedBox(height: 16),
            ElevatedButton(
              child: Text('Host'),
              onPressed: () => Navigator.pushNamed(context, '/host'),
            ),
          ],
        ),
      ),
    );
  }
}
