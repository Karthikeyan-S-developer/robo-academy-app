import 'package:flutter/material.dart';
import 'package:flutter/gestures.dart';
import '../services/spell_checker_service.dart';

class HighlightedTextField extends StatefulWidget {
  final TextEditingController? controller;
  final String? hintText;
  final int? maxLines;
  final TextStyle? style;
  final Function(String)? onChanged;

  const HighlightedTextField({
    Key? key,
    this.controller,
    this.hintText,
    this.maxLines,
    this.style,
    this.onChanged,
  }) : super(key: key);

  @override
  State<HighlightedTextField> createState() => _HighlightedTextFieldState();
}

class _HighlightedTextFieldState extends State<HighlightedTextField> {
  late TextEditingController _controller;
  final SpellCheckerService _spellChecker = SpellCheckerService();
  List<SpellError> _spellErrors = [];
  final FocusNode _focusNode = FocusNode();
  OverlayEntry? _overlayEntry;
  final GlobalKey _textFieldKey = GlobalKey();

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

  void _showSuggestions(SpellError error, Offset globalPosition) {
    _removeOverlay();

    _overlayEntry = OverlayEntry(
      builder: (context) => Positioned(
        left: globalPosition.dx,
        top: globalPosition.dy + 25,
        child: Material(
          elevation: 8,
          borderRadius: BorderRadius.circular(8),
          child: Container(
            constraints: const BoxConstraints(maxWidth: 250, maxHeight: 300),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(8),
              border: Border.all(color: Colors.grey.shade300),
            ),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Container(
                  width: double.infinity,
                  padding: const EdgeInsets.all(12),
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
                           color: Colors.red.shade700, size: 18),
                      const SizedBox(width: 8),
                      Expanded(
                        child: Text(
                          'Misspelled: "${error.word}"',
                          style: TextStyle(
                            color: Colors.red.shade700,
                            fontWeight: FontWeight.bold,
                            fontSize: 13,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
                if (error.suggestions.isNotEmpty) ...[
                  Container(
                    width: double.infinity,
                    padding: const EdgeInsets.all(8),
                    child: const Text(
                      'Suggestions:',
                      style: TextStyle(
                        fontWeight: FontWeight.bold,
                        fontSize: 12,
                        color: Colors.grey,
                      ),
                    ),
                  ),
                  ...error.suggestions.take(4).map((suggestion) => InkWell(
                    onTap: () => _replaceMisspelledWord(error, suggestion),
                    child: Container(
                      width: double.infinity,
                      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                      child: Text(
                        suggestion,
                        style: const TextStyle(fontSize: 14),
                      ),
                    ),
                  )),
                ] else ...[
                  const Padding(
                    padding: EdgeInsets.all(12),
                    child: Text(
                      'No suggestions available',
                      style: TextStyle(
                        fontSize: 12,
                        color: Colors.grey,
                        fontStyle: FontStyle.italic,
                      ),
                    ),
                  ),
                ],
                const Divider(height: 1),
                InkWell(
                  onTap: () => _addToDictionary(error.word),
                  child: Container(
                    width: double.infinity,
                    padding: const EdgeInsets.all(12),
                    child: Row(
                      children: [
                        Icon(Icons.add, size: 16, color: Colors.blue.shade700),
                        const SizedBox(width: 8),
                        Text(
                          'Add "${error.word}" to dictionary',
                          style: TextStyle(
                            fontSize: 12,
                            color: Colors.blue.shade700,
                          ),
                        ),
                      ],
                    ),
                  ),
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
        backgroundColor: Colors.green,
      ),
    );
  }

  Widget _buildHighlightedText() {
    if (_controller.text.isEmpty) {
      return Container();
    }

    final spans = <TextSpan>[];
    int lastIndex = 0;

    // Sort errors by start index to process them in order
    final sortedErrors = List<SpellError>.from(_spellErrors)
      ..sort((a, b) => a.startIndex.compareTo(b.startIndex));

    for (final error in sortedErrors) {
      // Add normal text before error
      if (error.startIndex > lastIndex) {
        spans.add(TextSpan(
          text: _controller.text.substring(lastIndex, error.startIndex),
          style: widget.style ?? const TextStyle(fontSize: 16),
        ));
      }

      // Add error text with red wavy underline and tap gesture
      spans.add(TextSpan(
        text: error.word,
        style: (widget.style ?? const TextStyle(fontSize: 16)).copyWith(
          decoration: TextDecoration.underline,
          decorationColor: Colors.red,
          decorationStyle: TextDecorationStyle.wavy,
          decorationThickness: 2,
        ),
        recognizer: TapGestureRecognizer()
          ..onTap = () {
            final RenderBox? renderBox = _textFieldKey.currentContext?.findRenderObject() as RenderBox?;
            if (renderBox != null) {
              final position = renderBox.localToGlobal(Offset.zero);
              _showSuggestions(error, Offset(position.dx + 50, position.dy));
            }
          },
      ));

      lastIndex = error.endIndex;
    }

    // Add remaining normal text
    if (lastIndex < _controller.text.length) {
      spans.add(TextSpan(
        text: _controller.text.substring(lastIndex),
        style: widget.style ?? const TextStyle(fontSize: 16),
      ));
    }

    return RichText(
      text: TextSpan(children: spans),
    );
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        _removeOverlay();
      },
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            key: _textFieldKey,
            width: double.infinity,
            constraints: BoxConstraints(
              minHeight: widget.maxLines != null ? widget.maxLines! * 24.0 : 48,
            ),
            decoration: BoxDecoration(
              border: Border.all(color: Colors.grey.shade400),
              borderRadius: BorderRadius.circular(4),
              color: Colors.grey.shade50,
            ),
            child: Stack(
              children: [
                // The actual text field (invisible text)
                TextField(
                  controller: _controller,
                  focusNode: _focusNode,
                  maxLines: widget.maxLines,
                  style: (widget.style ?? const TextStyle(fontSize: 16)).copyWith(
                    color: Colors.transparent,
                  ),
                  decoration: InputDecoration(
                    hintText: widget.hintText,
                    hintStyle: const TextStyle(color: Colors.grey),
                    border: InputBorder.none,
                    contentPadding: const EdgeInsets.all(12),
                  ),
                  cursorColor: Colors.blue,
                ),
                // The highlighted text overlay
                Positioned.fill(
                  child: IgnorePointer(
                    child: Container(
                      padding: const EdgeInsets.all(12),
                      child: _controller.text.isEmpty
                          ? Text(
                              widget.hintText ?? '',
                              style: const TextStyle(color: Colors.grey),
                            )
                          : _buildHighlightedText(),
                    ),
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 8),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                'Characters: ${_controller.text.length}',
                style: TextStyle(
                  color: Colors.grey.shade600,
                  fontSize: 12,
                ),
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                decoration: BoxDecoration(
                  color: _spellErrors.isEmpty ? Colors.green.shade50 : Colors.red.shade50,
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Icon(
                      _spellErrors.isEmpty ? Icons.check_circle : Icons.error,
                      size: 14,
                      color: _spellErrors.isEmpty ? Colors.green : Colors.red,
                    ),
                    const SizedBox(width: 4),
                    Text(
                      '${_spellErrors.length} errors',
                      style: TextStyle(
                        color: _spellErrors.isEmpty ? Colors.green : Colors.red,
                        fontSize: 12,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}