import { usePage } from '@inertiajs/react';
import { HERO_IMAGE } from './content';
import { useLandingCopy } from './i18n';
import QuoteForm from './QuoteForm';

function IconCheck({ className = 'h-3.5 w-3.5' }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
    );
}

export default function LandingCTA() {
    const { locale } = usePage().props;
    const { t } = useLandingCopy(locale);

    return (
        <section className="relative isolate overflow-hidden bg-gv-ink py-20 text-white">
            <div
                className="absolute inset-0 -z-20 bg-cover bg-center opacity-40"
                style={{ backgroundImage: `url(${HERO_IMAGE})` }}
                aria-hidden
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-gv-ink via-gv-ink/95 to-gv-blue-deep/90" />

            <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gv-chrome">
                        {t.cta.eyebrow}
                    </p>
                    <h2 className="font-display mt-3 text-4xl font-bold uppercase sm:text-5xl">
                        {t.cta.title}
                    </h2>
                    <p className="mt-4 text-lg text-white/80">{t.cta.description}</p>

                    <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                        {t.hero.features.map((feature) => (
                            <li key={feature} className="flex items-start gap-3">
                                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gv-blue">
                                    <IconCheck className="text-gv-chrome" />
                                </span>
                                <span>{feature}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <QuoteForm idPrefix="footer-cta" />
            </div>
        </section>
    );
}
