import * as vscode from 'vscode';


export async function callOllamaPhi3API(url: string, prompt: string) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'phi3',
            prompt: prompt
        })
    });

    if (!response.ok) {
        throw new Error(`Ollama API request failed with status ${response.status}`);
    }

    const data = await response.json() as { response?: string; message?: string; [key: string]: any };
    // Ollama's response format may vary; adjust as needed
    return data.response || data.message || data;
}

// export async function getResultFromOpenAI(selectedText: string): Promise<string> {
//     const config = vscode.workspace.getConfiguration('aiAssistant');

//     // Get values from settings (with fallback defaults)
//     const url: string = config.get<string>('apiUrl', 'http://localhost:11434/api/generate');
//     const model: string = config.get<string>('model', 'llama3.1');

//     const requestBody = {
//         model: model,
//         prompt: `Split result in line by line with number :\n\n${selectedText}`,
//         stream: false
//     };
//     console.log('URL!' + url);
//     console.log('Model!' + model);
//     try {
//         const response = await fetch(url, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(requestBody)
//         });

//         const data = await response.json() as { response?: string; message?: string };
//         //console.log('Response:', data.response);
//         return data.response || data.message || JSON.stringify(data);
//     } catch (error) {
//         console.error('Error:', error);
//         return 'Error fetching explanation.';
//     }
// }



export async function getResultFromOpenAI(prompt: string, model?: string, p0?: string): Promise<string> {

    const config = vscode.workspace.getConfiguration('aiAssistant');
    const url: string = config.get("apiUrl") || "http://localhost:11434/api/generate";
    const selectedModel: string = config.get("model") || 'llama3.1';
    //const selectedModel: string = config.get<string>('model', 'llama3.1');

    const requestBody = {
        model: selectedModel,
        prompt: prompt,
        stream: false
    };
    console.log('URL!' + url);
    console.log('Model! nna ' + selectedModel);
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody)
        });
        const data = (await response.json()) as { response?: string; message?: string };
        console.log('Response:', data.response);
        return data.response || data.message || JSON.stringify(data);
    } catch (error) {
        console.error("Error:", error);
        return "Error fetching response.";
    }
}

