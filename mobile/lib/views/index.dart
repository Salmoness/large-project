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
            onPressed: () => Navigator.pushNamed(context, '/play'),
            style: ButtonStyle(
              backgroundColor: WidgetStatePropertyAll(Colors.green),
            ),
            child: Text('Play'),
          ),
          SizedBox(height: 18),
          ElevatedButton(
            child: Text('Host'),
            onPressed: () => Navigator.pushNamed(context, '/home'),
          ),
        ],
      ),
    );
  }
}
