import 'package:flutter_test/flutter_test.dart';
import 'package:mobile/utils/jwt_storage.dart';
import 'package:mobile/utils/jwt_types.dart';
import 'package:shared_preferences/shared_preferences.dart';

void main() {
  group('JWT Storage Tests', () {
    setUp(() {
      SharedPreferences.setMockInitialValues({});
    });

    test('saveJWT and getJWT', () async {
      for (JWTType type in JWTType.values) {
        String token = 'test_token_${type.name()}';
        await JWTStorage.saveJWT(type, token);
        final retrieved = await JWTStorage.getJWT(type);
        expect(retrieved, equals(token));
      }
    });

    test('deleteJWT', () async {
      for (JWTType type in JWTType.values) {
        String token = 'test_token_${type.name()}';
        await JWTStorage.saveJWT(type, token);
        await JWTStorage.deleteJWT(type);
        final retrieved = await JWTStorage.getJWT(type);
        expect(retrieved, isNull);
      }
    });
  });
}
