import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      consts: path.resolve(__dirname, 'src/consts'),
      components: path.resolve(__dirname, 'src/components'),
      context: path.resolve(__dirname, 'src/context'),
      helpers: path.resolve(__dirname, 'src/helpers'),
      hooks: path.resolve(__dirname, 'src/hooks'),
      contracts: path.resolve(__dirname, 'src/contracts'),
      uikit: path.resolve(__dirname, 'src/uikit'),
      pages: path.resolve(__dirname, 'src/pages'),
    },
  },
})
