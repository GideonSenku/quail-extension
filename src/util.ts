import * as vscode from "vscode";
import matter from 'gray-matter';

function getActiveFileFrontmatter() {
  const activeEditor = vscode.window.activeTextEditor;
  const document = activeEditor?.document;
  const fileContent = document?.getText() || "";
  if (!document) {
    return { frontmatter: null, content: "" };
  }
  const result = matter(fileContent);
  console.log('result', result.data);
  return {
    frontmatter: result.data,
    content: result.content,
  };
}

export default {
  getActiveFileFrontmatter,
};
