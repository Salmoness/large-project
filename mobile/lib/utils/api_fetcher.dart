import 'dart:convert';
import 'package:http/http.dart' as http;

Future<String> fetchAPI({
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
      return response.body;
    } else {
      throw Exception('HTTP ${response.statusCode}: ${response.reasonPhrase}');
    }
  } catch (e) {
    throw Exception('Request failed: $e');
  }
}
