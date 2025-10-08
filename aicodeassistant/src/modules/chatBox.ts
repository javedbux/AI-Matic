import * as vscode from "vscode";
import { getCommonChatWebview } from "./webviewContent";
import { getResultFromOpenAI } from "../openAiClient/callOpenAIAPI";
import { UserName } from "./osUserName";
import { mcpClientProvider } from "../modules/mcpClient";

function ChatBoxProvider(context: vscode.ExtensionContext) {
    vscode.commands.registerCommand("aicodeassistant.chatBox", async () => {
        const panel = vscode.window.createWebviewPanel(
            "chatBox",
            "CodeNinja Chat",
            vscode.ViewColumn.Two,
            {
                enableScripts: true,
                localResourceRoots: [vscode.Uri.joinPath(context.extensionUri, "media")]
            }
        );

        panel.webview.html = getCommonChatWebview(
            panel.webview,
            context,
            "Ask me anything about your code!",
            UserName()
        );

        const mcp = mcpClientProvider();

        panel.webview.onDidReceiveMessage(async (message) => {
            if (message.command === "askQuestion") {
                const question = message.text.toLowerCase();
                let reply = "";

                if (question.includes("weather")) {
                    // extract state or city from the question — quick example
                    let state = "CA"; // default to California
                    if (question.includes("Sacramento")) state = "CA";

                    reply = await mcp.call("GetAlerts", { state });
                } else {
                    reply = await getResultFromOpenAI(message.text, message.model);
                }

                // panel.webview.postMessage({
                //     command: "reply",
                //     text: reply
                // });
                panel.webview.postMessage({
                    command: "reply",
                    text: typeof reply === "string" ? reply : JSON.stringify(reply, null, 2)
                });
            }
        });
    });
}

export { ChatBoxProvider };
