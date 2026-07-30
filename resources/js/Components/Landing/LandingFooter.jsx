import { usePage } from '@inertiajs/react';
import { useFrontpage } from './i18n';

function IconPhone({ className = 'h-4 w-4' }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
        </svg>
    );
}

function IconMail({ className = 'h-4 w-4' }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
        </svg>
    );
}

function IconPin({ className = 'h-4 w-4' }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
    );
}

export default function LandingFooter() {
    const { appName } = usePage().props;
    const { t, format, business } = useFrontpage();
    const year = new Date().getFullYear();
    const name = appName || business.name;

    return (
        <footer className="bg-gv-ink text-white">
            <div className="h-1.5 bg-gradient-to-r from-gv-chrome via-gv-blue to-gv-chrome" />
            <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
                <div>
                    <a href="#home" className="inline-block" aria-label={name}>
                        <img
                            src="/images/GV_Trucking_Logo.png"
                            alt={name}
                            className="h-28 w-auto object-contain sm:h-32"
                        />
                    </a>
                    <p className="mt-5 text-white/70">{t.footer.blurb}</p>
                </div>

                <div>
                    <h3 className="font-display text-xl font-bold uppercase text-gv-chrome">
                        {t.footer.quickLinks}
                    </h3>
                    <ul className="mt-4 space-y-2">
                        {(t.nav.items || []).map((link) => (
                            <li key={`${link.href}-${link.label}`}>
                                <a href={link.href} className="text-white/75 transition hover:text-gv-chrome">
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3 className="font-display text-xl font-bold uppercase text-gv-chrome">
                        {t.footer.topServices}
                    </h3>
                    <ul className="mt-4 space-y-2">
                        {t.services.items.map((service) => (
                            <li key={service.title}>
                                <a href="#services" className="text-white/75 transition hover:text-gv-chrome">
                                    {service.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3 className="font-display text-xl font-bold uppercase text-gv-chrome">
                        {t.footer.contact}
                    </h3>
                    <ul className="mt-4 space-y-3 text-white/80">
                        <li>
                            <a
                                href={business.phoneHref}
                                className="inline-flex items-center gap-2 transition hover:text-gv-chrome"
                            >
                                <IconPhone className="h-4 w-4 shrink-0 text-gv-chrome" />
                                <span>{business.phone}</span>
                            </a>
                        </li>
                        <li>
                            <a
                                href={`mailto:${business.email}`}
                                className="flex items-start gap-2 transition hover:text-gv-chrome"
                            >
                                <IconMail className="mt-0.5 h-4 w-4 shrink-0 text-gv-chrome" />
                                <span className="min-w-0 break-words">{business.email}</span>
                            </a>
                        </li>
                        <li className="flex items-start gap-2">
                            <IconPin className="mt-0.5 h-4 w-4 shrink-0 text-gv-chrome" />
                            <span>{business.location}</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="border-t border-white/10">
                <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
                    <p>{format(t.footer.rights, { year, name })}</p>
                    <div className="flex flex-wrap gap-4">
                        <a href="#home" className="hover:text-gv-chrome">
                            {t.footer.privacy}
                        </a>
                        <a href="#home" className="hover:text-gv-chrome">
                            {t.footer.terms}
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
