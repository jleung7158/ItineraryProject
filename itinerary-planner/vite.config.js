import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: 'itinerary-planner/public'
  // server: {
  //   port: 5173
  // }
})
