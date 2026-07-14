import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import emailHandler from './api/sendEmail.js'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'local-api-server',
      configureServer(server) {
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
