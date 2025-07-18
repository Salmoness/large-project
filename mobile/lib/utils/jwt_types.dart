enum JWTType { userAuth, quizSession }

extension ParseToString on JWTType {
  String name() {
    return toString().split('.').last;
  }
}
