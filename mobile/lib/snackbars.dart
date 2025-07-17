import 'package:flutter/material.dart';

extension ContextNotifications on BuildContext {
  void notifyFailed(String message) {
    ScaffoldMessenger.of(this).showSnackBar(
      SnackBar(content: Text(message), backgroundColor: Colors.red),
    );
  }

  void notifySuccess(String message) {
    ScaffoldMessenger.of(this).showSnackBar(
      SnackBar(content: Text(message), backgroundColor: Colors.green),
    );
  }

  void notifyServerError() {
    notifyFailed("Server connection lost, try again later");
  }
}
