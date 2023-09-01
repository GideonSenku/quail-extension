// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "quail" is now active!');
  const apiKey = vscode.workspace.getConfiguration().get("quail.apiKey");
  if (!apiKey) {
    // 如果没有保存 API 密钥，则提示用户输入
    vscode.window
      .showInputBox({
        prompt: "请输入 API 密钥",
        ignoreFocusOut: true, // 允许用户在点击外部时继续输入
      })
      .then((userApiKey) => {
        if (userApiKey) {
          // 如果用户输入了 API 密钥，保存到配置中
          vscode.workspace
            .getConfiguration()
            .update(
              "quail.apiKey",
              userApiKey,
              vscode.ConfigurationTarget.Global
            );
          vscode.window.showInformationMessage("API 密钥已保存！");
        } else {
          vscode.window.showWarningMessage(
            "未提供 API 密钥，某些功能可能受限。"
          );
        }
      });
  } else {
    vscode.window.showInformationMessage("API 密钥已配置！");
  }

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand("quail.helloWorld", () => {
    // The code you place here will be executed every time your command is executed
    // Display a message box to the user
    vscode.window.showInformationMessage("Hello World from quail!");
  });

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
