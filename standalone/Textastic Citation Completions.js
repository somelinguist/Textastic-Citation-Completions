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
        description: "Pandoc/markdown reference completions",
        scope: "text.pandoc, text.html.markdown",
        pattern: "(?<![\\w\\d])@(.*)",
        completionCaptureIndex: 1,
        completionSetNames: [
          "citation.references"
        ]
      },
      {
        description: "Bib(La)TeX reference completions - cite",
        scope: "text.tex.latex",
        pattern: "\\\\[cC]ite(\\[.*?\\]){0,2}\\{(?:[^\\}]*,)*([^\\}]*)",
        completionCaptureIndex: 2,
        completionSetNames: [
          "citation.references"
        ]
      },
      {
        description: "BibLaTeX reference completions - cites",
        scope: "text.tex.latex",
        pattern: "\\\\[cC]ites(?:(\\(.*?\\)){0,2}(\\[.*?\\]){0,2}\\{.*?\\})*(\\[.*?\\]){0,2}\\{([^\\}]*)",
        completionCaptureIndex: 4,
        completionSetNames: [
          "citation.references"
        ]
      },
      {
        description: "BibLaTeX reference completions 2",
        scope: "text.tex.latex",
        pattern: "\\\\(foot|[pP]aren|[tT]ext|[sS]mart|super|[aA]uto)cite(\\[.*?\\]){0,2}\\{([^\\}]*)",
        completionCaptureIndex: 3,
        completionSetNames: [
          "citation.references"
        ]
      },
      {
        description: "BibLaTeX reference completions 2 multi",
        scope: "text.tex.latex",
        pattern: "\\\\(foot|[pP]aren|[tT]ext|[sS]mart|super|[aA]uto)cites(?:(\\(.*?\\)){0,2}(\\[.*?\\]){0,2}\\{.*?\\})*(\\[.*?\\]){0,2}\\{([^\\}]*)",
        completionCaptureIndex: 5,
        completionSetNames: [
          "citation.references"
        ]
      },
      {
        description: "BibLaTeX reference completions 3",
        scope: "text.tex.latex",
        pattern: "\\\\cite(author|title|year|date|url)(\\[.*?\\]){0,2}\\{([^\\}]*)",
        completionCaptureIndex: 3,
        completionSetNames: [
          "citation.references"
        ]
      },
      {
        description: "BibLaTeX reference completions 4 *",
        scope: "text.tex.latex",
        pattern: "\\\\(cite|citeauthor|citetitle|parencite|autocite)\\*(\\[.*?\\]){0,2}\\{([^\\}]*)",
        compltionCaptureIndex: 3,
        completionSetNames: [
          "citation.references"
        ]
      },
      {
        description: "BibLaTeX reference completions 5",
        scope: "text.tex.latex",
        pattern: "\\\\(full|footfull|[nN]ote|[pP]note|fnote)cite(\\[.*?\\]){0,2}\\{([^\\}]*)",
        completionCaptureIndex: 3,
        completionSetNames: [
          "citation.references"
        ]
      },
      {
        description: "BibLaTeX reference completions 6",
        scope: "text.tex.latex",
        pattern: "\\\\([vV]|[pP]v|[fF]v|[sS]v|[tT]v|[aA]v|ftv)olcite(\\[.*?\\])?\\{.*?\\}(\\[.*?\\])?\\{([^\\}]*)",
        completionCaptureIndex: 4,
        completionSetNames: [
          "citation.references"
        ]
      },
      {
        description: "BibLaTeX reference completions 6 multi",
        scope: "text.tex.latex",
        pattern: "\\\\([vV]|[pP]v|[fF]v|[sS]v|[tT]v|[aA]v|ftv)olcites(?:(\\(.*?\\)){0,2}(\\[.*?\\])?\\{.*?\\}(\\[.*?\\])?\\{.*?\\})*(\\[.*?\\])?\\{.*?\\}?(\\[.*?\\])?\\{([^\\}])*",
        completionCaptureIndex: 7,
        completionSetNames: [
          "citation.references"
        ]
      },
      {
        description: "BibLaTeX reference completions - foottextcite",
        scope: "text.tex.latex",
        pattern: "\\\\foottextcite(\\[.*?\\]){0,2}\\{([^\\}]*)",
        completionCaptureIndex: 2,
        completionSetNames: [
          "citation.references"
        ]
      },
      {
        description: "BibLaTeX reference completions - foottextcites",
        scope: "text.tex.latex",
        pattern: "\\\\foottextcites(?:(\\(.*?\\)){0,2}(\\[.*?\\]){0,2}\\{.*?\\})*(\\[.*?\\]){0,2}\\{([^\\}]*)",
        completionCaptureIndex: 4,
        completionSetNames: [
          "citation.references"
        ]
      },
      {
        description: "natbib reference completions",
        scope: "text.tex.latex",
        pattern: "\\\\[cC]ite(al)?(t|p)(\\[.*?\\]){0,2}\\{(?:[^\\}]*,)*([^\\}]*)",
        completionCaptureIndex: 4,
        completionSetNames: [
          "citation.references"
        ]
      },
      {
        description: "natbib reference completions - 2",
        scope: "text.tex.latex",
        pattern: "\\\\cite(num|yearpar)(\\[.*?\\]){0,2}\\{(?:[^\\}]*,)*([^\\}]*)",
        completionCaptureIndex: 3,
        completionSetNames: [
          "citation.references"
        ]
      }
    ]
};

let references = {
	name: "citation.references",
	defaultAppend: "",
	strings: []
};

for (match of bib.matchAll(/@([a-zA-Z]*)\s*\{\s*([a-zA-Z0-9_:.#$%&-+?<>~/]*),.*?^\s*title\s*=\s*[\{"](.*?)[\\}"],$/gmis)) {
  let t = match[1].toLowerCase();
  if (["preamble", "string", "comment"].indexOf(t) === -1) {
    references.strings.push({"string": match[2]+" | "+match[3].replace(/[\{\}]/g, ""), "replace": match[2]});
  }
}

completionFile.completionSets.push(references);

let path = fm.joinPath(fm.bookmarkedPath("Textastic"), "#Textastic/CodeCompletion");
fm.createDirectory(path, true);
path = fm.joinPath(path, "citations.json");

fm.writeString(path, JSON.stringify(completionFile, null, 2));
