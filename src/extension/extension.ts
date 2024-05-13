// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "salesforce-flow-visualiser" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('salesforce-flow-visualiser.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from salesforce-flow-visualiser!');
    let webview = vscode.window.createWebviewPanel(
      'salesforce-flow-visualiser',
      'Salesforce Flow Visualiser',
      vscode.ViewColumn.One,
      {
        enableScripts: true,
        retainContextWhenHidden: true,
        localResourceRoots: [vscode.Uri.joinPath(context.extensionUri, 'out', 'ui')]
      }
    );
    const scriptPath = vscode.Uri.joinPath(context.extensionUri, 'out', 'ui', 'index.js');
		const scriptUri = webview.webview.asWebviewUri(scriptPath);
    webview.webview.html = `
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'unsafe-eval' 'unsafe-inline' vscode-resource:;">
          <title>Salesforce Flow Visualiser</title>
        </head>
        <body>
          <div>Non-Preact message - ${scriptUri}</div>
          <div id="app"/>
          <script type="module" src="${scriptUri}"></script>
        </body>
      </html>
    `;

	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
