import 'package:jwt_decoder/jwt_decoder.dart';
import 'jwt_storage.dart';
import 'debug_mode_print.dart';
import 'jwt_types.dart';

class AuthService {
  static Future<bool> isJWTValid(JWTType type) async {
    String? jwt = await TokenStorage.getToken(type);
    if (jwt == null || jwt.isEmpty) return false;
    try {
      return !JwtDecoder.isExpired(jwt);
    } catch (e) {
      debugModePrint('Failed to validate JWT $type: $e');
    }
    return false;
  }

  static Future<Map<String, dynamic>?> getJWTPayload(JWTType type) async {
    try {
      String? jwt = await TokenStorage.getToken(type);
      if (jwt == null || jwt.isEmpty) return null;
      Map<String, dynamic> decoded = JwtDecoder.decode(jwt);
      Map<String, dynamic>? payload = decoded['payload'];
      if (payload == null || payload.isEmpty) return null;
      return payload;
    } catch (e) {
      debugModePrint('Failed to decode JWT $type: $e');
    }
    return null;
  }
}
