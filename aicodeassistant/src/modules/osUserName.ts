
import * as vscode from 'vscode';
import * as os from 'os';

function UserName(): string {
    return os.userInfo().username;
}

function AppTitle(): string {
    return `Code-X  - ${UserName()}`;
}

export { UserName, AppTitle };
