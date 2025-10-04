process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

import * as vscode from 'vscode';
import { ExplainCodeProvider } from './modules/explainCode';
import { FixCodeProvider } from './modules/fixCode';
import { ChatBoxProvider } from './modules/chatBox';



export async function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "codeninja" is now active!');

	const explainCode = ExplainCodeProvider();
	const fixCode = FixCodeProvider();
	const chatBox = ChatBoxProvider(context);

	

	const disposable = vscode.commands.registerCommand('codeninja.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from CodeNinja!');
	});

	context.subscriptions.push(disposable);
	context.subscriptions.push({ dispose: () => explainCode });
	context.subscriptions.push({ dispose: () => fixCode });
	context.subscriptions.push({ dispose: () => chatBox });
	// If MCP client needs cleanup, add it here. Otherwise, remove this line.
	// context.subscriptions.push({ dispose: () => mcpClient.stop() });
}

export function deactivate() {}



// // The module 'vscode' contains the VS Code extensibility API
// // Import the module and reference it with the alias vscode in your code below
// import * as vscode from 'vscode';

// // This method is called when your extension is activated
// // Your extension is activated the very first time the command is executed
// export function activate(context: vscode.ExtensionContext) {

// 	// Use the console to output diagnostic information (console.log) and errors (console.error)
// 	// This line of code will only be executed once when your extension is activated
// 	console.log('Congratulations, your extension "aicodeassistant" is now active!');

// 	// The command has been defined in the package.json file
// 	// Now provide the implementation of the command with registerCommand
// 	// The commandId parameter must match the command field in package.json
// 	const disposable = vscode.commands.registerCommand('aicodeassistant.helloWorld', () => {
// 		// The code you place here will be executed every time your command is executed
// 		// Display a message box to the user
// 		vscode.window.showInformationMessage('Hello World from AICodeAssistant!');
// 	});

// 	context.subscriptions.push(disposable);
// }

// // This method is called when your extension is deactivated
// export function deactivate() {}
