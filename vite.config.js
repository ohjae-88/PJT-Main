<<<<<<< HEAD

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173
=======
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build', // 빌드된 파일이 이 폴더에 저장됩니다.
>>>>>>> df15f370754e23e4270f9f601ff5b7e86d6cdd69
  }
});
