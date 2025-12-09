import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/mi-tienda/',  // ⬅ cambia esto por el nombre de tu repo
  plugins: [react()],
});
