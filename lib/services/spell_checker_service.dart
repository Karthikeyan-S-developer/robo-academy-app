import 'dart:convert';
import 'package:flutter/services.dart';

class SpellError {
  final String word;
  final int startIndex;
  final int endIndex;
  final List<String> suggestions;

  SpellError({
    required this.word,
    required this.startIndex,
    required this.endIndex,
    required this.suggestions,
  });
}

class SpellCheckerService {
  static final SpellCheckerService _instance = SpellCheckerService._internal();
  factory SpellCheckerService() => _instance;
  SpellCheckerService._internal();

  Set<String> _dictionary = {};
  bool _isInitialized = false;

  Future<void> initialize() async {
    if (_isInitialized) return;

    try {
      final String dictionaryContent = 
          await rootBundle.loadString('assets/dictionaries/common_words.txt');
      _dictionary = dictionaryContent
          .split('\n')
          .map((word) => word.trim().toLowerCase())
          .where((word) => word.isNotEmpty)
          .toSet();
      
      // Add some additional common words
      _addCommonWords();
      _isInitialized = true;
    } catch (e) {
      print('Error loading dictionary: $e');
      _addCommonWords(); // Use fallback words
      _isInitialized = true;
    }
  }

  void _addCommonWords() {
    final commonWords = [
      'hello', 'world', 'flutter', 'dart', 'application', 'programming',
      'development', 'mobile', 'software', 'computer', 'technology',
      'internet', 'website', 'email', 'password', 'username', 'login',
      'register', 'submit', 'cancel', 'delete', 'edit', 'save', 'create',
      'update', 'remove', 'add', 'search', 'find', 'help', 'about',
      'contact', 'home', 'settings', 'profile', 'account', 'user',
      'admin', 'dashboard', 'report', 'data', 'file', 'folder',
      'document', 'image', 'video', 'audio', 'text', 'message',
      'notification', 'alert', 'warning', 'error', 'success', 'info'
    ];
    _dictionary.addAll(commonWords);
  }

  bool isWordCorrect(String word) {
    if (!_isInitialized) return true; // Assume correct if not initialized
    return _dictionary.contains(word.toLowerCase());
  }

  List<SpellError> checkText(String text) {
    if (!_isInitialized) return [];

    final List<SpellError> errors = [];
    final RegExp wordPattern = RegExp(r'\b[a-zA-Z]+\b');
    final Iterable<Match> matches = wordPattern.allMatches(text);

    for (final Match match in matches) {
      final String word = match.group(0)!;
      if (!isWordCorrect(word)) {
        final suggestions = _generateSuggestions(word);
        errors.add(SpellError(
          word: word,
          startIndex: match.start,
          endIndex: match.end,
          suggestions: suggestions,
        ));
      }
    }

    return errors;
  }

  List<String> _generateSuggestions(String word) {
    final List<String> suggestions = [];
    final String lowerWord = word.toLowerCase();

    // Find words with similar length and starting letter
    for (final String dictWord in _dictionary) {
      if (suggestions.length >= 5) break;
      
      if (_calculateEditDistance(lowerWord, dictWord) <= 2) {
        suggestions.add(dictWord);
      }
    }

    // If no close matches, find words with same starting letter
    if (suggestions.isEmpty && lowerWord.isNotEmpty) {
      for (final String dictWord in _dictionary) {
        if (suggestions.length >= 3) break;
        
        if (dictWord.startsWith(lowerWord[0]) && 
            (dictWord.length - lowerWord.length).abs() <= 2) {
          suggestions.add(dictWord);
        }
      }
    }

    return suggestions;
  }

  int _calculateEditDistance(String a, String b) {
    if (a.length > b.length) {
      return _calculateEditDistance(b, a);
    }

    List<int> distances = List.generate(a.length + 1, (i) => i);

    for (int i = 1; i <= b.length; i++) {
      int diagonal = distances[0];
      distances[0] = i;

      for (int j = 1; j <= a.length; j++) {
        int temp = distances[j];
        if (a[j - 1] == b[i - 1]) {
          distances[j] = diagonal;
        } else {
          distances[j] = 1 + [diagonal, distances[j], distances[j - 1]].reduce((a, b) => a < b ? a : b);
        }
        diagonal = temp;
      }
    }

    return distances[a.length];
  }

  void addWord(String word) {
    _dictionary.add(word.toLowerCase());
  }

  void removeWord(String word) {
    _dictionary.remove(word.toLowerCase());
  }
}