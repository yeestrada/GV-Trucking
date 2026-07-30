import DeleteUserForm from './DeleteUserForm';
import UpdatePasswordForm from './UpdatePasswordForm';
import UpdateProfileInformationForm from './UpdateProfileInformationForm';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';

function PersonIcon({ className = 'h-5 w-5' }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
    );
}

function ShieldCheckIcon({ className = 'h-5 w-5' }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
    );
}

function GoogleLogo({ className = 'h-5 w-5' }) {
    return (
        <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
            />
            <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
            />
            <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
            />
            <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
            />
        </svg>
    );
}

export default function ProfileModalContent({ onClose, mustVerifyEmail, status }) {
    const { auth, appName, appDebug, translations = {} } = usePage().props;
    const user = auth.user;
    const t = (key) => translations[key] ?? key;
    const [section, setSection] = useState('profile');
    const [showProfileForm, setShowProfileForm] = useState(false);

    return (
        <div className="relative flex min-h-[28rem] max-h-[90vh] flex-col sm:flex-row">
            {/* Close button */}
            {onClose && (
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-gray-200"
                    aria-label="Close"
                >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            )}

            {/* Left sidebar - dark as in reference */}
            <aside className="flex w-full flex-col border-b border-gray-700 bg-gray-800 px-6 py-6 sm:w-56 sm:border-b-0 sm:border-e sm:border-gray-700 sm:py-8">
                <div className="mb-6">
                    <h2 className="text-base font-semibold text-white">{t('profile.account')}</h2>
                    <p className="mt-0.5 text-sm text-gray-400">{t('profile.manage_account_info')}</p>
                </div>
                <nav className="flex-1 space-y-0.5">
                    <button
                        type="button"
                        onClick={() => setSection('profile')}
                        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition ${
                            section === 'profile' ? 'bg-gray-600 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-gray-200'
                        }`}
                    >
                        <PersonIcon className="h-5 w-5 shrink-0" />
                        {t('Profile')}
                    </button>
                    <button
                        type="button"
                        onClick={() => setSection('security')}
                        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition ${
                            section === 'security' ? 'bg-gray-600 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-gray-200'
                        }`}
                    >
                        <ShieldCheckIcon className="h-5 w-5 shrink-0" />
                        {t('profile.security')}
                    </button>
                </nav>
                <div className="mt-auto border-t border-gray-700 pt-6">
                    <p className="text-center text-xs text-gray-500">
                        {t('login.secured_by')} {appName || 'GV Trucking'}
                    </p>
                    {appDebug && (
                        <p className="mt-1 text-center text-xs font-medium text-orange-400">
                            {t('login.development_mode')}
                        </p>
                    )}
                </div>
            </aside>

            {/* Right content - labels on the left, content on the right (as in reference) */}
            <div className="flex-1 overflow-y-auto bg-gray-100 px-6 py-6 sm:py-8">
                <h1 className="text-lg font-semibold text-gray-900">{t('profile.profile_details')}</h1>
                <hr className="mt-3 border-gray-200" />

                {section === 'profile' && (
                    <div className="mt-6 grid grid-cols-[auto_1fr] gap-x-6 gap-y-8 sm:gap-x-8 items-start">
                        {/* Row 1: label "Profile" | Update profile card */}
                        <p className="text-sm font-medium text-gray-700 pt-1">{t('Profile')}</p>
                        <div className="min-w-0">
                            {!showProfileForm ? (
                                <div className="flex items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary-400 to-primary-600 text-white">
                                            <PersonIcon className="h-6 w-6" />
                                        </div>
                                        <span className="font-medium text-gray-900">{user.name}</span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setShowProfileForm(true)}
                                        className="text-sm font-medium text-primary-600 hover:text-primary-700"
                                    >
                                        {t('profile.update_profile')}
                                    </button>
                                </div>
                            ) : (
                                <UpdateProfileInformationForm
                                    mustVerifyEmail={mustVerifyEmail}
                                    status={status}
                                    className="max-w-xl"
                                    variant="card"
                                    onCancel={() => setShowProfileForm(false)}
                                />
                            )}
                        </div>
                        {/* Row 2: label "Connected accounts" | Google row */}
                        <p className="text-sm font-medium text-gray-700 pt-1">{t('profile.connected_accounts')}</p>
                        <div className="flex items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                            <div className="flex items-center gap-3">
                                <GoogleLogo className="h-5 w-5 shrink-0" />
                                <span className="text-sm text-gray-700">
                                    Google • {user.email}
                                </span>
                            </div>
                            <button type="button" className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600" aria-label="Options">
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
                            </button>
                        </div>
                    </div>
                )}

                {section === 'security' && (
                    <div className="mt-6 space-y-8">
                        <UpdatePasswordForm className="max-w-xl" />
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                )}
            </div>
        </div>
    );
}
