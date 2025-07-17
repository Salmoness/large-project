import 'package:flutter/material.dart';

class ItemListCard extends StatelessWidget {
  final Widget content;
  final Widget? actions;

  const ItemListCard({super.key, required this.content, this.actions});

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: EdgeInsets.symmetric(vertical: 8),
      child: Padding(
        padding: const EdgeInsets.all(12.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            content,
            if (actions != null) ...[
              SizedBox(height: 12),
              Align(alignment: Alignment.centerRight, child: actions!),
            ],
          ],
        ),
      ),
    );
  }
}
