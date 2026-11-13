# Publications (MWNF Books)

Museum With No Frontiers' books: the virtual museum, travel, educational and
other books, each with its versions and editions. It replaces legacy
<https://books.museumwnf.org> (book-client), page for page.

The pages are `@museumwnf/viewer-layout/publications` (`publicationsConfig`
in `src/dataset.config.js`), on the data package `@museumwnf/publications-data`
(inventory-app `scripts/exporters/docs/publications-data-package.md`), with
the shared texts of viewer-i18n's `publications` bundle. What is this
website's own: its address, legacy's two logos (`theme/assets/legacy/`) and
legacy's fonts (Muli, Roboto) in `index.html`.

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
