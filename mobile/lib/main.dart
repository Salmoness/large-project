import 'package:flutter/material.dart';
import 'iframe_widget.dart';

void main() {
  runApp(
    MaterialApp(
      home: Scaffold(
        appBar: AppBar(title: const Text('Flutter IFrame Example')),
        body: Center(
          child: IFrameWidget(
            url: 'http://hopethiswork.com',
          ), // Replace with desired URL
        ),
      ),
    ),
  );
}
