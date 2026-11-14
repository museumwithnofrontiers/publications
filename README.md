# Publications (MWNF Books)

Museum With No Frontiers' books: the virtual museum, travel, educational and
other books, each with its versions and editions. It replaces legacy
<https://books.museumwnf.org> (book-client), page for page.

The site is its own product, on Explore's model: its pages, shell, menu,
search and footer are this repository's, on the data package
`@museumwnf/publications-data` (inventory-app
`scripts/exporters/docs/publications-data-package.md`), with the shared texts
of viewer-i18n's `publications` bundle. It reads viewer-core and
viewer-layout's shared stylesheet, and nothing else of the platform.

| Where | What |
| --- | --- |
| `src/dataset.config.js` | the site's address, name and chrome files |
| `src/routes.js` | its routes and whole declaration (`publicationsConfig`) |
| `src/SiteShell.vue` | legacy's header, category menu, search and footer |
| `src/views/` | the pages: home, category, search results, a publication |
| `src/components/` | a book's tile and the pager |
| `src/composables/` | the records the pages read, and the texts named in data |
| `src/rules.js`, `src/footer.js` | legacy's rules (categories, editions, search) and footer links |
| `src/styles/publications.css` | the pages' styles; `theme/` holds the site's colours and assets |
| `tests/smoke.test.js` | the site against its published package |
| `tests/pages/` | the pages against a small fixture package (`vitest.pages.config.js`) |

Legacy's two logos are in `theme/assets/legacy/`, legacy's fonts (Muli,
Roboto) in `index.html`.

Legacy's pages are English, whatever the book: the site offers English
alone, and its CI checks the texts for English only (`languages: en` in
`.github/workflows/ci.yml`).

Routes: `/`, `/category/<name>` (`?page=`), `/results` (the search in the
query), `/publication/<id>/<language>`.

## Development

Node tooling runs in Docker:

```
docker compose run --rm dev npm ci
docker compose run --rm dev npm test
docker compose up
```

Epic: museumwithnofrontiers/inventory-app#2515, story #2542.
