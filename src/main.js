import './style.css'
import './styles/ip8style.css'

import arta_8iphone_1 from './templates/arta_8iphone_1.html?raw';
import arta_13iphone_1 from './templates/arta_13iphone_1.html?raw';

import { I18n } from "i18n-js";
import de from './i18n/de.json';
import en from './i18n/en.json';
import es from './i18n/es.json';
import fr from './i18n/fr.json';
import ja from './i18n/ja.json';
import pt from './i18n/pt.json';

import { adjustFontSize, selectSubscription } from './helpers'

const translations = { en, es, fr, de, ja, pt };
const defaultLang = 'en';

function getLanguage() {
    const urlParams = new URLSearchParams(window.location.search);
    let lang = urlParams.get('lang') || navigator.language.slice(0, 2);
    return translations[lang] ? lang : defaultLang;
}

function getDeviceModel() {
    const ua = navigator.userAgent;
    if (/iPhone\s?SE/.test(ua)) return 'iphone_se';
    if (/iPhone\s?8\+/.test(ua)) return 'iphone_8_plus';
    if (/iPhone\s?11\s?Pro/.test(ua)) return 'iphone_11_pro';
    if (/iPhone\s?14\s?Pro\s?Max/.test(ua)) return 'iphone_14_pro_max';
    if (/iPhone\s?14\s?Plus/.test(ua)) return 'iphone_14_plus';
    if (/iPhone\s?14/.test(ua)) return 'iphone_14';
    return 'iphone_14_pro_max';
}
const i18n = new I18n({
    en,
    es,
    de, fr, ja, pt
});

function loadTranslations(lang) {
    i18n.translations[lang] = translations[lang];
    console.log(i18n.translations[lang])
    i18n.locale = lang;
}

async function loadPageContent() {
    const model = getDeviceModel();
    const lang = getLanguage();
    document.documentElement.lang = lang;
    loadTranslations(lang);

    const contentMap = {
        'iphone_se': arta_8iphone_1,
        'iphone_8_plus': arta_8iphone_1,
        'iphone_11_pro': arta_13iphone_1,
        'iphone_14': arta_13iphone_1,
        'iphone_14_plus': arta_13iphone_1,
        'iphone_14_pro_max': arta_13iphone_1
    };

    const content = contentMap[model] || '<p>Unsupported device</p>';
    document.getElementById('app').innerHTML = content;

    if (lang === 'de' || lang === 'es' || lang === 'fr' || lang === 'pt') adjustFontSize(13, 11)
    selectSubscription()

    applyTranslations();
}

function applyTranslations() {
    document.querySelector('.title')
        .innerHTML = i18n.t('Get Unlimited <br>Access');
    document.querySelector('.option-1')
        .innerHTML = i18n.t('Unlimited Art <br>Creation');
    document.querySelector('.option-2')
        .innerHTML = i18n.t('Exclusive <br>Styles');
    document.querySelector('.option-3')
        .innerHTML = i18n.t('Magic Avatars <br>With 20% Off');
    document.querySelector('.best-offer')
        .textContent = i18n.t('BEST OFFER');
    document.querySelector('.subscription p:first-child')
        .textContent = i18n.t('YEARLY ACCESS');
    document.querySelector('.price-color')
        .innerHTML = i18n.t('Just {{price}} per year', { price: '$39.99' });
    document.querySelector('.weekly-access')
        .textContent = i18n.t('WEEKLY ACCESS');
    document.querySelectorAll('.subscription-price')
        .forEach(el => el.innerHTML = i18n.t('{{price}} <br>per week', { price: '$6.99' })
        )
    document.querySelector('.button')
        .textContent = i18n.t('Continue');

    const footerLinks = document.querySelectorAll('.footer a');
    if (footerLinks.length >= 3) {
        footerLinks[0].textContent = i18n.t('Terms of Use');
        footerLinks[1].textContent = i18n.t('Privacy Policy');
        footerLinks[2].textContent = i18n.t('Restore');
    }
}

document.addEventListener('DOMContentLoaded', loadPageContent);
