# Flutter Spell Checker App

A beautiful Flutter application that implements real-time spell checking functionality similar to Grammarly. The app highlights misspelled words as you type and provides intelligent suggestions for corrections.

## Features

### 🌟 Enhanced Editor
- **Real-time highlighting**: Misspelled words are highlighted with red wavy underlines as you type
- **Interactive suggestions**: Click on any highlighted word to see spelling suggestions
- **Personal dictionary**: Add words to your personal dictionary to prevent them from being flagged
- **Live error counter**: See the number of spelling errors in real-time
- **Beautiful UI**: Modern, clean interface with gradient backgrounds and smooth animations

### 📝 Basic Editor
- Simple spell checking functionality
- Error count display
- Clean text input interface

## Technical Implementation

### Core Components

1. **SpellCheckerService** (`lib/services/spell_checker_service.dart`)
   - Dictionary management with common English words
   - Edit distance algorithm for intelligent suggestions
   - Word pattern matching using regular expressions
   - Personal dictionary functionality

2. **HighlightedTextField** (`lib/widgets/highlighted_text_field.dart`)
   - Custom text field with overlay highlighting
   - RichText implementation for styled text display
   - Gesture recognition for word suggestions
   - Real-time spell checking

3. **SpellCheckTextField** (`lib/widgets/spell_check_text_field.dart`)
   - Basic spell checking text field
   - Error reporting and suggestions

### Algorithms Used

- **Levenshtein Distance**: For calculating edit distance between words
- **Regular Expressions**: For word boundary detection and pattern matching
- **Dictionary Lookup**: Fast hash-based word validation
- **Suggestion Generation**: Multiple strategies for finding similar words

## Getting Started

### Prerequisites

- Flutter SDK (>=3.0.0)
- Dart SDK
- Android Studio / VS Code with Flutter extensions

### Installation

1. **Clone or download the project files**

2. **Install dependencies**:
   ```bash
   flutter pub get
   ```

3. **Run the application**:
   ```bash
   flutter run
   ```

### Project Structure

```
lib/
├── main.dart                           # Main application entry point
├── services/
│   └── spell_checker_service.dart      # Core spell checking logic
└── widgets/
    ├── highlighted_text_field.dart     # Enhanced text field with highlighting
    └── spell_check_text_field.dart     # Basic spell checking text field

assets/
└── dictionaries/
    └── common_words.txt                # Dictionary file with common words
```

## How to Use

1. **Launch the app** and you'll see the main interface with two editor options

2. **Choose an editor**:
   - **Enhanced Editor**: Full-featured spell checker with visual highlighting
   - **Basic Editor**: Simple spell checking functionality

3. **Start typing** and watch as misspelled words are highlighted in real-time

4. **Click on highlighted words** (Enhanced Editor) to see suggestions:
   - Select a suggestion to replace the misspelled word
   - Add the word to your personal dictionary
   - Dismiss the suggestion panel

5. **Try sample texts** using the provided buttons to see the spell checker in action

## Sample Text Ideas

Try typing these sentences to test the spell checker:
- "Hello wrold! This is a spel cheker test."
- "I am writting a sentance with mistaks."
- "Flutter is an amazng framwork for mobil development."
- "Artifical inteligence is revolutionizing tecnology."

## Customization

### Adding Words to Dictionary

You can expand the dictionary by:
1. Adding words to `assets/dictionaries/common_words.txt`
2. Using the "Add to dictionary" feature in the app
3. Modifying the `_addCommonWords()` method in `SpellCheckerService`

### Styling

The app uses a modern design with:
- Blue color scheme (`Colors.blue.shade700`)
- Gradient backgrounds
- Card-based layouts with shadows
- Smooth animations and transitions

### Advanced Configuration

- **Edit Distance Threshold**: Modify the threshold in `_generateSuggestions()` for stricter/looser suggestions
- **Maximum Suggestions**: Change the suggestion limit in the suggestion generation logic
- **Dictionary Size**: Expand the dictionary file for better coverage

## Technical Details

### Spell Checking Algorithm

1. **Text Analysis**: Uses regex pattern `\b[a-zA-Z]+\b` to identify words
2. **Dictionary Lookup**: O(1) hash-based lookup for word validation
3. **Error Detection**: Flags words not found in the dictionary
4. **Suggestion Generation**: 
   - Calculates edit distance for similar words
   - Prioritizes words with same starting letter
   - Limits suggestions to maintain performance

### Performance Considerations

- Efficient dictionary storage using `Set<String>`
- Debounced spell checking to avoid excessive processing
- Limited suggestion count for faster response
- Optimized text rendering with RichText widgets

## Future Enhancements

Potential improvements could include:
- Grammar checking beyond spell checking
- Context-aware suggestions
- Multiple language support
- Cloud-based dictionary updates
- Advanced text formatting options
- Export/import functionality for personal dictionaries

## Dependencies

- `flutter/material.dart`: UI framework
- `flutter/services.dart`: Asset loading
- `flutter/gestures.dart`: Touch gesture handling

## Contributing

To contribute to this project:
1. Fork the repository
2. Create a feature branch
3. Implement your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is created as a demonstration of Flutter spell checking capabilities and is available for educational and personal use.

---

**Note**: This is a demonstration app with a basic English dictionary. For production use, consider integrating with comprehensive spell checking services or larger dictionary databases.
