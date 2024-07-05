// vite-plugin-generate-cname.js
import { writeFileSync } from 'fs';
 
export default function generateCNAMEPlugin(options) {
  return {
    name: 'vite-plugin-generate-cname',
    closeBundle() {
      writeFileSync('dist/CNAME', options.content || '');
    },
  };
}