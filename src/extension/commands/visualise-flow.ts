import * as vscode from "vscode";
import { parseFlowXml } from "../workers/flow-xml-worker";
import { generateWebviewConfigurationObject } from "../workers/configuration-worker";
import { WEBVIEW_CONFIGS } from "../constants/configurations";

export default function visualiseFlow(context: vscode.ExtensionContext): void {
  //Register config 
  //Register Command
  context.subscriptions.push(vscode.commands.registerCommand('salesforce-flow-visualiser.visualise-flow', async () => {
    try {
      //Parse XML
      const flowData = parseFlowXml(vscode.window.activeTextEditor!.document.fileName, vscode.window.activeTextEditor!.document.getText());
      // Create webview
      let webview = vscode.window.createWebviewPanel(
        'salesforce-flow-visualiser',
        `${flowData.fileName.substring(flowData.fileName.lastIndexOf('\\') + 1)} | Salesforce Flow Visualiser`,
        vscode.ViewColumn.One,
        {
          enableScripts: true,
          retainContextWhenHidden: true,
          localResourceRoots: [vscode.Uri.joinPath(context.extensionUri, 'out', 'ui')]
        }
      );
      //Send configuration to webview
      const sendConfigToWebview = () => {
        webview.webview.postMessage({
          type: 'config-change', 
          configs: generateWebviewConfigurationObject()
        });
      }
      //Setup config change handler
      vscode.workspace.onDidChangeConfiguration(
        (pEvent) => {
          //Make sure we only send config to webview if it's one of the ones we send
          if(WEBVIEW_CONFIGS.some(pConfig => pEvent.affectsConfiguration(pConfig.key))) {
            sendConfigToWebview();
          }
        }
      );
      //Setup message comms with webview
      webview.webview.onDidReceiveMessage(
        (pMessage) => {
          console.log(`## Message Received: `, pMessage);
          if(pMessage.command === 'load') {
            webview.webview.postMessage({
              type: 'flow-data', 
              flow: flowData,
              initialConfig: generateWebviewConfigurationObject()
            });
          }
        }
      );
      //Set webview HTML
      const scriptPath = vscode.Uri.joinPath(context.extensionUri, 'out', 'ui', 'index.js'); //Preact UI
      const cssPath = vscode.Uri.joinPath(context.extensionUri, 'out', 'ui', 'styles', 'global.css'); //Tailwind CSS
      const scriptUri = webview.webview.asWebviewUri(scriptPath);
      const cssUri = webview.webview.asWebviewUri(cssPath);
      webview.webview.html = `
        <html lang="en" style="height: 100%">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="Content-Security-Policy" content="default-src 'none' 'self'; style-src 'self' 'unsafe-inline' vscode-resource:; script-src 'unsafe-eval' 'unsafe-inline' vscode-resource:;img-src 'self' data:; object-src 'self';">
            <link rel="stylesheet" href="${cssUri}">
            <title>Salesforce Flow Visualiser</title>
          </head>
          <body id="app" style="padding: 0 !important">
            <script type="module" src="${scriptUri}"></script>
          </body>
        </html>
      `;
    } catch(ex: any) {
      console.error(ex);
      vscode.window.showErrorMessage('Unable to visualise flow: ' + (ex.message || JSON.stringify(ex)));
    }

	}));
}