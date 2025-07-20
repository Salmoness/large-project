import 'package:flutter/material.dart';
import '../utils/center_widget.dart';
import '../utils/jwt_types.dart';
import '../utils/snackbars.dart';
import 'dart:convert';
import '../utils/api_fetcher.dart';
import '../utils/jwt_storage.dart';
import 'package:url_launcher/url_launcher.dart';
import '../utils/api_base_url.dart';
import '../utils/debug_mode_print.dart';

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
  bool isLoading = false;

  Future<void> handleLogin() async {
    if (!loginForm.currentState!.validate()) {
      debugModePrint('Login form invalid');
      return;
    }
    setState(() {
      isLoading = true;
    });

    try {
      final username = usernameController.text.trim();
      final password = passwordController.text.trim();
      final response = await fetchAPI(
        url: '${getAPIBaseURL()}/users/login',
        body: {'username': username, 'password': password},
      );
      final Map<String, dynamic> responseJSON = jsonDecode(response.body);
      if (responseJSON['error'] != null && responseJSON['error'] != '') {
        statusMessage = responseJSON['error'];
      } else {
        JWTStorage.saveJWT(JWTType.userAuth, responseJSON['jwt'].toString());
        if (mounted) {
          Navigator.pushNamedAndRemoveUntil(context, '/home', (route) => false);
          context.notifyUserOfSuccess("Logged in");
        }
      }
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
      appBar: AppBar(title: Text('Login')),
      body: SuperCentered(
        children: [
          Form(
            key: loginForm,
            child: Column(
              children: [
                TextFormField(
                  key: const Key('username'),
                  controller: usernameController,
                  decoration: InputDecoration(labelText: 'Username'),
                  validator: (value) {
                    if (value == null || value.trim().isEmpty) {
                      return 'You must provide a username';
                    }
                    return null;
                  },
                ),
                SizedBox(height: 24),
                TextFormField(
                  key: const Key('password'),
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
                isLoading
                    ? Center(child: CircularProgressIndicator())
                    : ElevatedButton(
                        key: const Key('login'),
                        onPressed: handleLogin,
                        child: Text('Log in'),
                      ),
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
                    Uri.parse('http://hopethiswork.com/account/password-reset'),
                  );
                },
              ),
            ],
          ),
        ],
      ),
    );
  }
}
