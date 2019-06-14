import * as path from "path";
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "workspaceSettings" is now active!'
  );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "extension.openWorkspaceSettingsJson",
    () => {
      if (!vscode.workspace.rootPath) {
        return;
      }
      const editor = new vscode.WorkspaceEdit();

      // set filepath for settings.json
      const filePath = path.join(
        vscode.workspace.rootPath,
        ".vscode",
        "settings.json"
      );

      const openPath = vscode.Uri.file(filePath);
      // create settings.json if it does not exist
      editor.createFile(openPath, { ignoreIfExists: true });
      // open workspace settings.json
      vscode.workspace.applyEdit(editor).then(() => {
        vscode.workspace.openTextDocument(openPath).then(doc => {
          vscode.window.showTextDocument(doc);
        });
      });
    }
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
