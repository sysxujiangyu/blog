// vite-plugin-generate-cname.js
import { writeFileSync } from 'fs';
 


export function generateNginxPlugin(options) {
  return {
    name: 'vite-plugin-generate-nginx.htaccess',
    closeBundle() {
      writeFileSync('dist/nginx.htaccess', `
          location ~* (runtime|application)/{
            return 403;
          }
          location / {
            if (!-e $request_filename){
              rewrite  ^(.*)$  /index.php?s=$1  last;   break;
            }
          }
        `);
    },
  };
}
export function generateCNAMEPlugin(options) {
  return {
    name: 'vite-plugin-generate-cname',
    closeBundle() {
      writeFileSync('dist/CNAME', options.content || '');
    },
  };
}