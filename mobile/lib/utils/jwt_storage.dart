import 'package:shared_preferences/shared_preferences.dart';
import 'jwt_types.dart';

class JWTStorage {
  static const jwtStorageKeyPrefix = 'jwt_';

  static Future<void> saveJWT(JWTType type, String tokenStr) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(jwtStorageKeyPrefix + type.name(), tokenStr);
  }

  static Future<String?> getJWT(JWTType type) async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString(jwtStorageKeyPrefix + type.name());
  }

  static Future<void> deleteJWT(JWTType type) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove(jwtStorageKeyPrefix + type.name());
  }
}
