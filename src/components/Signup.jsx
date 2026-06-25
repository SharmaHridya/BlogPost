import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { login } from '../store/authslice';
import authService from '../auth/auth';
import Button from './Button';
import InputField from './InputForm';
import Logo from './Logo';

function Signup() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        setError('');
        setLoading(true);
        try {
            const account = await authService.createAccount(data);
            if (account) {
                const userData = await authService.getCurrentUser();
                if (userData) {
                    // Fixed: payload must be { userData } to match authSlice.login reducer
                    dispatch(login({ userData }));
                    navigate('/');
                }
            }
        } catch (err) {
            setError(err?.message || 'Signup failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-zinc-50/70 px-4 py-12 dark:bg-zinc-950">
            <div className="w-full max-w-md">
                {/* Card */}
                <div className="rounded-lg border border-zinc-200 bg-white p-8 shadow-lg shadow-zinc-200/70 dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-black/25">
                    {/* Logo */}
                    <div className="flex justify-center mb-6">
                        <Logo showText={false} />
                    </div>

                    <h1 className="mb-1 text-center text-2xl font-semibold tracking-tight text-zinc-950 dark:text-white">
                        Create your account
                    </h1>
                    <p className="mb-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
                        Already have an account?{' '}
                        <Link
                            to="/login"
                            className="font-semibold text-blue-700 hover:underline dark:text-blue-300"
                        >
                            Sign in
                        </Link>
                    </p>

                    {/* Error message */}
                    {error && (
                        <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-900/60 dark:bg-red-950/25 dark:text-red-300">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <div className="space-y-4">
                            <div>
                                <InputField
                                    label="Full name"
                                    type="text"
                                    placeholder="Jane Doe"
                                    error={errors.name?.message}
                                    {...register('name', {
                                        required: 'Name is required',
                                        minLength: {
                                            value: 2,
                                            message: 'Name must be at least 2 characters',
                                        },
                                    })}
                                />
                            </div>
                            <div>
                                <InputField
                                    label="Email address"
                                    type="email"
                                    placeholder="you@example.com"
                                    error={errors.email?.message}
                                    {...register('email', {
                                        required: 'Email is required',
                                        pattern: {
                                            value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/,
                                            message: 'Enter a valid email address',
                                        },
                                    })}
                                />
                            </div>
                            <div>
                                <InputField
                                    label="Password"
                                    type="password"
                                    placeholder="••••••••"
                                    error={errors.password?.message}
                                    {...register('password', {
                                        required: 'Password is required',
                                        minLength: {
                                            value: 8,
                                            message: 'Password must be at least 8 characters',
                                        },
                                    })}
                                />
                            </div>
                            <Button
                                type="submit"
                                variant="primary"
                                className="w-full mt-2"
                                loading={loading}
                                disabled={loading}
                            >
                                {loading ? 'Creating account…' : 'Create account'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;
