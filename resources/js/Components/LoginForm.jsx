import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';

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

export default function LoginForm({
    onClose = null,
    canResetPassword = false,
    status = null,
    error = null,
    errorDetail = null,
    googleConfigured = false,
    showFooter = true,
    isModal = false,
    externalErrors = {},
}) {
    const { appName, appDebug, translations = {} } = usePage().props;
    const t = (key) => translations[key] ?? key;
    const { data, setData, post, processing, errors: formErrors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });
    const rawErrors = Object.keys(externalErrors).length ? externalErrors : formErrors;
    const errors = {
        email: Array.isArray(rawErrors.email) ? rawErrors.email[0] : rawErrors.email,
        password: Array.isArray(rawErrors.password) ? rawErrors.password[0] : rawErrors.password,
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
            preserveScroll: isModal,
        });
    };

    return (
        <div className="relative w-full">
            <div className="mb-6 text-center">
                <img
                    src="/images/GV_Trucking_Logo.png"
                    alt={appName || t('Welcome')}
                    className="mx-auto h-24 w-auto object-contain object-center sm:h-28"
                />
            </div>

            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                    <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                        {t('login.sign_in_to')}
                    </h1>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {t('login.welcome_back')}
                    </p>
                </div>
                {onClose && (
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex shrink-0 h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-gray-600 transition hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-500"
                        aria-label="Close"
                    >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}
            </div>

            <div className="w-full">
                {status && (
                    <div className="mt-4 text-sm font-medium text-green-600 dark:text-green-400">
                        {status}
                    </div>
                )}
                {error && (
                    <div className="mt-4 text-sm font-medium text-red-600 dark:text-red-400">
                        {error}
                        {errorDetail && (
                            <p className="mt-1 text-xs font-normal text-red-500 dark:text-red-400 break-words">
                                {errorDetail}
                            </p>
                        )}
                    </div>
                )}

                <div className="mt-6">
                    <a
                        href={route('auth.google.redirect')}
                        className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                    >
                        <GoogleLogo />
                        {t('login.continue_with_google')}
                    </a>
                </div>
                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200 dark:border-gray-600" />
                    </div>
                    <div className="relative flex justify-center">
                        <span className="bg-white px-2 text-sm text-gray-500 dark:bg-gray-800 dark:text-gray-400">{t('login.or')}</span>
                    </div>
                </div>

                <form onSubmit={submit}>
                    <div>
                        <InputLabel htmlFor="email" value={t('login.username')} />
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400 focus:dark:border-primary-400 focus:dark:ring-primary-500"
                            autoComplete="username"
                            isFocused={isModal}
                            onChange={(e) => setData('email', e.target.value)}
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="password" value={t('login.password')} />
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400 focus:dark:border-primary-400 focus:dark:ring-primary-500"
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                        />
                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    {canResetPassword && (
                        <div className="mt-2 text-right">
                            <Link
                                href={route('password.request')}
                                className="text-sm text-gray-600 underline hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                            >
                                {t('login.forgot_password')}
                            </Link>
                        </div>
                    )}

                    <PrimaryButton
                        type="submit"
                        className="mt-6 flex w-full items-center justify-center gap-2"
                        disabled={processing}
                    >
                        {t('login.continue')}
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                fillRule="evenodd"
                                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </PrimaryButton>
                </form>

                {showFooter && (
                    <div className="mt-6 flex flex-col items-center gap-2">
                        <p className="text-center text-xs text-gray-400 dark:text-gray-500">
                            {t('login.secured_by')} {appName || 'GV Trucking'}
                        </p>
                        {appDebug && (
                            <p className="text-center text-xs font-medium text-orange-500 dark:text-orange-400">
                                {t('login.development_mode')}
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
