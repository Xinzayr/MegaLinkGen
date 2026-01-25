import { createI18n } from 'vue-i18n'
import en from '../locales/en.json'
import es from '../locales/es.json'
import fr from '../locales/fr.json'
import pt from '../locales/pt.json'

const messages = {
    es,
    en,
    pt,
    fr
}

const i18n = createI18n({
    legacy: false,
    locale: localStorage.getItem('locale') || navigator.language.split('-')[0] || 'en',
    fallbackLocale: 'en',
    messages
})

export default i18n
