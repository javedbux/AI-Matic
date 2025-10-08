
import * as vscode from 'vscode';
import {getWebviewContent  } from './webviewContent'
import { getResultFromOpenAI } from '../openAiClient/callOpenAIAPI';

import { UserName } from './osUserName';
//import callOpenAIAPI from '../openAiClient/callOpenAIAPI';


function FixCodeProvider() {

    vscode.commands.registerCommand('aicodeassistant.fixCode', async () =>{

        console.log('Fix!');
        const editor = vscode.window.activeTextEditor;
        if(!editor){
            vscode.window.showInformationMessage('No editor is active.');
            
            return;
        }else
        {
            const selection = editor.selection;
            const selectedText = editor.document.getText(selection);
            if (!selectedText) {
                vscode.window.showInformationMessage('No text selected. Please select code to explain.');
                return;
            }
            const reDocument = await getResultFromOpenAI(selectedText,"Model:", "");
            
            const panel = vscode.window.createWebviewPanel(
                'fixCode', 
                'Fix Code', 
                vscode.ViewColumn.Two,
                {}
            );    
                       

            panel.webview.html = getWebviewContent("Fix the following code :- "+reDocument as string, UserName());
            
        }


    })

}




export {
    FixCodeProvider
};

