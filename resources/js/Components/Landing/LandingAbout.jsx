import { useFrontpage } from './i18n';

export default function LandingAbout() {
    const { t, format, business, media } = useFrontpage();

    return (
        <section id="about" className="scroll-mt-24 overflow-hidden bg-white py-20">
            <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gv-blue">
                        {t.about.eyebrow}
                    </p>
                    <h2 className="font-display mt-3 text-4xl font-bold uppercase text-gv-ink sm:text-5xl">
                        {t.about.title}
                    </h2>
                    <div className="mt-6 space-y-4 text-lg leading-relaxed text-gv-slate">
                        {t.about.paragraphs.map((paragraph) => (
                            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                        ))}
                    </div>
                    <a
                        href="#contact"
                        className="mt-8 inline-flex rounded-full bg-gv-ink px-6 py-3 font-display text-lg font-bold uppercase tracking-wide text-gv-chrome transition hover:bg-gv-blue"
                    >
                        {t.about.cta}
                    </a>
                </div>

                <div className="relative">
                    <div className="absolute -inset-3 -z-10 rotate-2 rounded-3xl bg-gv-chrome/50" />
                    <div className="absolute -inset-3 -z-20 -rotate-2 rounded-3xl bg-gv-blue/30" />
                    <img
                        src={media.aboutImage}
                        alt={t.about.title}
                        className="relative aspect-[4/5] w-full rounded-3xl object-cover gv-shadow-card sm:aspect-[5/4]"
                        loading="lazy"
                    />
                    <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-gv-ink/90 p-4 text-white backdrop-blur sm:left-auto sm:right-4 sm:w-64">
                        <p className="font-display text-xl uppercase text-gv-chrome">{business.contactName}</p>
                        <p className="mt-1 text-sm text-white/80">
                            {format(t.about.ownerRole, { location: business.location })}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
