import * as vscode from "vscode";
import util from "./util";
import fm from './frontmatter';

const insertMetadataFn = () => {
  const activeEditor = vscode.window.activeTextEditor;
  if (activeEditor) {
    const document = activeEditor.document;
    if (document.languageId === "markdown") {
      const { frontmatter } = util.getActiveFileFrontmatter();
      if (Object.values(frontmatter as object).length === 0) {
        const position = new vscode.Position(0, 0);
        activeEditor.edit((editBuilder) => {
          const fmc = fm.emptyFrontmatter();
          editBuilder.insert(position, fmc);
        });
      } else {
        console.log("current frontmatter: ", frontmatter);
        vscode.window.showWarningMessage(
          "Metadata already exists, Please edit manually or use AI to generate it"
        );
      }
    }
  }
};


export default {
  insertMetadataFn,
};
