import { usePage } from '@inertiajs/react';
import { useLandingCopy } from './i18n';

const iconPaths = [
    'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z',
    'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z',
    'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
    'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4',
];

export default function LandingWhyUs() {
    const { locale } = usePage().props;
    const { t } = useLandingCopy(locale);

    return (
        <section id="why" className="scroll-mt-24 bg-gv-blue-deep py-20 text-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gv-chrome">
                        {t.whyUs.eyebrow}
                    </p>
                    <h2 className="font-display mt-3 text-4xl font-bold uppercase sm:text-5xl">
                        {t.whyUs.title}
                    </h2>
                    <p className="mt-4 text-lg text-white/80">{t.whyUs.description}</p>
                </div>

                <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {t.whyUs.items.map((item, index) => (
                        <article
                            key={item.title}
                            className="rounded-2xl border border-white/10 bg-gv-ink/25 p-6 transition hover:border-gv-chrome/50 hover:bg-gv-ink/40"
                        >
                            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-gv-chrome text-gv-ink">
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d={iconPaths[index] ?? iconPaths[0]}
                                    />
                                </svg>
                            </div>
                            <h3 className="font-display text-2xl font-bold uppercase">{item.title}</h3>
                            <p className="mt-3 text-white/75">{item.body}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
