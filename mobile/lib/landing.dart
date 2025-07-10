import 'package:flutter/material.dart';

class LandingPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Welcome')),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            ElevatedButton(
              child: Text('Log In'),
              onPressed: () => Navigator.pushNamed(context, '/login'),
            ),
            SizedBox(height: 16),
            ElevatedButton(
              child: Text('Register'),
              onPressed: () => Navigator.pushNamed(context, '/register'),
            ),

            SizedBox(height: 16),
            ElevatedButton(
              child: Text('iframe WebView (testing)'),
              onPressed: () => Navigator.pushNamed(context, '/webview'),
            ),
          ],
        ),
      ),
    );
  }
}
