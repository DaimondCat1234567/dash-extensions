import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// Plugin: treat relative .css imports as CSS modules by appending ?module
function cssAsModulesPlugin() {
  return {
    name: 'css-as-modules',
    transform(code, id) {
      // only transform JS/TS files in the project (skip node_modules)
      if (id.includes('node_modules')) return null;
      if (!/\.(?:js|ts|jsx|tsx)$/.test(id)) return null;

      // Handle default CSS imports like: import styles from './x.css'
      // Convert them to namespace imports and add ?module: import * as styles from './x.css?module'
      let replaced = code.replace(/import\s+([A-Za-z_$][\w$]*)\s+from\s+(['"])(\.\.?\/[^'"\n]+?\.css)(['"])/g, (m, ident, q1, p2, q2) => {
        if (p2.includes('?')) return m;
        return `import * as ${ident} from ${q1}${p2}?module${q2}`;
      });

      // Replace `from './file.css'` (named import forms) by appending ?module
      replaced = replaced.replace(/(from\s+['"])(\.\.?\/[^'"\n]+?\.css)(['"])/g, (m, p1, p2, p3) => {
        if (p2.includes('?')) return m;
        return `${p1}${p2}?module${p3}`;
      });

      // Replace bare import './file.css' by appending ?module
      replaced = replaced.replace(/(import\s+['"])(\.\.?\/[^'"\n]+?\.css)(['"])/g, (m, p1, p2, p3) => {
        if (p2.includes('?')) return m;
        return `${p1}${p2}?module${p3}`;
      });

      if (replaced === code) return null;
      return {
        code: replaced,
        map: null
      };
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [cssAsModulesPlugin(), react()],
})
