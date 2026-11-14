import { nextTick } from 'vue'

// The page tests stand in for the application: the layout and core texts the
// pages read, as the shared bundle carries them.
export const layoutTexts = {  'layout.hyperlinks.label': 'Related links',
  'layout.language.label': 'Language',
  'layout.nav.label': 'Main navigation',
  'layout.nav.menu': 'Menu',
  'layout.nav.skipToContent': 'Skip to content',
  'layout.sponsors.label': 'Sponsors',
  // The entries the content components read, from viewer-i18n 1.7.0's
  // `core`, `catalogue` and `record` namespaces.
  'core.action.apply': 'Apply',
  'core.action.close': 'Close',
  'core.action.reset': 'Reset',
  'core.pagination.next': 'Next',
  'core.pagination.previous': 'Previous',
  'catalogue.pagination.first': 'First',
  'catalogue.pagination.go': 'Go',
  'catalogue.pagination.last': 'Last',
  'catalogue.pagination.page': 'Page',
  'record.action.hideShortDescription': 'Hide short description',
  'record.action.viewShortDescription': 'View short description',
  'record.citation.heading': 'Citation',
  // The source credit and the footer attribution (viewer-i18n 2.5.0's
  // `record.source` namespace, and `core.footer.legalNotice` — the address
  // `useSiteRights()`'s `termsUrl` falls back to without a rights block).
  'record.source.label': 'Source',
  'record.source.termsOfUse': 'Terms of use',
  'record.source.rightsHolder': 'Rights holder',
  'core.footer.legalNotice': 'Legal notice',
  'record.glossary.close': 'Close',
  'record.glossary.heading': 'Glossary',
  'record.glossary.tool': 'Glossary tool',
  'record.glossary.instructions': 'Enter the first letter(s) of the term you are looking for, then choose one of the options in the list.',
  'record.glossary.definition': 'Definition',
  'record.dynasty.heading': 'Dynasties',
  'record.media.photograph': 'Photograph',
  'record.sheet.credits': 'Credits',
  'record.sheet.languages': 'Languages',
  // viewer-i18n's `sheet` namespace, read by DynastyPopout.
  'sheet.field.alsoKnownAs': 'Also known as',
  'sheet.field.area': 'Area',
  'sheet.field.history': 'History',
  // PartnerMap entries (viewer-i18n 2.4.0+)
  'partner.map.map': 'Map',
  'partner.map.mapOf': 'Map of',
  'partner.info.about': 'About',
  'partner.info.contact': 'Contact',
  'partner.info.logo': 'Logo',
  'partner.info.addresses': 'Address(es)',
  'partner.info.phone': 'Phone',
  'partner.info.fax': 'Fax',
  'partner.nav.homepage': 'Go to the Partner’s homepage',
  'partner.item.objectsInSite': 'object(s) in this site',
  'partner.action.readMore': 'Read more',
  'partner.action.viewObjects': 'View objects',
  'partner.map.openInOpenStreetMap': 'Open in OpenStreetMap',
}

// Waits until `predicate` holds or `tries` ticks have passed.
export async function settle(predicate, tries = 40) {
  for (let i = 0; i < tries && !predicate(); i++) await new Promise((r) => globalThis.setTimeout(r, 5))
  await nextTick()
}