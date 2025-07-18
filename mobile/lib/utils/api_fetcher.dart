import 'dart:convert';
import 'package:http/http.dart' as http;
import 'debug_mode_print.dart';

Future<String> fetchAPI({
  required String url,
  required Map<String, dynamic> body,
}) async {
  try {
    debugModePrint('Sending API request to $url with body: $body');
    final response = await http.post(
      Uri.parse(url),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode(body),
    );
    debugModePrint(
      'Received API response with code ${response.statusCode} with body: ${response.body}',
    );
    if (response.statusCode == 500) {
      throw Exception("Server error");
    }
    return response.body;
  } catch (e) {
    throw Exception('Request failed: $e');
  }
}
