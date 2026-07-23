// import tailwindcss from '@tailwindcss/vite';
// import react from '@vitejs/plugin-react';
// import svgr from 'vite-plugin-svgr';
// import { defineConfig } from 'vite';
// import { resolve } from 'path';
// import dts from 'vite-plugin-dts'; // optional, for TypeScript declarations


// export default defineConfig({
//   define: {
//     __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
//   },
//   envDir: './env',
//   resolve: {
//     // One React instance across lazy chunks + MUI (avoids "dispatcher is null" in SvgIcon/useDefaultProps).
//     dedupe: ['react', 'react-dom', '@emotion/react', '@emotion/styled'],
//     alias: {
//       '@': resolve(__dirname, './src'),
//     },
//   },
//   build: {
//     lib: {
//       entry: resolve(__dirname, 'src/index.ts'), // your entry point
//       name: 'haiku-ui', // global var name for UMD/IIFE builds
//       fileName: (format) => `haiku-ui.${format}.js`,
//       formats: ['es', 'cjs'] // or add 'umd', 'iife' if needed
//     },
//     rollupOptions: {
//       // externalize deps that shouldn't be bundled
//       external: ['react', 'react-dom'], // example peer deps
//       output: {
//         globals: {
//           react: 'React',
//           'react-dom': 'ReactDOM'
//         }
//       }
//     }
//   },
//   plugins: [
//     dts(),
//     react(),
//     tailwindcss(),
//     svgr({ include: '**/*.svg' }),
//   ],
// });



import { defineConfig } from 'vite';
import { resolve } from 'path';
// import { transformWithOxc } from 'vite';

export default defineConfig({
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
  },
  build: {
    sourcemap: true,
    emptyOutDir: true,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'haiku-ui',

      formats: ['umd'],

      fileName: (format) => `index.${format}.js`,
    },

    rollupOptions: {
      // If building a MUI theme library, you usually want to externalize peer dependencies
      // like React and @mui/material so they aren't bundled inside your library:
      external: ['react', 'react-dom', '@mui/material', '@emotion/react', '@emotion/styled', 'tailwindcss'],
      output: {
        // Global variables to use in the UMD build for externalized deps
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          '@mui/material': 'MaterialUI',
          'tailwindcss': 'TailwindCSS',
        },
      },
    },
  },
});
