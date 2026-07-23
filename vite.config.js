import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import emailHandler from './api/sendEmail.js'
import fs from 'fs'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'local-api-server',
      configureServer(server) {
        // Serve n8n_workflows_data.json directly
        server.middlewares.use('/n8n_workflows_data.json', (req, res, next) => {
          try {
            const filePath = path.join(process.cwd(), 'public', 'n8n_workflows_data.json');
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            res.setHeader('Content-Type', 'application/json');
            res.end(fileContent);
          } catch (e) {
            console.error('Error serving workflows JSON:', e.message);
            res.statusCode = 404;
            res.end('Not found');
          }
        });

        // Email API endpoint
        server.middlewares.use('/api/sendEmail', async (req, res, next) => {
          if (req.method !== 'POST') return next();
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', async () => {
            try {
              req.body = JSON.parse(body || '{}');
            } catch (e) {
              req.body = {};
            }
            res.status = (code) => { res.statusCode = code; return res; };
            res.json = (data) => {
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(data));
              return res;
            };
            await emailHandler(req, res);
          });
        });
      }
    }
  ],
  optimizeDeps: {
    include: ['ogl']
  },
  ssr: {
    noExternal: ['ogl']
  }
})
