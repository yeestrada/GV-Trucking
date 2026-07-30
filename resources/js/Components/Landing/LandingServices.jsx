import { usePage } from '@inertiajs/react';
import { SERVICE_IMAGES } from './content';
import { useLandingCopy } from './i18n';

function IconArrowUpRight({ className = 'h-4 w-4' }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M7 7h10v10" />
        </svg>
    );
}

export default function LandingServices() {
    const { locale } = usePage().props;
    const { t } = useLandingCopy(locale);

    return (
        <section id="services" className="scroll-mt-24 bg-gv-paper py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gv-blue">
                        {t.services.eyebrow}
                    </p>
                    <h2 className="font-display mt-3 text-4xl font-bold uppercase text-gv-ink sm:text-5xl">
                        {t.services.title}
                    </h2>
                    <p className="mt-4 text-lg text-gv-slate">{t.services.description}</p>
                </div>

                <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {t.services.items.map((service, index) => (
                        <article
                            key={service.title}
                            className="group overflow-hidden rounded-2xl bg-white gv-shadow-soft transition hover:-translate-y-1 hover:gv-shadow-card"
                        >
                            <div className="relative aspect-[16/10] overflow-hidden">
                                <img
                                    src={SERVICE_IMAGES[index]}
                                    alt={service.title}
                                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gv-ink/50 to-transparent" />
                            </div>
                            <div className="p-6">
                                <h3 className="font-display text-2xl font-bold uppercase text-gv-ink">
                                    {service.title}
                                </h3>
                                <p className="mt-3 text-gv-slate">{service.body}</p>
                                <a
                                    href="#contact"
                                    className="mt-5 inline-flex items-center gap-1 text-sm font-bold uppercase tracking-wide text-gv-blue transition hover:text-gv-blue-bright"
                                >
                                    {t.services.details}
                                    <IconArrowUpRight />
                                </a>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
