import * as vscode from 'vscode';
import { AppTitle } from './osUserName';

function getWebviewContent(explanation: string, userName: string): string {

    
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${AppTitle()} </title>
        <style>
            html, body {
                height: 100%;
                margin: 0;
                font-family: Arial, sans-serif;
            }
            body { display: flex; flex-direction: column; }
            h1 { margin: 10px; }
            #chatContainer {
                flex: 1;
                overflow-y: scroll;
                border: 1px solid #ccc;
                padding: 10px;
                margin-bottom: 10px;
                background-color: #000;
            }
            #inputContainer {
                display: flex;
                padding: 10px;
                border-top: 1px solid #ccc;
                background-color: #fff;
            }
            #input { flex: 1; padding: 10px; }
            #sendButton { padding: 10px; }
        </style>
    </head>
    <body>
        <h1>${AppTitle()} </h1>
        <div id="chatContainer">
            <div>Code Assistant: <pre>${explanation}</pre></div>
        </div>
        <div id="inputContainer">
            <input type="text" id="input" placeholder="Ask your question ..." />
            <button id="sendButton">Send</button>
        </div>
        <script>
            const vscode = acquireVsCodeApi();
            const chatContainer = document.getElementById('chatContainer');
            document.getElementById('sendButton').addEventListener('click', () => {
                const input = document.getElementById('input');
                const message = input.value;
                chatContainer.innerHTML += '<div>${userName} : <br>' + message + '</div><br>';
                input.value = '';
                vscode.postMessage({
                    command: 'askQuestion',
                    text: message
                });
            });
            window.addEventListener('message', event => {
                const message = event.data;
                if (message.command === 'reply') {
                    chatContainer.innerHTML += '<div>Dell Assistant:</div>';
                    chatContainer.innerHTML += '<div><pre>' + message.text + '</pre></div>';
                    chatContainer.scrollTop = chatContainer.scrollHeight;
                }
            });
        </script>
    </body>
    </html>`;
}


function getCommonChatWebview(
    webview: vscode.Webview,
    context: vscode.ExtensionContext,
    explanation: string,
    userName: string
): string {

    console.log("Script URI:");
   
   

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <style>
    #input {
      flex: 1;
      padding: 10px;
    }

    #sendButton, #micButton {
      padding: 10px;
      margin-left: 5px;
    }
  </style>
</head>
<body>
  <h1>${AppTitle()}</h1>
  <div id="chatContainer"></div>
  <div id="inputContainer">
    <input type="text" id="input" placeholder="Ask your question ..." />
    <button id="sendButton">Send</button>
    <button id="micButton">🎤</button> <!-- Mic Button -->
  </div>

  <script>
    const vscode = acquireVsCodeApi();
    const chatContainer = document.getElementById('chatContainer');

    // Handle send button click
    document.getElementById('sendButton').addEventListener('click', () => {
      const question = document.getElementById('input').value;

      chatContainer.innerHTML += '<div>${userName}: <br> ' + question + ' </div>';
      document.getElementById('input').value = '';

      vscode.postMessage({
        command: 'askQuestion',
        text: question
      });
    });

    // Add event listener for mic button
    document.getElementById('micButton').addEventListener('click', () => {
      startSpeechRecognition();
    });

    // Set up Speech Recognition API
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    function startSpeechRecognition() {
      recognition.start();
    }

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      document.getElementById('input').value = transcript; // Fill input with voice text
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
    };

    // Listen for messages from extension
    window.addEventListener('message', event => {
      const message = event.data;
      if (message.command === 'reply') {
        chatContainer.innerHTML += '<div>Code Assistant:</div>';
        chatContainer.innerHTML += '<div><pre>' + message.text + '</pre></div>';
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    });
  </script>
</body>
</html>`;
}


export {
    getWebviewContent,
    getCommonChatWebview
};
