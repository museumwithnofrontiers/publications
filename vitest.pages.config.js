import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import { configDefaults } from 'vitest/config'
import base from './vite.config.js'

// The page tests (tests/pages/): the site's own pages mounted against a small
// fixture package, whose records each test names, instead of the site's
// published package, which tests/smoke.test.js renders.
export default defineConfig({
  ...base,
  resolve: {
    ...base.resolve,
    alias: {
      ...base.resolve.alias,
      '@inventory-data': fileURLToPath(new URL('./tests/fixtures/data-package', import.meta.url)),
    },
  },
  test: {
    ...base.test,
    include: ['tests/pages/**/*.test.js'],
    exclude: configDefaults.exclude,
  },
})
