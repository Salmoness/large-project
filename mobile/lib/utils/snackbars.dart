import 'package:flutter/material.dart';

extension ContextNotifications on BuildContext {
  void notifyUserOfError(String message) {
    ScaffoldMessenger.of(this).showSnackBar(
      SnackBar(content: Text(message), backgroundColor: Colors.red),
    );
  }

  void notifyUserOfSuccess(String message) {
    ScaffoldMessenger.of(this).showSnackBar(
      SnackBar(content: Text(message), backgroundColor: Colors.green),
    );
  }

  void notifyUserOfServerError() {
    notifyUserOfError("Server connection lost, try again later");
  }
}
