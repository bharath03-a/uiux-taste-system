import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Plugin } from 'vite';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '../..');
const tasteJsonPath = path.join(repoRoot, 'taste', 'taste.json');
const tasteMdPath = path.join(repoRoot, 'taste', 'TASTE.md');

function tastePersistencePlugin(): Plugin {
  return {
    name: 'taste-lab-persistence',
    configureServer(server) {
      server.middlewares.use('/api/taste', async (req, res, next) => {
        if (req.method === 'GET') {
          try {
            const raw = await fs.readFile(tasteJsonPath, 'utf-8');
            res.setHeader('Content-Type', 'application/json');
            res.end(raw);
          } catch {
            res.statusCode = 404;
            res.end(JSON.stringify({ error: 'taste.json not found' }));
          }
          return;
        }

        if (req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', async () => {
            try {
              const parsed = JSON.parse(body);
              await fs.mkdir(path.dirname(tasteJsonPath), { recursive: true });
              await fs.writeFile(
                tasteJsonPath,
                JSON.stringify(parsed, null, 2) + '\n',
                'utf-8'
              );
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ ok: true, path: tasteJsonPath }));
            } catch (err) {
              res.statusCode = 400;
              res.end(
                JSON.stringify({
                  error: err instanceof Error ? err.message : 'Invalid payload',
                })
              );
            }
          });
          return;
        }

        next();
      });

      server.middlewares.use('/api/compile-md', async (req, res, next) => {
        if (req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', async () => {
            try {
              const { markdown } = JSON.parse(body) as { markdown: string };
              await fs.mkdir(path.dirname(tasteMdPath), { recursive: true });
              await fs.writeFile(tasteMdPath, markdown, 'utf-8');
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ ok: true, path: tasteMdPath }));
            } catch (err) {
              res.statusCode = 400;
              res.end(
                JSON.stringify({
                  error: err instanceof Error ? err.message : 'Failed to write TASTE.md',
                })
              );
            }
          });
          return;
        }
        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), tastePersistencePlugin()],
  server: {
    port: 4173,
    strictPort: false,
  },
});
