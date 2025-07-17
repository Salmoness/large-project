import 'dart:convert';
import 'package:http/http.dart' as http;

Future<Map<String, dynamic>> fetchAPI({
  required String url,
  required Map<String, dynamic> body,
}) async {
  try {
    final response = await http.post(
      Uri.parse(url),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode(body),
    );

    if (response.statusCode == 200) {
      final Map<String, dynamic> json = jsonDecode(response.body);

      if (json['error'] == null || json['error'].isEmpty) {
        return json;
      } else {
        throw Exception(json['error']);
      }
    } else {
      throw Exception('HTTP ${response.statusCode}: ${response.reasonPhrase}');
    }
  } catch (e) {
    throw Exception('Request failed: $e');
  }
}
