import 'package:jwt_decoder/jwt_decoder.dart';
import 'jwt_storage.dart';
import 'package:flutter/material.dart';

enum AuthType {
  guest, // Temporary authentication for a single quiz
  user, // Full authentication
  none, // No authentication
}

class AuthService {
  static Future<AuthType> getAuthType() async {
    Map<String, dynamic>? payload = await getJWTPayload();
    if (payload == null || payload.isEmpty) return AuthType.none;
    if (payload.containsKey('guestId')) return AuthType.guest;
    if (payload.containsKey('userId')) return AuthType.user;
    return AuthType.none;
  }

  static Future<Map<String, dynamic>?> getJWTPayload() async {
    try {
      String? jwt = await TokenStorage.getToken();
      if (jwt == null || jwt.isEmpty) return null;
      Map<String, dynamic> decoded = JwtDecoder.decode(jwt);
      Map<String, dynamic>? payload = decoded['payload'];
      if (payload == null || payload.isEmpty) return null;
      return payload;
    } catch (e) {
      debugPrint('Failed to decode JWT: $e');
    }
    return null;
  }
}
