import { render, screen } from '@testing-library/react'
import LanguageDropdown from './LanguageDropdown'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import { expect, test } from 'vitest'
import '@testing-library/jest-dom'
import i18n from 'i18next'

i18n
  .use(initReactI18next)
  .init({
    lng: 'en',
    fallbackLng: ['en', 'fi', 'sv'],
    supportedLngs: ['en', 'fi', 'sv'],
    // have a common namespace used around the full app
    ns: ['translationsNS'],
    defaultNS: 'translationsNS',
    debug: true,
    interpolation: {
      escapeValue: false, // not needed for react!!
    },
    resources: { en: { translationsNS: {} }, fi: { translationsNS: {} }, sv: { translationsNS: {} } },
  })

test('Language finnish', async () => {
  render(
    <I18nextProvider i18n={i18n}>
      <LanguageDropdown i18n={i18n} />
    </I18nextProvider>
  )

  expect(screen.getByRole('combobox')).toHaveValue('en')
  expect(screen.getByRole('option', { name: 'FI' }).selected).toBe(false)
  expect(screen.getByRole('option', { name: 'SV' }).selected).toBe(false)

  screen.getByRole('option', { name: 'FI' }).selected = true
  expect(screen.getByRole('option', { name: 'FI' }).selected).toBe(true)
  expect(screen.getByRole('option', { name: 'EN' }).selected).toBe(false)
  expect(screen.getByRole('option', { name: 'SV' }).selected).toBe(false)
})
