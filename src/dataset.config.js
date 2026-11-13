import { publicationsConfig } from '@museumwnf/viewer-layout/publications'

// The whole declaration of this website: legacy books.museumwnf.org, whose
// pages, shell, category menu, search and footer are viewer-layout's
// (`publicationsConfig`, @museumwnf/viewer-layout/publications). What is
// this website's own is below: its data package, its address and its chrome
// files.

// The site's chrome files under theme/assets/: legacy's two logos
// (`legacy/logo-blue.png` in the header, `legacy/logo-white.png` in the
// footer), taken from legacy book-client.
const chrome = import.meta.glob('../theme/assets/**/*.{jpg,jpeg,png,gif,svg}', {
  eager: true, query: '?url', import: 'default',
})

export default publicationsConfig({
  // The dataset package this website renders. Must match the alias in
  // vite.config.js and the dependency in package.json.
  datasetPackage: '@museumwnf/publications-data',

  // The address this build is deployed at, base path included: the GitHub
  // Pages address, the same repository segment vite.config.js's `base` puts
  // in the build's base path, so the two change together, and with the domain.
  origin: 'https://museumwithnofrontiers.github.io/publications',

  // The name for a package that predates `manifest.site`.
  siteName: 'MWNF Books',

  chrome,
})
