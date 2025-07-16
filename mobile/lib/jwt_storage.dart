import 'package:shared_preferences/shared_preferences.dart';

class TokenStorage {
  static const jwtStorageKey = 'jwt';

  static Future<void> saveToken(String token) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(jwtStorageKey, token);
  }

  static Future<String?> getToken() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString(jwtStorageKey);
  }

  static Future<void> deleteToken() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove(jwtStorageKey);
  }
}
