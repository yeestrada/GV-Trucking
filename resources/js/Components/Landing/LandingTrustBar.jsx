import { useFrontpage } from './i18n';

function IconShield({ className = 'h-6 w-6' }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
        </svg>
    );
}

function IconClipboard({ className = 'h-6 w-6' }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
        </svg>
    );
}

function IconTimer({ className = 'h-6 w-6' }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
        </svg>
    );
}

function IconArrow({ className = 'h-4 w-4' }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
    );
}

const icons = [IconShield, IconClipboard, IconTimer];

export default function LandingTrustBar() {
    const { t } = useFrontpage();

    return (
        <section className="relative bg-gv-ink py-16 text-white">
            <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-gv-blue via-gv-chrome to-gv-blue" />
            <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
                {t.trust.items.map((point, index) => {
                    const Icon = icons[index] ?? IconShield;
                    return (
                        <article key={point.title} className="group">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gv-blue text-gv-chrome transition group-hover:bg-gv-chrome group-hover:text-gv-ink">
                                <Icon />
                            </div>
                            <h3 className="font-display text-2xl font-bold uppercase tracking-wide">
                                {point.title}
                            </h3>
                            <p className="mt-3 text-white/75">{point.body}</p>
                            {index === 1 && (
                                <a
                                    href="#contact"
                                    className="mt-5 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-gv-chrome transition hover:text-white"
                                >
                                    {t.trust.cta}
                                    <IconArrow />
                                </a>
                            )}
                        </article>
                    );
                })}
            </div>
        </section>
    );
}
