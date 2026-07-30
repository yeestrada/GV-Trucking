import LanguageSelector from '@/Components/LanguageSelector';
import { Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { BUSINESS, NAV_ITEMS } from './content';
import { useLandingCopy } from './i18n';

function IconMenu({ className = 'h-5 w-5' }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
    );
}

function IconX({ className = 'h-5 w-5' }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
    );
}

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

export default function LandingNavbar({ onSignIn }) {
    const { auth, locale } = usePage().props;
    const { t } = useLandingCopy(locale);
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 12);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [open]);

    return (
        <header
            className={`sticky top-0 z-50 border-b transition-all ${
                scrolled
                    ? 'border-white/10 bg-gv-ink/95 shadow-[0_10px_30px_rgba(0,0,0,0.2)] backdrop-blur'
                    : 'border-transparent bg-gv-ink'
            }`}
        >
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
                <a href="#home" className="min-w-0 shrink-0" aria-label={BUSINESS.name}>
                    <img
                        src="/images/GV_Trucking_Logo.png"
                        alt={BUSINESS.name}
                        className="h-14 w-auto object-contain sm:h-16 lg:h-[4.5rem]"
                    />
                </a>

                <nav className="hidden items-center gap-1 lg:flex">
                    {NAV_ITEMS.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="rounded-md px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-white/90 transition hover:bg-white/10 hover:text-gv-chrome"
                        >
                            {t.nav[link.key]}
                        </a>
                    ))}
                </nav>

                <div className="flex items-center gap-2 sm:gap-3">
                    <LanguageSelector buttonClass="border border-white/20 bg-black/30 text-white hover:bg-black/50" />

                    <a
                        href={BUSINESS.phoneHref}
                        className="hidden items-center gap-2 rounded-full bg-gv-chrome px-4 py-2.5 text-sm font-bold text-gv-ink transition hover:bg-white sm:inline-flex"
                    >
                        <IconPhone />
                        {BUSINESS.phone}
                    </a>

                    {auth?.user ? (
                        <Link
                            href={route('dashboard')}
                            className="hidden rounded-md bg-gv-blue px-4 py-2.5 text-sm font-bold text-white transition hover:bg-gv-blue-bright sm:inline-flex"
                        >
                            {t.nav.dashboard}
                        </Link>
                    ) : (
                        <button
                            type="button"
                            onClick={onSignIn}
                            className="hidden rounded-md border border-white/25 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-white/10 sm:inline-flex"
                        >
                            {t.nav.signIn}
                        </button>
                    )}

                    <button
                        type="button"
                        className="inline-flex rounded-md border border-white/20 p-2 text-white lg:hidden"
                        aria-expanded={open}
                        aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
                        onClick={() => setOpen((value) => !value)}
                    >
                        {open ? <IconX /> : <IconMenu />}
                    </button>
                </div>
            </div>

            {open && (
                <div className="border-t border-white/10 bg-gv-ink lg:hidden">
                    <nav className="mx-auto flex max-w-7xl flex-col px-4 py-4 sm:px-6">
                        {NAV_ITEMS.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="border-b border-white/10 py-3 font-display text-lg uppercase tracking-wide text-white"
                                onClick={() => setOpen(false)}
                            >
                                {t.nav[link.key]}
                            </a>
                        ))}
                        <a
                            href={BUSINESS.phoneHref}
                            className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-gv-chrome px-4 py-3 font-bold text-gv-ink"
                            onClick={() => setOpen(false)}
                        >
                            <IconPhone />
                            {BUSINESS.phone}
                        </a>
                        {auth?.user ? (
                            <Link
                                href={route('dashboard')}
                                className="mt-3 inline-flex items-center justify-center rounded-md bg-gv-blue px-4 py-3 font-bold text-white"
                                onClick={() => setOpen(false)}
                            >
                                {t.nav.dashboard}
                            </Link>
                        ) : (
                            <button
                                type="button"
                                className="mt-3 inline-flex items-center justify-center rounded-md border border-white/25 px-4 py-3 font-bold text-white"
                                onClick={() => {
                                    setOpen(false);
                                    onSignIn?.();
                                }}
                            >
                                {t.nav.signIn}
                            </button>
                        )}
                    </nav>
                </div>
            )}
        </header>
    );
}
