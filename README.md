Scriptable app script to create and update a code completion file in Textastic for Pandoc-style citations in markdown files.

# Installation
1. Copy the script to Scriptable.
2. Create a bookmark named "Textastic" in Scriptable that points to the local document root in Textastic.
3. Optionally create an additional bookmark named "Textastic Citations" that points to a .bib file to use when no input is passed to the script. This can be used to update citations from a frequently used .bib file.
  
# Usage
1. Use the Share Sheet to pass a single .bib file or selected entries as text.
2. Restart Textastic for it to load the updated completions. This is necessary any time the .bib file is updated.
3. While editing markdown files, Textastic should now offer completions for in-text citations from the .bib file after typing `@`.
    
# Possible future improvements
- [ ] Support CSL JSON as input.
- [ ] Support CSL YAML as input.
