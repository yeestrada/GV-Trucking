import LoginForm from '@/Components/LoginForm';
import { Head } from '@inertiajs/react';

export default function Login({ status, error, canResetPassword, googleConfigured = false }) {
    return (
        <>
            <Head title="Log in" />
            <div className="flex min-h-screen items-center justify-center bg-gray-600 p-4">
                <div className="relative w-full max-w-md overflow-hidden rounded-xl bg-white shadow-xl dark:bg-gray-800">
                    <div className="p-8">
                        <LoginForm
                            canResetPassword={canResetPassword}
                            status={status}
                            error={error}
                            googleConfigured={googleConfigured}
                            showFooter={true}
                            isModal={false}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
