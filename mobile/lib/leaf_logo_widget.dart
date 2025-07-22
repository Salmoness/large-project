import 'package:flutter/material.dart';

class LeafLogo extends StatelessWidget {
  const LeafLogo({super.key});

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Image.asset('assets/images/leaf.png', height: 32),
        const SizedBox(width: 8),
        Text('TrivAI', style: const TextStyle(fontSize: 20)),
      ],
    );
  }
}
