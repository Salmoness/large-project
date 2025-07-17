import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:mobile/snackbars.dart';
import 'dart:convert';
import '../jwt_storage.dart';
import 'package:url_launcher/url_launcher.dart';
import '../api_base_url.dart';

class LoginView extends StatefulWidget {
  const LoginView({super.key});

  @override
  LoginViewState createState() => LoginViewState();
}

class LoginViewState extends State<LoginView> {
  final loginForm = GlobalKey<FormState>();
  final TextEditingController usernameController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();
  String statusMessage = '';

  Future<void> handleLogin() async {
    if (!loginForm.currentState!.validate()) {
      debugPrint('Login form invalid');
      return;
    }

    try {
      final response = await http.post(
        Uri.parse('${getAPIBaseURL()}/users/login'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'username': usernameController.text,
          'password': passwordController.text,
        }),
      );

      if (response.statusCode == 200) {
        debugPrint('Received data from login endpoint: ${response.body}');
        final json = jsonDecode(response.body);
        if (json['error'] != null && json['error'] != '') {
          setState(() {
            statusMessage = json['error'];
          });
        } else {
          TokenStorage.saveToken(json['jwt'].toString());
          if (mounted) {
            Navigator.pushNamedAndRemoveUntil(
              context,
              '/home',
              (route) => false,
            );
            context.notifySuccess("Logged in");
          }
        }
      } else {
        debugPrint(
          'Login failed with response status code ${response.statusCode}',
        );
        if (mounted) context.notifyServerError();
      }
    } catch (e) {
      debugPrint('Login failed with exception: $e');
      if (mounted) context.notifyServerError();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Login')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            Form(
              key: loginForm,
              child: Column(
                children: [
                  TextFormField(
                    controller: usernameController,
                    decoration: InputDecoration(labelText: 'Username'),
                    validator: (value) {
                      if (value == null || value.trim().isEmpty) {
                        return 'You must provide a username';
                      }
                      return null;
                    },
                  ),
                  TextFormField(
                    controller: passwordController,
                    obscureText: true,
                    decoration: InputDecoration(labelText: 'Password'),
                    validator: (value) {
                      if (value == null || value.trim().isEmpty) {
                        return 'You must provide a password';
                      }
                      return null;
                    },
                  ),
                  SizedBox(height: 24),
                  ElevatedButton(onPressed: handleLogin, child: Text('Log in')),
                ],
              ),
            ),
            SizedBox(height: 16),
            Text(statusMessage),
            SizedBox(height: 32),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text("Don't have an account?"),
                TextButton(
                  child: Text('Register'),
                  onPressed: () {
                    launchUrl(Uri.parse('http://hopethiswork.com/register'));
                  },
                ),
              ],
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text("Forgot your password?"),
                TextButton(
                  child: Text('Forgot Password'),
                  onPressed: () {
                    launchUrl(
                      Uri.parse(
                        'http://hopethiswork.com/account/password-reset',
                      ),
                    );
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
