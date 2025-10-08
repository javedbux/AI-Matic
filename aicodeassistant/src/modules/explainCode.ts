
import * as vscode from 'vscode';
import {getWebviewContent  } from './webviewContent'
import { getResultFromOpenAI } from '../openAiClient/callOpenAIAPI';

import { UserName } from './osUserName';
//import callOpenAIAPI from '../openAiClient/callOpenAIAPI';


function ExplainCodeProvider() {
    
    vscode.commands.registerCommand('aicodeassistant.codeExplain', async () =>{
        console.log('Explain! -----------');
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
            const reDocument = await getResultFromOpenAI(selectedText,"Model:", "Phi3");
            
            const panel = vscode.window.createWebviewPanel(
                'explainCode', 
                'Explain Code', 
                vscode.ViewColumn.Two,
                {}
            );    
                       

            panel.webview.html = getWebviewContent("Explain the following code :- "+reDocument as string, UserName());
            
        }


    })

}


// async function getResultFromOpenAI(selectedText: string): Promise<string> {
    
//     const url: string = 'http://localhost:11434/api/generate';
//     //const model: string = 'phi3';
//     //const prompt: string = `Explain the following code in detail:\n\n${selectedText}`;

//     const requestBody = {
//         //model: 'phi3', // or 'mistral', 'gemma', etc.
//         model: 'llama3.1', // or 'mistral', 'gemma', etc.
//         prompt: `Explain the following code in 10 sentence only. Split result in line by line with number :\n\n${selectedText}`,
//         stream: false // set to true if you want streaming responses
//     };

//     try {
//         const response = await fetch(url, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(requestBody)
//         });
//         const data = await response.json() as { response?: string; message?: string };
//         console.log('Response:', data.response);
//         return data.response || data.message || JSON.stringify(data);
//     } catch (error) {
//         console.error('Error:', error);
//         return 'Error fetching explanation.';
//     }
// }



export {
    ExplainCodeProvider
};

