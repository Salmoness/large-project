import 'package:flutter/material.dart';

ThemeData lightTheme = ThemeData(
  brightness: Brightness.light,
  scaffoldBackgroundColor: Color.fromARGB(255, 226, 238, 250),

  // AppBar
  appBarTheme: AppBarTheme(
    backgroundColor: Color.fromARGB(255, 189, 214, 239),
    foregroundColor: Colors.black,
    elevation: 0,
    iconTheme: IconThemeData(color: Colors.black),
    titleTextStyle: TextStyle(
      color: Colors.black,
      fontSize: 20,
      fontWeight: FontWeight.bold,
    ),
  ),

  // Text
  textTheme: TextTheme(
    bodyMedium: TextStyle(color: Colors.black, fontSize: 16),
    bodyLarge: TextStyle(color: Colors.black, fontSize: 18),
    titleLarge: TextStyle(color: Colors.black),
    labelLarge: TextStyle(color: Colors.black),
    displayLarge: TextStyle(fontSize: 32.0),
    displayMedium: TextStyle(fontSize: 24.0),
    headlineSmall: TextStyle(fontSize: 20.0),
    bodySmall: TextStyle(fontSize: 14.0),
  ),

  // Inputs
  inputDecorationTheme: InputDecorationTheme(
    filled: true,
    fillColor: Color.fromARGB(255, 255, 255, 255),
    labelStyle: TextStyle(color: Color.fromARGB(95, 73, 73, 73)),
    hintStyle: TextStyle(color: Color.fromARGB(95, 73, 73, 73)),
    border: OutlineInputBorder(
      borderSide: BorderSide(color: const Color.fromARGB(60, 35, 35, 35)),
      borderRadius: BorderRadius.circular(8),
    ),
    enabledBorder: OutlineInputBorder(
      borderSide: BorderSide(color: Colors.white30),
      borderRadius: BorderRadius.circular(8),
    ),
    focusedBorder: OutlineInputBorder(
      borderSide: BorderSide(color: Color.fromARGB(95, 33, 33, 33)),
      borderRadius: BorderRadius.circular(8),
    ),
  ),

  // Buttons
  elevatedButtonTheme: ElevatedButtonThemeData(
    style: ElevatedButton.styleFrom(
      backgroundColor: Color.fromARGB(255, 30, 48, 138),
      foregroundColor: Colors.white,
      padding: EdgeInsets.symmetric(vertical: 12, horizontal: 24),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
      textStyle: TextStyle(fontSize: 16),
      minimumSize: Size(200, 50),
    ),
  ),
);
