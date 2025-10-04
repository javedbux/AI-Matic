import { spawn, ChildProcessWithoutNullStreams } from 'child_process';
import * as readline from 'readline';

export class McpClient {
  private server: ChildProcessWithoutNullStreams | null = null;
  private rl: readline.Interface | null = null;
  private pending = new Map<string, (res: any) => void>();

  constructor(private exePath: string) {}

  start() {
    this.server = spawn(this.exePath, [], { stdio: ['pipe', 'pipe', 'pipe'] });
    this.rl = readline.createInterface({ input: this.server.stdout });

    this.rl.on('line', (line) => {
      try {
        const msg = JSON.parse(line);
        if (msg.id && this.pending.has(msg.id)) {
          this.pending.get(msg.id)!(msg.result || msg.error);
          this.pending.delete(msg.id);
        }
      } catch (err) {
        console.error('[MCP Parse Error]', err, line);
      }
    });

    this.server.stderr.on('data', (d) => console.error('[MCP Error]', d.toString()));
    this.server.on('close', (c) => console.log('[MCP Closed]', c));
  }

  call(method: string, params?: any): Promise<any> {
    if (!this.server) throw new Error('MCP not started');
    const id = Date.now().toString();
    const req = { jsonrpc: '2.0', id, method, params };
    return new Promise((resolve) => {
      this.pending.set(id, resolve);
      this.server!.stdin.write(JSON.stringify(req) + '\n');
    });
  }

  stop() {
    this.server?.kill();
    this.rl?.close();
  }
}

let client: McpClient;

export function mcpClientProvider() {
  if (!client) {
    client = new McpClient('D:\\MobileApp\\MCP-App\\FirstMcp\\FirstMcp\\bin\\Debug\\net8.0\\FirstMcp.exe');
    client.start();
  }
  return client;
}
