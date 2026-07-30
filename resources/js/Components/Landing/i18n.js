import { usePage } from '@inertiajs/react';
import { landingCopy } from './defaults';

const defaultBusiness = {
    name: 'GV Trucking LLC',
    tagline: 'Flatbed freight. Serious capacity.',
    email: 'dispatch@gvtruckingllc.com',
    phone: '(555) 010-2840',
    phoneHref: 'tel:+15550102840',
    location: 'United States',
    contactName: 'Dispatch',
};

const defaultMedia = {
    heroImage: '/images/frontpage-hero.png',
    aboutImage: '/images/frontpage-about.png',
    serviceImages: [
        '/images/frontpage-service-1.png',
        '/images/frontpage-service-2.png',
        '/images/frontpage-service-3.png',
    ],
};

function pickLocale(section, code) {
    if (!section) return null;
    if (section.en || section.es) {
        return section[code] ?? section.en ?? null;
    }
    return null;
}

export function useFrontpage() {
    const { locale, frontpage = {} } = usePage().props;
    const code = locale === 'es' ? 'es' : 'en';
    const fallback = landingCopy[code];

    const t = {
        nav: pickLocale(frontpage.nav, code) ?? fallback.nav,
        hero: {
            ...fallback.hero,
            ...(pickLocale(frontpage.hero, code) ?? {}),
        },
        form: pickLocale(frontpage.form, code) ?? fallback.form,
        trust: pickLocale(frontpage.trust, code) ?? fallback.trust,
        services: pickLocale(frontpage.services, code) ?? fallback.services,
        about: pickLocale(frontpage.about, code) ?? fallback.about,
        whyUs: pickLocale(frontpage.whyUs, code) ?? fallback.whyUs,
        midCta: pickLocale(frontpage.midCta, code) ?? fallback.midCta,
        faq: pickLocale(frontpage.faq, code) ?? fallback.faq,
        cta: pickLocale(frontpage.cta, code) ?? fallback.cta,
        footer: pickLocale(frontpage.footer, code) ?? fallback.footer,
    };

    const business = frontpage.business ?? defaultBusiness;
    const media = {
        ...defaultMedia,
        ...(frontpage.media ?? {}),
        serviceImages: frontpage.media?.serviceImages ?? defaultMedia.serviceImages,
    };

    const format = (template, vars = {}) =>
        Object.entries(vars).reduce(
            (text, [key, value]) => text.replaceAll(`{${key}}`, String(value)),
            template ?? '',
        );

    return { t, business, media, format, locale: code };
}

/** @deprecated use useFrontpage */
export function useLandingCopy(locale) {
    const { t, format, locale: code } = useFrontpage();
    return { t, format, locale: code || locale };
}
