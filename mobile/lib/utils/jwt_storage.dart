import 'package:shared_preferences/shared_preferences.dart';
import 'jwt_types.dart';

class TokenStorage {
  static const jwtStorageKeyPrefix = 'jwt_';

  static Future<void> saveToken(JWTType type, String tokenStr) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(jwtStorageKeyPrefix + type.name(), tokenStr);
  }

  static Future<String?> getToken(JWTType type) async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString(jwtStorageKeyPrefix + type.name());
  }

  static Future<void> deleteToken(JWTType type) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove(jwtStorageKeyPrefix + type.name());
  }
}
