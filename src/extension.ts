import * as vscode from 'vscode';

async function parseJavaClass(javaCode: string) {
	const { parse } = await import("java-parser");
	const parsed = parse(javaCode);
	const json = generateExampleJson(parsed);
	return json;
}

function generateExampleJson(parsedData: any): any {
	const exampleJson: { [key: string]: any } = {};

	parsedData.body.declarations.forEach((field: any) => {
		const fieldName = field.name;
		const fieldType = field.type;

		// Basic type-based example data
		if (fieldType === 'int' || fieldType === 'Integer') {
			exampleJson[fieldName] = 123;
		} else if (fieldType === 'String') {
			exampleJson[fieldName] = 'sampleText';
		} else if (fieldType === 'boolean') {
			exampleJson[fieldName] = true;
		} else {
			exampleJson[fieldName] = {};  // Nested objects can be handled here
		}
	});

	return exampleJson;
}
export function activate(context: vscode.ExtensionContext) {

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
			} catch (error) {
				vscode.window.showErrorMessage("Failed to generate JSON: ");
			}
		}
	});

	const disposable2 = vscode.commands.registerCommand('java-object-to-json.Mukesh', async () => {
		const name = await vscode.window.showInputBox({prompt: 'Enter your name'});

		if(name) {
			vscode.window.showInformationMessage(`Hello ${name}`);
		}else {
			vscode.window.showErrorMessage('Please enter a name');
		}

		vscode.window.showErrorMessage('sachavu poo');
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
