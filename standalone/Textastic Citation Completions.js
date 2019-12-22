// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// always-run-in-app: true; icon-color: gray;
// icon-glyph: book; share-sheet-inputs: file-url, plain-text;
let fm = FileManager.local();
  
if (!fm.bookmarkExists("Textastic")) {
  let alert = new Alert();
  alert.message = "Please create a bookmark with the name \"Textastic\" that points to the root of the Textastic folder on your device.";
  alert.presentSheet();
}

let bib = ""

if (args.fileURLs.length > 0) {
  bib = fm.readString(args.fileURLs[0]);
}
else if (args.plainTexts.length > 0) {
  bib = args.plainTexts[0];
}
else if (fm.bookmarkExists("Textastic Citations") && fm.fileExists(fm.bookmarkedPath("Textastic Citations"))) {
  bib = fm.readString(fm.bookmarkedPath("Textastic Citations"));
}
else {
  let cancel = new Alert;
  cancel.message = "There was no input to import. To run the script without input, please bookmark a .bib file with the name \"Textastic Citations\".";
  cancel.presentAlert();
}
  

let completionFile = {
	description: "Code Completion for Citations",
	uuid: "6a6b74bb-499d-43cf-89f7-8a2d0815d0d8",
	completionSets: [	],
	contexts: [
		{
			description: "Bibliographic reference completions",
			scope: "text.pandoc, text.html.markdown",
			pattern: "@(.*)",
			completionCaptureIndex: 1,
			completionSetNames: [
				"pandoc.references"
			]
		}
	]
}

let references = {
			name: "pandoc.references",
			defaultAppend: "",
			strings: []
		}

for (match of bib.matchAll(/@([a-zA-Z]*)\s*\{\s*([a-zA-Z0-9_:.#$%&-+?<>~/]*),.*?^\s*title\s*=\s*[\{"](.*?)[\\}"],$/gmis)) {
  let t = match[1].toLowerCase();
  if (["preamble", "string", "comment"].indexOf(t) === -1) {
    references.strings.push({"string": match[2]+" | "+match[3].replace(/[\{\}]/g, ""), "replace": match[2]});
  }
}

completionFile.completionSets.push(references)

let path = fm.joinPath(fm.bookmarkedPath("Textastic"), "#Textastic/CodeCompletion");
fm.createDirectory(path, true);
path = fm.joinPath(path, "citations.json")

fm.writeString(path, JSON.stringify(completionFile, null, 2));
