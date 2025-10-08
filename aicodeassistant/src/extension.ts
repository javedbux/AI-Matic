process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

import * as vscode from 'vscode';
import { ExplainCodeProvider } from './modules/explainCode';
import { FixCodeProvider } from './modules/fixCode';
import { ChatBoxProvider } from './modules/chatBox';



export async function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "AI Code Assistant" is now active!');

	const explainCode = ExplainCodeProvider();
	const fixCode = FixCodeProvider();
	const chatBox = ChatBoxProvider(context);

	

	const disposable = vscode.commands.registerCommand('aicodeassistant.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from AI Code Assistant!');
	});

	context.subscriptions.push(disposable);

	context.subscriptions.push({ dispose: () => explainCode });
	context.subscriptions.push({ dispose: () => fixCode });
	context.subscriptions.push({ dispose: () => chatBox });
	// If MCP client needs cleanup, add it here. Otherwise, remove this line.
	// context.subscriptions.push({ dispose: () => mcpClient.stop() });
}

export function deactivate() {}

