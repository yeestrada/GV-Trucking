import LoginForm from '@/Components/LoginForm';
import LandingAbout from '@/Components/Landing/LandingAbout';
import LandingCTA from '@/Components/Landing/LandingCTA';
import LandingFAQ from '@/Components/Landing/LandingFAQ';
import LandingFooter from '@/Components/Landing/LandingFooter';
import LandingHero from '@/Components/Landing/LandingHero';
import LandingNavbar from '@/Components/Landing/LandingNavbar';
import LandingServices from '@/Components/Landing/LandingServices';
import LandingTrustBar from '@/Components/Landing/LandingTrustBar';
import LandingWhyUs from '@/Components/Landing/LandingWhyUs';
import { useFrontpage } from '@/Components/Landing/i18n';
import Modal from '@/Components/Modal';
import { Head, router, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Welcome() {
    const {
        appName,
        validationErrors = {},
        canResetPassword,
        googleConfigured,
        loginError,
        loginErrorDetail,
        openLoginModal = false,
    } = usePage().props;
    const { t } = useFrontpage();
    const brand = appName || 'GV Trucking';
    const hasLoginErrors = validationErrors && (validationErrors.email?.length || validationErrors.password?.length);
    const hasLoginError = !!loginError;
    const [showLoginModal, setShowLoginModal] = useState(!!hasLoginErrors || hasLoginError || openLoginModal);

    const closeLoginModal = () => {
        setShowLoginModal(false);
        if (hasLoginErrors || hasLoginError) {
            router.visit('/', { preserveState: false });
        }
    };

    return (
        <>
            <Head title={brand} />

            <div className="min-h-screen bg-gv-paper font-sans antialiased">
                <LandingNavbar onSignIn={() => setShowLoginModal(true)} />
                <main>
                    <LandingHero />
                    <LandingTrustBar />
                    <LandingServices />
                    <LandingAbout />
                    <LandingWhyUs />
                    <div className="bg-gradient-to-r from-gv-blue via-gv-ink to-gv-blue px-4 py-10 text-center">
                        <p className="font-display text-2xl font-bold uppercase text-white sm:text-3xl md:text-4xl">
                            {t.midCta.title}
                        </p>
                        <a
                            href="#contact"
                            className="mt-5 inline-flex rounded-full bg-gv-chrome px-6 py-3 font-display text-lg font-bold uppercase text-gv-ink transition hover:bg-white"
                        >
                            {t.midCta.button}
                        </a>
                    </div>
                    <LandingFAQ />
                    <LandingCTA />
                </main>
                <LandingFooter />
            </div>

            <Modal show={showLoginModal} onClose={closeLoginModal} maxWidth="md" align="top">
                <div className="p-8">
                    <LoginForm
                        canResetPassword={canResetPassword}
                        googleConfigured={googleConfigured}
                        showFooter={true}
                        isModal={true}
                        externalErrors={validationErrors}
                        error={loginError}
                        errorDetail={loginErrorDetail}
                    />
                </div>
            </Modal>
        </>
    );
}
