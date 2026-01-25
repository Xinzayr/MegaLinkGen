import { createI18n } from 'vue-i18n'
import ar from '../locales/ar.json'
import en from '../locales/en.json'
import es from '../locales/es.json'
import fr from '../locales/fr.json'
import hi from '../locales/hi.json'
import pt from '../locales/pt.json'
import ru from '../locales/ru.json'
import zh from '../locales/zh.json'

const messages = {
    es,
    en,
    pt,
    fr,
    zh,
    hi,
    ar,
    ru
}

const i18n = createI18n({
    legacy: false,
    locale: localStorage.getItem('locale') || navigator.language.split('-')[0] || 'en',
    fallbackLocale: 'en',
    messages
})

export default i18n
