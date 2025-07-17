import 'package:flutter/foundation.dart';

void debugModePrint(String text) {
  if (kDebugMode) {
    debugPrint(text);
  }
}
