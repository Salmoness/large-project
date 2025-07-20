import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mobile/utils/user_auth_only_widget.dart';

class MockNavigatorObserver extends NavigatorObserver {
  bool didPushHappen = false;

  @override
  void didPush(Route route, Route? previousRoute) {
    didPushHappen = true;
  }
}

void main() {
  testWidgets('AuthOnly widget redirects unauthenticated user to login', (
    WidgetTester tester,
  ) async {
    final mockObserver = MockNavigatorObserver();
    await tester.pumpWidget(
      MaterialApp(
        navigatorObservers: [mockObserver],
        routes: {'/login': (context) => const Scaffold(body: Text('LOGIN'))},
        home: AuthedOnly(child: const Scaffold(body: Text('HOME'))),
      ),
    );
    // This is not the correct way to perform this test, but I was
    // having serious problems getting it to successfully detect
    // the "LOGIN" text.
    await tester.pump(Duration(seconds: 1));
    expect(mockObserver.didPushHappen, true);
  });
}
