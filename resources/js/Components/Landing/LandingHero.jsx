import { useFrontpage } from './i18n';
import QuoteForm from './QuoteForm';

function IconCheck({ className = 'h-3.5 w-3.5' }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
    );
}

export default function LandingHero() {
    const { t, business, media } = useFrontpage();

    return (
        <section id="home" className="relative isolate overflow-hidden">
            <div
                className="absolute inset-0 -z-20 bg-cover bg-center"
                style={{ backgroundImage: `url(${media.heroImage})` }}
                aria-hidden
            />
            <div className="gv-hero-overlay absolute inset-0 -z-10" aria-hidden />

            <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12 lg:px-8 lg:py-20">
                <div className="text-white">
                    <p className="animate-rise text-sm font-semibold uppercase tracking-[0.2em] text-gv-chrome">
                        {t.hero.tagline || business.tagline}
                    </p>
                    <h1 className="animate-rise-delay font-display mt-4 max-w-xl text-4xl font-bold uppercase leading-[1.05] text-balance sm:text-5xl lg:text-6xl">
                        {t.hero.titleBefore}{' '}
                        <span className="text-gv-chrome">{t.hero.titleHighlight}</span>
                    </h1>
                    <p className="animate-rise-delay-2 mt-5 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg">
                        {t.hero.description}
                    </p>

                    <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                        {t.hero.features.map((feature) => (
                            <li key={feature} className="flex items-start gap-3 text-white/95">
                                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gv-blue-bright">
                                    <IconCheck className="text-white" />
                                </span>
                                <span className="font-medium">{feature}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div id="contact" className="animate-rise-delay-2 scroll-mt-28">
                    <QuoteForm />
                </div>
            </div>
        </section>
    );
}
