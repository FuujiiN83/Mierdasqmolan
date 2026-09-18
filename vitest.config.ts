import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    // Los alias deben coincidir con los `paths` de tsconfig.json. Antes solo
    // estaba `@` -> src, así que `@/data/blog.json` (que Next sí resuelve)
    // fallaba al cargarse desde un test. Va como array para que `@/data/` se
    // evalúe ANTES que `@`, que si no se lo come.
    alias: [
      {
        find: /^@\/data\//,
        replacement: fileURLToPath(new URL('./data/', import.meta.url)),
      },
      {
        find: /^@\//,
        replacement: fileURLToPath(new URL('./src/', import.meta.url)),
      },
    ],
  },
  test: {
    include: ['src/**/*.test.ts'],
    environment: 'node',
  },
});
