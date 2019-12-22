// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: gray; icon-glyph: book; share-sheet-inputs: file-url, plain-text;
let fm = FileManager.iCloud();
  
if (!fm.bookmarkExists("Textastic")) {
  Script.complete();
}

let bib = "";

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
  Script.complete();
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
};

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

completionFile.completionSets.push(references);

fm.writeString(fm.bookmarkedPath("Textastic"), JSON.stringify(completionFile, null, 2));

Script.complete();
