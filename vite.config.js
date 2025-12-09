import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/NOMBRE_DEL_REPOSITORIO/',  // ⬅ cambia esto por el nombre de tu repo
  plugins: [react()],
});
