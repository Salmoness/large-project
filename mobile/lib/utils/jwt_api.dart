import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:mobile/utils/jwt_storage.dart';
import 'package:mobile/utils/snackbars.dart';
import 'jwt_types.dart';

Future<void> handleAPIJWTAndRefresh({
  required State state,
  required http.Response response,
  required JWTType type,
  required String refresh,
}) async {
  if (response.statusCode == 401) {
    await JWTStorage.deleteJWT(type);
    BuildContext context = state.context;
    if (context.mounted) {
      context.notifyUserOfError("Session expired");
      Navigator.of(context).pushNamedAndRemoveUntil('/login', (route) => false);
    }
    throw Exception("Invalid or expired JWT");
  }
  JWTStorage.saveJWT(type, refresh);
}
