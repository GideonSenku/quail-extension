// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import actions from "./actions";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "quail" is now active!');
  const apiKey = vscode.workspace.getConfiguration().get("quail.apiKey");
  console.log("apiKey", apiKey);
  if (!apiKey) {
    // 如果没有保存 API 密钥，则提示用户输入
    console.log("No API Key found, please enter your API Key.");
    vscode.window
      .showInputBox({
        title: "Quail API Key",
        prompt:
          "Please grab your API key from https://quail.ink/profile/apikeys",
        ignoreFocusOut: true, // 允许用户在点击外部时继续输入
        placeHolder: "Enter API Key",
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
          vscode.window
            .showInputBox({
              title: "List ID or slug",
              prompt: `Your list ID or slug. You can find it in the URL of your list page. For example, if your list URL is https://quail.ink/my-list, your list ID or slug is "my-list".`,
              placeHolder: "Enter List ID or slug",
              ignoreFocusOut: true,
            })
            .then((userListId) => {
              if (userListId) {
                // 如果用户输入了 List ID，保存到配置中
                vscode.workspace
                  .getConfiguration()
                  .update(
                    "quail.listId",
                    userListId,
                    vscode.ConfigurationTarget.Global
                  );
                vscode.window.showInformationMessage(
                  "API Key 和 List ID 已保存！"
                );
              } else {
                vscode.window.showWarningMessage(
                  "List ID 不能为空，某些功能可能受限。"
                );
              }
            });
        } else {
          vscode.window.showWarningMessage(
            "未提供 API 密钥，某些功能可能受限。"
          );
        }
      });
  }

  let insertMetadata = vscode.commands.registerCommand(
    "extension.insertMetadata",
    actions.insertMetadataFn,
  );

  context.subscriptions.push(insertMetadata);
}

// This method is called when your extension is deactivated
export function deactivate() {}
