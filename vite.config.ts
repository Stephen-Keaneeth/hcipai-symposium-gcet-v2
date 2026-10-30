import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig, Plugin} from 'vite';

function syncDataFilesPlugin(): Plugin {
  const sync = () => {
    try {
      const srcDir = path.resolve(import.meta.dirname, 'src/data');
      const publicDir = path.resolve(import.meta.dirname, 'public/data');
      const rootDataDir = path.resolve(import.meta.dirname, 'data');
      if (fs.existsSync(srcDir)) {
        if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
        if (!fs.existsSync(rootDataDir)) fs.mkdirSync(rootDataDir, { recursive: true });
        const files = fs.readdirSync(srcDir);
        for (const file of files) {
          if (file.endsWith('.json')) {
            fs.copyFileSync(path.join(srcDir, file), path.join(publicDir, file));
            fs.copyFileSync(path.join(srcDir, file), path.join(rootDataDir, file));
          }
        }
      }
    } catch (err) {
      console.warn('Auto-sync data failed:', err);
    }
  };

  return {
    name: 'sync-data-files',
    buildStart() {
      sync();
    },
    handleHotUpdate({ file }) {
      if (file.includes('data') && file.endsWith('.json')) {
        sync();
      }
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), syncDataFilesPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
