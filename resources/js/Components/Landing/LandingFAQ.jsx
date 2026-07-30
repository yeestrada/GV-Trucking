import { useState } from 'react';
import { useFrontpage } from './i18n';

function IconChevron({ className = 'h-5 w-5' }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
    );
}

export default function LandingFAQ() {
    const { t, locale } = useFrontpage();
    const [openIndex, setOpenIndex] = useState(0);

    return (
        <section id="faq" className="scroll-mt-24 bg-gv-paper py-20">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gv-blue">
                        {t.faq.eyebrow}
                    </p>
                    <h2 className="font-display mt-3 text-4xl font-bold uppercase text-gv-ink sm:text-5xl">
                        {t.faq.title}
                    </h2>
                    <p className="mt-4 text-lg text-gv-slate">{t.faq.description}</p>
                </div>

                <div className="mt-10 space-y-3" key={locale}>
                    {t.faq.items.map((faq, index) => {
                        const open = openIndex === index;
                        return (
                            <div
                                key={faq.q}
                                className="overflow-hidden rounded-2xl border border-gv-mist bg-white"
                            >
                                <button
                                    type="button"
                                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                                    aria-expanded={open}
                                    onClick={() => setOpenIndex(open ? null : index)}
                                >
                                    <span className="font-display text-lg font-bold uppercase text-gv-ink">
                                        {faq.q}
                                    </span>
                                    <IconChevron
                                        className={`h-5 w-5 shrink-0 text-gv-blue transition ${
                                            open ? 'rotate-180' : ''
                                        }`}
                                    />
                                </button>
                                {open && (
                                    <div className="border-t border-gv-mist px-5 py-4 text-gv-slate">
                                        {faq.a}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
