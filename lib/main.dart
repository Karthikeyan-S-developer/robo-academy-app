import 'package:flutter/material.dart';
import 'widgets/highlighted_text_field.dart';
import 'widgets/spell_check_text_field.dart';

void main() {
  runApp(const SpellCheckerApp());
}

class SpellCheckerApp extends StatelessWidget {
  const SpellCheckerApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Spell Checker App',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: const SpellCheckerHomePage(),
      debugShowCheckedModeBanner: false,
    );
  }
}

class SpellCheckerHomePage extends StatefulWidget {
  const SpellCheckerHomePage({Key? key}) : super(key: key);

  @override
  State<SpellCheckerHomePage> createState() => _SpellCheckerHomePageState();
}

class _SpellCheckerHomePageState extends State<SpellCheckerHomePage> {
  final TextEditingController _controller = TextEditingController();
  int _selectedTab = 0;

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Spell Checker'),
        backgroundColor: Colors.blue.shade700,
        foregroundColor: Colors.white,
        elevation: 2,
        actions: [
          IconButton(
            icon: const Icon(Icons.info_outline),
            onPressed: () => _showInfoDialog(context),
          ),
        ],
      ),
      body: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [
              Colors.blue.shade50,
              Colors.white,
            ],
          ),
        ),
        child: SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.all(20.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Header section
                Container(
                  padding: const EdgeInsets.all(20),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(12),
                    boxShadow: [
                      BoxShadow(
                        color: Colors.grey.withOpacity(0.1),
                        spreadRadius: 1,
                        blurRadius: 6,
                        offset: const Offset(0, 2),
                      ),
                    ],
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          Icon(
                            Icons.spellcheck,
                            size: 28,
                            color: Colors.blue.shade700,
                          ),
                          const SizedBox(width: 12),
                          Text(
                            'Smart Spell Checker',
                            style: TextStyle(
                              fontSize: 24,
                              fontWeight: FontWeight.bold,
                              color: Colors.grey.shade800,
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 8),
                      Text(
                        'Type your text below and watch as misspelled words are highlighted in real-time. Click on any highlighted word to see suggestions.',
                        style: TextStyle(
                          fontSize: 14,
                          color: Colors.grey.shade600,
                          height: 1.4,
                        ),
                      ),
                    ],
                  ),
                ),
                
                const SizedBox(height: 24),
                
                // Tab selector
                Container(
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(12),
                    boxShadow: [
                      BoxShadow(
                        color: Colors.grey.withOpacity(0.1),
                        spreadRadius: 1,
                        blurRadius: 6,
                        offset: const Offset(0, 2),
                      ),
                    ],
                  ),
                  child: Row(
                    children: [
                      Expanded(
                        child: GestureDetector(
                          onTap: () => setState(() => _selectedTab = 0),
                          child: Container(
                            padding: const EdgeInsets.symmetric(vertical: 16),
                            decoration: BoxDecoration(
                              color: _selectedTab == 0 ? Colors.blue.shade700 : Colors.transparent,
                              borderRadius: const BorderRadius.only(
                                topLeft: Radius.circular(12),
                                bottomLeft: Radius.circular(12),
                              ),
                            ),
                            child: Text(
                              'Enhanced Editor',
                              textAlign: TextAlign.center,
                              style: TextStyle(
                                color: _selectedTab == 0 ? Colors.white : Colors.grey.shade700,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ),
                        ),
                      ),
                      Expanded(
                        child: GestureDetector(
                          onTap: () => setState(() => _selectedTab = 1),
                          child: Container(
                            padding: const EdgeInsets.symmetric(vertical: 16),
                            decoration: BoxDecoration(
                              color: _selectedTab == 1 ? Colors.blue.shade700 : Colors.transparent,
                              borderRadius: const BorderRadius.only(
                                topRight: Radius.circular(12),
                                bottomRight: Radius.circular(12),
                              ),
                            ),
                            child: Text(
                              'Basic Editor',
                              textAlign: TextAlign.center,
                              style: TextStyle(
                                color: _selectedTab == 1 ? Colors.white : Colors.grey.shade700,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
                
                const SizedBox(height: 20),
                
                // Content area
                Container(
                  padding: const EdgeInsets.all(20),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(12),
                    boxShadow: [
                      BoxShadow(
                        color: Colors.grey.withOpacity(0.1),
                        spreadRadius: 1,
                        blurRadius: 6,
                        offset: const Offset(0, 2),
                      ),
                    ],
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        _selectedTab == 0 ? 'Enhanced Spell Checker' : 'Basic Spell Checker',
                        style: TextStyle(
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                          color: Colors.grey.shade800,
                        ),
                      ),
                      const SizedBox(height: 16),
                      
                      if (_selectedTab == 0) ...[
                        Text(
                          'Features:',
                          style: TextStyle(
                            fontSize: 14,
                            fontWeight: FontWeight.bold,
                            color: Colors.grey.shade700,
                          ),
                        ),
                        const SizedBox(height: 8),
                        _buildFeatureItem(Icons.highlight, 'Real-time highlighting with wavy underlines'),
                        _buildFeatureItem(Icons.touch_app, 'Click on highlighted words for suggestions'),
                        _buildFeatureItem(Icons.library_add, 'Add words to personal dictionary'),
                        _buildFeatureItem(Icons.analytics, 'Live error count display'),
                        const SizedBox(height: 20),
                        HighlightedTextField(
                          controller: _controller,
                          hintText: 'Start typing here... Try words like "heelo", "wrold", "misteak"',
                          maxLines: 8,
                          style: const TextStyle(fontSize: 16, height: 1.5),
                        ),
                      ] else ...[
                        Text(
                          'A simpler version with basic spell checking functionality.',
                          style: TextStyle(
                            fontSize: 14,
                            color: Colors.grey.shade600,
                          ),
                        ),
                        const SizedBox(height: 16),
                        SpellCheckTextField(
                          hintText: 'Type your text here...',
                          maxLines: 8,
                          style: const TextStyle(fontSize: 16, height: 1.5),
                        ),
                      ],
                      
                      const SizedBox(height: 20),
                      
                      // Sample text buttons
                      Text(
                        'Try these sample texts:',
                        style: TextStyle(
                          fontSize: 14,
                          fontWeight: FontWeight.bold,
                          color: Colors.grey.shade700,
                        ),
                      ),
                      const SizedBox(height: 12),
                      
                      Wrap(
                        spacing: 8,
                        runSpacing: 8,
                        children: [
                          _buildSampleButton('Hello wrold! This is a spel cheker test.'),
                          _buildSampleButton('I am writting a sentance with mistaks.'),
                          _buildSampleButton('Flutter is an amazng framwork for mobil development.'),
                          _buildSampleButton('Artifical inteligence is revolutionizing tecnology.'),
                        ],
                      ),
                    ],
                  ),
                ),
                
                const SizedBox(height: 40),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildFeatureItem(IconData icon, String text) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 6),
      child: Row(
        children: [
          Icon(icon, size: 16, color: Colors.blue.shade600),
          const SizedBox(width: 8),
          Expanded(
            child: Text(
              text,
              style: TextStyle(
                fontSize: 12,
                color: Colors.grey.shade600,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSampleButton(String text) {
    return ElevatedButton(
      onPressed: () {
        _controller.text = text;
      },
      style: ElevatedButton.styleFrom(
        backgroundColor: Colors.blue.shade50,
        foregroundColor: Colors.blue.shade700,
        elevation: 0,
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(8),
          side: BorderSide(color: Colors.blue.shade200),
        ),
      ),
      child: Text(
        text.length > 30 ? '${text.substring(0, 30)}...' : text,
        style: const TextStyle(fontSize: 12),
      ),
    );
  }

  void _showInfoDialog(BuildContext context) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('About Spell Checker'),
        content: const Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('This Flutter application demonstrates real-time spell checking capabilities similar to Grammarly.'),
            SizedBox(height: 12),
            Text('Features:'),
            SizedBox(height: 8),
            Text('• Real-time spell checking as you type'),
            Text('• Visual highlighting of misspelled words'),
            Text('• Intelligent word suggestions'),
            Text('• Personal dictionary management'),
            Text('• Two different editor interfaces'),
            SizedBox(height: 12),
            Text('Try typing some misspelled words to see the spell checker in action!'),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: const Text('Close'),
          ),
        ],
      ),
    );
  }
}