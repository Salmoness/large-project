import 'dart:convert';
import 'package:http/http.dart' as http;
import 'debug_mode_print.dart';

Future<String> fetchAPI({
  required String url,
  required Map<String, dynamic> body,
}) async {
  try {
    debugModePrint('Sending API request with body: $body');
    final response = await http.post(
      Uri.parse(url),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode(body),
    );
    if (response.statusCode == 200) {
      debugModePrint('Received API response with body: ${response.body}');
      return response.body;
    } else {
      throw Exception('HTTP ${response.statusCode}: ${response.reasonPhrase}');
    }
  } catch (e) {
    throw Exception('Request failed: $e');
  }
}
