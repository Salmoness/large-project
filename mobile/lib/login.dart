import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class LoginPage extends StatefulWidget {
  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final TextEditingController usernameController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();
  String responseMessage = '';

  Future<void> handleLogin() async {
    final response = await http.post(
      Uri.parse(
        'http://hopethiswork.com:5000/api/users/login',
      ), // Replace with your real API
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({
        'username': usernameController.text,
        'password': passwordController.text,
      }),
    );

    setState(() {
      if (response.statusCode == 200) {
        responseMessage = jsonDecode(response.body).toString();
      } else {
        responseMessage = 'Login failed: ${response.statusCode}';
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Log In')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            TextField(
              controller: usernameController,
              decoration: InputDecoration(labelText: 'Username'),
            ),
            TextField(
              controller: passwordController,
              obscureText: true,
              decoration: InputDecoration(labelText: 'Password'),
            ),
            SizedBox(height: 24),
            ElevatedButton(child: Text('Submit'), onPressed: handleLogin),
            SizedBox(height: 16),
            Text(responseMessage),
          ],
        ),
      ),
    );
  }
}
