import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../services/spell_checker_service.dart';

class SpellCheckTextField extends StatefulWidget {
  final TextEditingController? controller;
  final String? hintText;
  final int? maxLines;
  final TextStyle? style;
  final Function(String)? onChanged;

  const SpellCheckTextField({
    Key? key,
    this.controller,
    this.hintText,
    this.maxLines,
    this.style,
    this.onChanged,
  }) : super(key: key);

  @override
  State<SpellCheckTextField> createState() => _SpellCheckTextFieldState();
}

class _SpellCheckTextFieldState extends State<SpellCheckTextField> {
  late TextEditingController _controller;
  final SpellCheckerService _spellChecker = SpellCheckerService();
  List<SpellError> _spellErrors = [];
  final FocusNode _focusNode = FocusNode();
  OverlayEntry? _overlayEntry;

  @override
  void initState() {
    super.initState();
    _controller = widget.controller ?? TextEditingController();
    _controller.addListener(_onTextChanged);
    _initializeSpellChecker();
  }

  @override
  void dispose() {
    _controller.removeListener(_onTextChanged);
    if (widget.controller == null) {
      _controller.dispose();
    }
    _focusNode.dispose();
    _removeOverlay();
    super.dispose();
  }

  Future<void> _initializeSpellChecker() async {
    await _spellChecker.initialize();
    _checkSpelling();
  }

  void _onTextChanged() {
    _checkSpelling();
    if (widget.onChanged != null) {
      widget.onChanged!(_controller.text);
    }
  }

  void _checkSpelling() {
    final errors = _spellChecker.checkText(_controller.text);
    setState(() {
      _spellErrors = errors;
    });
  }

  void _showSuggestions(SpellError error, Offset position) {
    _removeOverlay();

    _overlayEntry = OverlayEntry(
      builder: (context) => Positioned(
        left: position.dx,
        top: position.dy + 25,
        child: Material(
          elevation: 8,
          borderRadius: BorderRadius.circular(8),
          child: Container(
            constraints: const BoxConstraints(maxWidth: 200, maxHeight: 200),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(8),
              border: Border.all(color: Colors.grey.shade300),
            ),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Container(
                  padding: const EdgeInsets.all(8),
                  decoration: BoxDecoration(
                    color: Colors.red.shade50,
                    borderRadius: const BorderRadius.only(
                      topLeft: Radius.circular(8),
                      topRight: Radius.circular(8),
                    ),
                  ),
                  child: Row(
                    children: [
                      Icon(Icons.error_outline, 
                           color: Colors.red.shade700, size: 16),
                      const SizedBox(width: 4),
                      Expanded(
                        child: Text(
                          'Misspelled: "${error.word}"',
                          style: TextStyle(
                            color: Colors.red.shade700,
                            fontWeight: FontWeight.bold,
                            fontSize: 12,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
                if (error.suggestions.isNotEmpty) ...[
                  const Padding(
                    padding: EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                    child: Text(
                      'Suggestions:',
                      style: TextStyle(
                        fontWeight: FontWeight.bold,
                        fontSize: 12,
                      ),
                    ),
                  ),
                  ...error.suggestions.map((suggestion) => ListTile(
                    dense: true,
                    title: Text(suggestion, style: const TextStyle(fontSize: 14)),
                    onTap: () => _replaceMisspelledWord(error, suggestion),
                    contentPadding: const EdgeInsets.symmetric(horizontal: 8),
                  )),
                ],
                ListTile(
                  dense: true,
                  leading: const Icon(Icons.add, size: 16),
                  title: const Text('Add to dictionary', 
                                  style: TextStyle(fontSize: 12)),
                  onTap: () => _addToDictionary(error.word),
                  contentPadding: const EdgeInsets.symmetric(horizontal: 8),
                ),
              ],
            ),
          ),
        ),
      ),
    );

    Overlay.of(context).insert(_overlayEntry!);
  }

  void _removeOverlay() {
    _overlayEntry?.remove();
    _overlayEntry = null;
  }

  void _replaceMisspelledWord(SpellError error, String replacement) {
    final text = _controller.text;
    final newText = text.replaceRange(error.startIndex, error.endIndex, replacement);
    _controller.text = newText;
    _controller.selection = TextSelection.collapsed(
      offset: error.startIndex + replacement.length,
    );
    _removeOverlay();
  }

  void _addToDictionary(String word) {
    _spellChecker.addWord(word);
    _checkSpelling();
    _removeOverlay();
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Added "$word" to dictionary'),
        duration: const Duration(seconds: 2),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        _removeOverlay();
      },
      child: TextField(
        controller: _controller,
        focusNode: _focusNode,
        maxLines: widget.maxLines,
        style: widget.style,
        decoration: InputDecoration(
          hintText: widget.hintText,
          border: const OutlineInputBorder(),
          filled: true,
          fillColor: Colors.grey.shade50,
        ),
        buildCounter: (context, {required currentLength, required isFocused, maxLength}) {
          return Text(
            'Errors: ${_spellErrors.length}',
            style: TextStyle(
              color: _spellErrors.isEmpty ? Colors.green : Colors.red,
              fontSize: 12,
            ),
          );
        },
      ),
    );
  }
}

// Custom text painter for highlighting misspelled words
class SpellCheckTextPainter extends CustomPainter {
  final String text;
  final List<SpellError> errors;
  final TextStyle textStyle;

  SpellCheckTextPainter({
    required this.text,
    required this.errors,
    required this.textStyle,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final textPainter = TextPainter(
      textDirection: TextDirection.ltr,
    );

    // Create text spans with error highlighting
    final spans = <TextSpan>[];
    int lastIndex = 0;

    for (final error in errors) {
      // Add normal text before error
      if (error.startIndex > lastIndex) {
        spans.add(TextSpan(
          text: text.substring(lastIndex, error.startIndex),
          style: textStyle,
        ));
      }

      // Add error text with red underline
      spans.add(TextSpan(
        text: error.word,
        style: textStyle.copyWith(
          decoration: TextDecoration.underline,
          decorationColor: Colors.red,
          decorationStyle: TextDecorationStyle.wavy,
        ),
      ));

      lastIndex = error.endIndex;
    }

    // Add remaining normal text
    if (lastIndex < text.length) {
      spans.add(TextSpan(
        text: text.substring(lastIndex),
        style: textStyle,
      ));
    }

    textPainter.text = TextSpan(children: spans);
    textPainter.layout(maxWidth: size.width);
    textPainter.paint(canvas, Offset.zero);
  }

  @override
  bool shouldRepaint(SpellCheckTextPainter oldDelegate) {
    return oldDelegate.text != text || 
           oldDelegate.errors.length != errors.length;
  }
}