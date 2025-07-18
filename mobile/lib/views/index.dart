import 'package:flutter/material.dart';

import '../utils/center_widget.dart';

class IndexView extends StatelessWidget {
  const IndexView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('TrivAI')),
      body: SuperCentered(
        children: [
          ElevatedButton(
            child: Text('Play'),
            onPressed: () => Navigator.pushNamed(context, '/play'),
          ),
          SizedBox(height: 16),
          ElevatedButton(
            child: Text('Host'),
            onPressed: () => Navigator.pushNamed(context, '/home'),
          ),
        ],
      ),
    );
  }
}
