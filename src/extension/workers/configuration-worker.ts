import * as vscode from 'vscode'
import { WEBVIEW_CONFIGS } from '../constants/configurations'

export function generateWebviewConfigurationObject() {
  return WEBVIEW_CONFIGS.reduce(
    (pObj: Record<string, any>, pItem) => {
      pObj[pItem.propertyName] = vscode.workspace.getConfiguration().get(pItem.key);
      return pObj;
    },
    {}
  );
}