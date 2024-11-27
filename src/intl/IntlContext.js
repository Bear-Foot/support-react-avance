import { mapValues } from 'lodash'
import {
  createContext, useCallback, useContext, useMemo, useState,
} from 'react'
import { IntlProvider } from 'react-intl'

import { storingState } from '../hooks/HoH'

const messagesFr = {
  homeLinkLabel: 'Home depuis sidebar {test}',
  linkHome: 'Home',
  linkNL: 'News letter',
  linkPerf: 'Perf',
  linkProfile: 'Pro file',
}

export const t = mapValues(messagesFr, (_, key) => key)

const messagesDe = {
  homeLinkLabel: 'Ahh kartofeln {test}',
}

const allMessages = {
  de: messagesDe,
  fr: messagesFr,
}

const SetLocaleContext = createContext()
export const useSetLocale = () => useContext(SetLocaleContext)

const localeStateFn = storingState(useState, 'prefered-locale')

export const IntlWrapper = ({ children }) => {
  const [locale, setLocale] = localeStateFn('fr')

  const toggleLocale = useCallback(() => setLocale((l) => (l === 'fr' ? 'de' : 'fr')), [])

  return (
    <IntlProvider messages={allMessages[locale]} locale={locale}>
      <SetLocaleContext.Provider value={toggleLocale}>
        {children}
      </SetLocaleContext.Provider>
    </IntlProvider>
  )
}
