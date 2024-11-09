import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vite.dev/config/
export default defineConfig({
  envPrefix:"REACT_APP_",
  plugins: [
    react()
  ],
})


