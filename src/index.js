// The Publications site's own pages: legacy books.museumwnf.org (book-client,
// inventory-app#2515, #2542). They moved here from viewer-layout's
// ./publications entry, on Explore's model: the product lives in its own
// repository and reads only @museumwnf/viewer-core and viewer-layout's shared
// parts. dataset.config.js builds the site with `publicationsConfig()`; the
// tests read the rest from here.


export { default as PublicationsShell } from './SiteShell.vue'
export { default as PublicationsHome } from './views/Home.vue'
export { default as PublicationsCategory } from './views/Category.vue'
export { default as PublicationsResults } from './views/Results.vue'
export { default as PublicationPage } from './views/Publication.vue'
export { default as PublicationTile } from './components/PublicationTile.vue'
export { default as PublicationsPagination } from './components/PublicationsPagination.vue'
export { categoriesOf, usePublications } from './composables/publications.js'
export { PUBLICATIONS_FOOTER } from './footer.js'
export { NAMED_TEXTS, useNamedText } from './composables/texts.js'
export { publicationsConfig, publicationsRoutes } from './routes.js'
export {
  availableLanguages, categoryBySlug, displayLanguage, documentsOf, editionsByYear, editionsOf, editionText, FORMATS, formatsOf, hasSearch, homeLimit,
  inCategory, limitLanguages, PAGE_SIZE, present, PUBLICATION_CATEGORIES, PUBLICATION_ENTITIES, SEARCH_KEYS,
  searchPublications, themeKey, truncate,
} from './rules.js'
