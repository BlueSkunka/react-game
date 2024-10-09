import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@atom": "/src/components/atom",
      "@errors": "/src/components/errors",
      "@icons": "/src/components/icons",
      "@layouts": "/src/components/layouts",
      "@molecule": "/src/components/molecule",
      "@organism": "/src/components/organism",
      "@asset": "/src/components/asset",
      "@services": "/src/services",
      "@repositories": "/src/repositories",
      "@interfaces": "/src/interfaces",
      "@contexts": "/src/contexts"
    }
  }
})
