# AI Code Assistant 

A powerful VS Code Extension that brings AI coding assistance — like GitHub Copilot — directly into your editor using Ollama for offline OpenAI model support.

## Features

💬 Inline Code Suggestions – Get smart autocomplete suggestions while typing.
📝 Explain Code – Select code, right-click → “CodeNinja: Explain Code” to get instant explanations.
🧰 Fix & Refactor – AI-powered code fixes and improvements.
🌐 Offline AI – Works with Ollama
 so you can run LLMs locally without an internet connection.

📂 Attach CSV / Data Files – Analyze CSV files and generate EF queries or charts through AI.
🌍 Multi-Language Support – Translate selected code between C#, Python, JavaScript, and more.
🧠 Prompt Commands – Use comment triggers like

## Requirements

Before using the extension, you need to:

1. Install Ollama on your machine
👉 https://ollama.com/download

2. Install a model locally (e.g. llama3 or mistral):

ollama pull llama3

or

ollama pull Phi3

3. Start the Ollama server (it usually runs automatically after installation):

ollama run llama3

## Extension Settings

This extension contributes the following settings:

| Setting                        | Description                                    |
| ------------------------------ | ---------------------------------------------- |
| `aicodeassistant.enable`       | Enable/disable the extension                   |
| `aicodeassistant.model`        | Choose the local Ollama model to use           |
| `aicodeassistant.apiUrl`       | Custom API URL if you're using a remote server |
| `aicodeassistant.showCodeLens` | Show/hide the grey action link above methods   |

## Known Issues

1. Ollama must be running for the extension to respond.
2. Large files may take longer to process on slower machines.
3. Response/result will slow for Ollama depend upon laptop.

## Release Notes

1.0.0

Initial release with Explain, Fix, and Test Case generation features.

1.1.0

Added Offline Ollama Support, CSV upload, and Code Translation.
Added grey action links above methods to quickly open CodeNinja Chat.

---

## Following extension guidelines

This project follows VS Code Extension Guidelines
 for best practices and performance.

## Working with Markdown

Use Ctrl+\ to split editor, and Shift+Ctrl+V to preview Markdown.
You can also use Ctrl+Space for Markdown snippets in VS Code.

## Resources

Ollama Documentation
VS Code API Reference
Markdown Syntax

⚠️ **Disclaimer**

This is a personal project and is not affiliated with any organization, company, or official GitHub fork.
It is developed purely for learning, experimentation, and extension development purposes.

You are free to use, modify, and extend this project in accordance with its license.
Any resemblance to other tools or extensions is coincidental, and all trademarks or references belong to their respective owners.

❤️ **Enjoy Coding Offline Like a Pro!**

AI Code Assistant gives you GitHub Copilot-like experience completely offline with local AI models, making it ideal for secure environments and enterprise use cases.
