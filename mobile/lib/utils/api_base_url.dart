import 'package:flutter/foundation.dart';

String getAPIBaseURL() {
  if (kDebugMode) {
    return "http://localhost:5000/api";
  } else {
    return "http://hopethiswork.com:5000/api";
  }
}
