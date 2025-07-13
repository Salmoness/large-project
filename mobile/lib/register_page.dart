import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'jwt_utils.dart';

class RegisterPage extends StatefulWidget {
  @override
  _RegisterPageState createState() => _RegisterPageState();
}

class _RegisterPageState extends State<RegisterPage> {
  final TextEditingController usernameController = TextEditingController();
  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();
  String responseMessage = '';

  Future<void> handleRegister() async {
    final response = await http.post(
      Uri.parse('http://hopethiswork.com:5000/api/users/register'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({
        'username': usernameController.text,
        'email': emailController.text,
        'confirmEmail': emailController.text,
        'password': passwordController.text,
        'confirmPassword': passwordController.text,
      }),
    );

    setState(() {
      if (response.statusCode == 200) {
        final json = jsonDecode(response.body);
        if (json["error"] != null && json["error"] != "") {
          responseMessage = 'Registration failed: ${json["error"]}';
        } else {
          TokenStorage.saveToken(json["jwt"].toString());
          Navigator.pushNamedAndRemoveUntil(context, '/host', (route) => false);
        }
      } else {
        responseMessage = 'Registration failed: ${response.statusCode}';
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Register')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            TextField(
              controller: usernameController,
              decoration: InputDecoration(labelText: 'Username'),
            ),
            TextField(
              controller: emailController,
              decoration: InputDecoration(labelText: 'Email'),
            ),
            TextField(
              controller: passwordController,
              obscureText: true,
              decoration: InputDecoration(labelText: 'Password'),
            ),
            SizedBox(height: 24),
            ElevatedButton(child: Text('Submit'), onPressed: handleRegister),
            SizedBox(height: 16),
            Text(responseMessage),
            SizedBox(height: 32),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text("Already have an account?"),
                TextButton(
                  child: Text('Log In'),
                  onPressed: () {
                    Navigator.pushReplacementNamed(context, '/login');
                  },
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
