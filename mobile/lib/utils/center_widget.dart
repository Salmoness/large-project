import 'package:flutter/material.dart';

class CenteredView extends StatelessWidget {
  final List<Widget> children;
  final EdgeInsetsGeometry padding;
  final MainAxisSize mainAxisSize;

  const CenteredView({
    super.key,
    required this.children,
    this.padding = const EdgeInsets.all(32),
    this.mainAxisSize = MainAxisSize.min,
  });

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Padding(
        padding: padding,
        child: Column(
          mainAxisSize: mainAxisSize,
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: children,
        ),
      ),
    );
  }
}
