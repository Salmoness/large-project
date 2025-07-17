import 'package:flutter/material.dart';

ThemeData darkTheme = ThemeData(
  brightness: Brightness.dark,
  scaffoldBackgroundColor: Color(0xFF121212),

  // AppBar
  appBarTheme: AppBarTheme(
    backgroundColor: Color(0xFF1F1F1F),
    foregroundColor: Colors.white,
    elevation: 0,
    iconTheme: IconThemeData(color: Colors.white),
    titleTextStyle: TextStyle(
      color: Colors.white,
      fontSize: 20,
      fontWeight: FontWeight.bold,
    ),
  ),

  // Text
  textTheme: TextTheme(
    bodyMedium: TextStyle(color: Colors.white),
    bodyLarge: TextStyle(color: Colors.white),
    titleLarge: TextStyle(color: Colors.white),
    labelLarge: TextStyle(color: Colors.white),
  ),

  // Inputs
  inputDecorationTheme: InputDecorationTheme(
    filled: true,
    fillColor: Color(0xFF1F1F1F), // Dark fill for input
    labelStyle: TextStyle(color: Colors.white38),
    hintStyle: TextStyle(color: Colors.white54),
    border: OutlineInputBorder(
      borderSide: BorderSide(color: Colors.white24),
      borderRadius: BorderRadius.circular(8),
    ),
    enabledBorder: OutlineInputBorder(
      borderSide: BorderSide(color: Colors.white30),
      borderRadius: BorderRadius.circular(8),
    ),
    focusedBorder: OutlineInputBorder(
      borderSide: BorderSide(color: Colors.white),
      borderRadius: BorderRadius.circular(8),
    ),
  ),

  // Buttons
  elevatedButtonTheme: ElevatedButtonThemeData(
    style: ElevatedButton.styleFrom(
      backgroundColor: Colors.deepPurpleAccent,
      foregroundColor: Colors.white,
      padding: EdgeInsets.symmetric(vertical: 12, horizontal: 24),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
      textStyle: TextStyle(fontSize: 16),
      minimumSize: Size(200, 50),
    ),
  ),
);
