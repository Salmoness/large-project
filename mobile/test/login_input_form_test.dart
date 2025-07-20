import 'package:flutter_test/flutter_test.dart';
import 'package:flutter/material.dart';
import 'package:mobile/views/login.dart';

void main() {
  testWidgets('Show error if username field is empty on submit', (
    WidgetTester tester,
  ) async {
    await tester.pumpWidget(const MaterialApp(home: LoginView()));
    await tester.tap(find.byKey(const Key('login')));
    await tester.pumpAndSettle();
    expect(find.text('You must provide a username'), findsOneWidget);
  });

  testWidgets('Show error if password field is empty on submit', (
    WidgetTester tester,
  ) async {
    await tester.pumpWidget(const MaterialApp(home: LoginView()));
    await tester.tap(find.byKey(const Key('login')));
    await tester.pumpAndSettle();
    expect(find.text('You must provide a password'), findsOneWidget);
  });

  testWidgets('Do not show error if username field is filled', (
    WidgetTester tester,
  ) async {
    await tester.pumpWidget(const MaterialApp(home: LoginView()));
    await tester.enterText(find.byKey(const Key('username')), 'atestusername');
    await tester.tap(find.byKey(const Key('login')));
    await tester.pumpAndSettle();
    expect(find.text('You must provide a username'), findsNothing);
  });

  testWidgets('Do not show error if password field is filled', (
    WidgetTester tester,
  ) async {
    await tester.pumpWidget(const MaterialApp(home: LoginView()));
    await tester.enterText(find.byKey(const Key('password')), 'atestpassword');
    await tester.tap(find.byKey(const Key('login')));
    await tester.pumpAndSettle();
    expect(find.text('You must provide a password'), findsNothing);
  });
}
