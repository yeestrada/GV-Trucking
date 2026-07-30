import { useState } from 'react';
import { useFrontpage } from './i18n';

function IconCheck({ className = 'h-3.5 w-3.5' }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
    );
}

export default function QuoteForm({ idPrefix = 'hero', className = '' }) {
    const { t } = useFrontpage();
    const [submitted, setSubmitted] = useState(false);

    const fields = [
        { name: 'fullName', label: t.form.fullName, type: 'text', autoComplete: 'name' },
        { name: 'phone', label: t.form.phone, type: 'tel', autoComplete: 'tel' },
        { name: 'email', label: t.form.email, type: 'email', autoComplete: 'email' },
        { name: 'origin', label: t.form.origin, type: 'text', autoComplete: 'off' },
        { name: 'destination', label: t.form.destination, type: 'text', autoComplete: 'off' },
    ];

    function handleSubmit(event) {
        event.preventDefault();
        setSubmitted(true);
    }

    return (
        <div className={`rounded-2xl bg-white p-6 gv-shadow-card sm:p-8 ${className}`}>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gv-blue">
                {t.form.eyebrow}
            </p>
            <h2 className="font-display mt-2 text-3xl font-bold uppercase text-gv-ink sm:text-4xl">
                {t.form.title}
            </h2>

            {submitted ? (
                <div className="mt-8 rounded-xl border border-gv-blue/20 bg-gv-blue/5 p-6 text-center">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gv-chrome text-gv-ink">
                        <IconCheck className="h-6 w-6" />
                    </div>
                    <p className="font-display text-2xl uppercase text-gv-ink">{t.form.successTitle}</p>
                    <p className="mt-2 text-gv-slate">{t.form.successBody}</p>
                </div>
            ) : (
                <form className="mt-6 space-y-4" onSubmit={handleSubmit} key={idPrefix}>
                    {fields.map((field) => (
                        <div key={field.name}>
                            <label className="sr-only" htmlFor={`${idPrefix}-${field.name}`}>
                                {field.label}
                            </label>
                            <input
                                id={`${idPrefix}-${field.name}`}
                                name={field.name}
                                type={field.type}
                                autoComplete={field.autoComplete}
                                required
                                placeholder={field.label}
                                className="w-full rounded-lg border border-gv-mist bg-gv-paper/60 px-4 py-3 text-gv-ink outline-none transition placeholder:text-gv-steel focus:border-gv-blue focus:ring-2 focus:ring-gv-blue/20"
                            />
                        </div>
                    ))}

                    <div>
                        <label className="sr-only" htmlFor={`${idPrefix}-message`}>
                            {t.form.message}
                        </label>
                        <textarea
                            id={`${idPrefix}-message`}
                            name="message"
                            rows={4}
                            required
                            placeholder={t.form.message}
                            className="w-full resize-y rounded-lg border border-gv-mist bg-gv-paper/60 px-4 py-3 text-gv-ink outline-none transition placeholder:text-gv-steel focus:border-gv-blue focus:ring-2 focus:ring-gv-blue/20"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-lg bg-gv-blue px-6 py-4 font-display text-lg font-bold uppercase tracking-wide text-white transition hover:bg-gv-blue-bright focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gv-chrome"
                    >
                        {t.form.submit}
                    </button>

                    <p className="text-xs leading-relaxed text-gv-steel">{t.form.consent}</p>
                </form>
            )}
        </div>
    );
}
