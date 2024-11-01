"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
async function parseJavaClass(javaCode) {
    const { parse } = await import("java-parser");
    const parsed = parse(javaCode);
    const json = generateExampleJson(parsed);
    return json;
}
function generateExampleJson(parsedData) {
    const exampleJson = {};
    parsedData.body.declarations.forEach((field) => {
        const fieldName = field.name;
        const fieldType = field.type;
        // Basic type-based example data
        if (fieldType === 'int' || fieldType === 'Integer') {
            exampleJson[fieldName] = 123;
        }
        else if (fieldType === 'String') {
            exampleJson[fieldName] = 'sampleText';
        }
        else if (fieldType === 'boolean') {
            exampleJson[fieldName] = true;
        }
        else {
            exampleJson[fieldName] = {}; // Nested objects can be handled here
        }
    });
    return exampleJson;
}
function activate(context) {
    console.log('Congratulations, your extension "java-object-to-json" is now active!');
    const disposable = vscode.commands.registerCommand('java-object-to-json.generateJSON', async () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const document = editor.document;
            const javaCode = document.getText();
            try {
                // Parse and generate JSON
                const exampleJson = parseJavaClass(javaCode);
                const jsonOutput = JSON.stringify(exampleJson, null, 2);
                // Display JSON in a new editor tab
                const newDocument = await vscode.workspace.openTextDocument({ content: jsonOutput, language: 'json' });
                await vscode.window.showTextDocument(newDocument, vscode.ViewColumn.Beside);
            }
            catch (error) {
                vscode.window.showErrorMessage("Failed to generate JSON: ");
            }
        }
    });
    const disposable2 = vscode.commands.registerCommand('java-object-to-json.Mukesh', async () => {
        const name = await vscode.window.showInputBox({ prompt: 'Enter your name' });
        if (name) {
            vscode.window.showInformationMessage(`Hello ${name}`);
        }
        else {
            vscode.window.showErrorMessage('Please enter a name');
        }
        vscode.window.showErrorMessage('sachavu poo');
    });
    context.subscriptions.push(disposable);
}
function deactivate() { }
//# sourceMappingURL=extension.js.map