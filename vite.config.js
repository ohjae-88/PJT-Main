import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173 // 서버 포트 설정
  },
  build: {
    outDir: 'build', // 빌드된 파일이 이 폴더에 저장됩니다.
  }
});
