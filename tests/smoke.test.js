import { describe, expect, it, vi } from 'vitest'
import { loadEntities, mergeMessages } from '@museumwnf/viewer-core'
import {
  checkOfferedLanguages, checkRoutes, checkSectionMeta, checkTextsRendered, mountSite,
} from '@museumwnf/viewer-core/testing'
import { catalogues as sharedTexts } from '@museumwnf/viewer-i18n/publications'
import ownTexts from '../locales/en.json'
import config from '../src/dataset.config.js'

// The same two layers main.js assembles, in the same order: the shared bundle
// first, this website's own file last. Mounting without them would prove
// nothing about the chrome — every text would render as its own name.
const messages = mergeMessages(sharedTexts, { en: ownTexts })

// The pages are viewer-layout's (`publicationsConfig`), tested there against
// its fixture package; this test proves they render against this website's
// own package, each on an application mounted on that page's address — as a
// visitor arrives from a link.
describe('website smoke test', () => {
  it('mounts the home page in legacy’s shell, a band per category', async () => {
    const { app, host } = await mountSite(config, messages)
    expect(host.querySelector('.vc-home')).toBeNull()
    expect(host.querySelector('.mwnf-books-header__slogan')).not.toBeNull()
    expect(host.querySelectorAll('.mwnf-books-menu__item').length).toBeGreaterThan(0)
    // The chrome files: legacy's two logos, from theme/assets/legacy.
    expect(host.querySelector('.mwnf-books-header img')?.getAttribute('src')).toContain('logo-blue')
    expect(host.querySelector('.mwnf-books-footer img')?.getAttribute('src')).toContain('logo-white')
    await vi.waitFor(() => expect(host.querySelector('.mwnf-books-home__band .mwnf-books-tile')).not.toBeNull(), { timeout: 20000 })
    app.unmount()
  }, 60000)

  it('lists a category’s books', async () => {
    const { app, host } = await mountSite(config, messages, '#/category/travel-books')
    await vi.waitFor(() => expect(host.querySelector('.mwnf-books-list__tiles .mwnf-books-tile')).not.toBeNull(), { timeout: 20000 })
    expect(host.querySelector('.mwnf-books-list__title').textContent.trim()).not.toBe('')
    app.unmount()
  }, 60000)

  it('lists the results of a search', async () => {
    const { app, host } = await mountSite(config, messages, '#/results?language=en')
    await vi.waitFor(() => expect(host.querySelector('.mwnf-books-list__tiles .mwnf-books-tile')).not.toBeNull(), { timeout: 20000 })
    app.unmount()
  }, 60000)

  it('draws a book’s page, in English and in the language its link names', async () => {
    const [publications] = await loadEntities(['publications'])
    const { app, host } = await mountSite(config, messages, `#/publication/${encodeURIComponent(publications[0].id)}`)
    await vi.waitFor(() => expect(host.querySelector('.mwnf-books-edition')).not.toBeNull(), { timeout: 20000 })
    expect(host.querySelector('.mwnf-books-edition__title').textContent.trim()).not.toBe('')
    app.unmount()

    const second = await mountSite(config, messages, `#/publication/${encodeURIComponent(publications[0].id)}/en`)
    await vi.waitFor(() => expect(second.host.querySelector('.mwnf-books-edition')).not.toBeNull(), { timeout: 20000 })
    second.app.unmount()
  }, 60000)

  it('declares every route by name, and leaves the catch-all to the router', () => {
    expect(checkRoutes(config, { names: ['home', 'category', 'results', 'publication'] })).toEqual([])
  })

  it('declares the entities every route reads', () => {
    for (const route of config.extraViews) {
      expect(Array.isArray(route.meta?.entities), route.name).toBe(true)
    }
  })

  it('declares the section every route belongs to', () => {
    expect(checkSectionMeta(config)).toEqual([])
  })

  it('publishes no generic entity pages', () => {
    expect(config.features.entities).toEqual([])
  })

  // Legacy's pages are English, whatever the book: the site offers English
  // alone, where the publications carry it.
  it('offers English, where the publications carry it', () => {
    expect(checkOfferedLanguages(config, { declared: ['en'], entity: 'publications' })).toEqual([])
    expect(config.languages).toEqual(['en'])
    const switcher = config.navigation.languages
    expect(switcher.map((l) => l.code)).toEqual(config.languages)
    expect(switcher.every((l) => Boolean(l.label))).toBe(true)
  })

  // The chrome is two layers, and either one failing is silent: a missing
  // entry renders as its own name rather than as an error.
  it('renders the shared texts', async () => {
    const { app, host } = await mountSite(config, messages)
    await vi.waitFor(() => expect(host.querySelector('.mwnf-books-home__band')).not.toBeNull(), { timeout: 20000 })
    expect(checkTextsRendered(host, { namespaces: ['books', 'publications', 'core', 'layout'] })).toEqual([])
    app.unmount()
  }, 60000)
})
