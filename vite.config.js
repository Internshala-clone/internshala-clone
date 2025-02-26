import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    "import.meta.env.VITE_USE_BACKEND": JSON.stringify(
      process.env.VITE_USE_BACKEND || "false"
    ),
  },
});
