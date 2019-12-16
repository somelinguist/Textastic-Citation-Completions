Scriptable app script to create and update a code completion file in Textastic for Pandoc-style citations in markdown files.


# Siri Shortcut
This version is a Siri Shortcut that can be run without opening Scriptable and can also be used as an Personal Automation. The shortcut will walk you through installation the first time.

## Installation
1. Enable shared/untrusted shortcuts as described on [Apple's website](https://support.apple.com/en-gb/guide/shortcuts/apdfeb05586f/3.2/ios/13.2) if you haven't already done so.
2. Get the shared Updated Textastic Citations shortcut here: [https://www.icloud.com/shortcuts/fe1101d4c92746b2aa2c30a357f961c1](https://www.icloud.com/shortcuts/fe1101d4c92746b2aa2c30a357f961c1).
3. On first run, the shortcut will walk you through the necessary installation steps:
    - Installing the bundled script into Scriptable. You can see the script that it installs at `shortcut/Update Textastic Citations.js`.
    - Creating the necessary file `#Textastic/CodeCompletion/citations.json` in Textastic's document folder in `On My iPad`, and automatically creating the Bookmark needed in Scriptable.
    - Optionally creating a Bookmark to a default `.bib` file to use when running the script without input from the Share Sheet. This is a necessary step if you want to use the shortcut as a Personal Automation that can run automatically when you open Textastic to update citation completions. If you choose `No` at this step, the shortcut in 4. can be used to set a default bibliography.
4. Optionally, get an additional shortcut that can be used to update which `.bib` file should be used by default: [https://www.icloud.com/shortcuts/cedf14579a274c029a4e029d8526f53a](https://www.icloud.com/shortcuts/cedf14579a274c029a4e029d8526f53a). You could also create your own that updates the `Textastic Citations` Bookmark.

## Usage
If you specified a default bibliography during installation:

1. Restart Textastic for it to load the updated completions. This is necessary any time the .bib file is updated.
2. While editing markdown files, Textastic should now offer completions for in-text citations from the .bib file after typing `@`.

If you want to update the completions after updating the file bookmarked as the default one, just run the shortcut from the Shortcuts app, widget, etc. Then just restart Textastic.

If you want to temporarily update the completions without changing the default bibliography, you can run the shortcut from the Share Sheet and pass a single `.bib` file or selected entries as text. You can reset the completions to the default bibliography by running the shortcut without passing any options.

To change the default `.bib` file used for updates, run the shortcut referenced in 4. above (you could also make your own shortcut that just modifies the `Textastic Citations` bookmark.

## Use the shortcut as a Personal Automation
Once installed, the shortcut can be used as a Personal Automation to automatically update citation completions when Textastic is started. This requires a default bibliography to be set.

 > The usefulness of this probably quite low, but look at what you can do!

1. In the Shortcuts app, switch to the Automation tab and create a new Personal Automation.
2. Choose the `Settings->Open App` trigger.
3. Choose Textastic as the App to use as the trigger, then tap `Next`.
4. Add the `Run Shortcut` action.
5. Choose `Update Textastic Citations` as the shortcut to run.
6. Optionally, tap `Show More` and unset `Show While Running`, then tap `Next`.
7. Optionally, unset `Ask Before Running` and respond to the alert, then tap `Done`

After that, whenever Textastic is run, the shortcut will update citation completions based on the default bibliography.

 > Be warned, it will also show a notification *every time* you switch to Textastic from a different app, your home screen, the app switcher.


# Standalone script for use in Scriptable
This version only requires Scriptable and Textastic. It needs to open the Scriptable app when run in order to make use of the needed Bookmarks. It requires manual installation as described below.

## Installation
1. Copy the script `standalone/Textastic Citation Completions.js` to Scriptable.
2. Create a bookmark named "Textastic" in Scriptable that points to the local document root in Textastic.
3. Optionally create an additional bookmark named "Textastic Citations" that points to a .bib file to use when no input is passed to the script. This can be used to update citations from a frequently used .bib file.
  
## Usage
1. Use the Share Sheet to pass a single `.bib` file or selected entries as text.
  - If a default bibliography has been set, the script can also just be run in Scriptable.
2. Restart Textastic for it to load the updated completions. This is necessary any time the .bib file is updated.
3. While editing markdown files, Textastic should now offer completions for in-text citations from the .bib file after typing `@`.
    
# Possible future improvements
- [ ] Support CSL JSON as input.
- [ ] Support CSL YAML as input.
