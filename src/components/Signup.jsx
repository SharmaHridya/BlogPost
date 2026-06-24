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
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                {/* Card */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl shadow-gray-200/60 dark:shadow-gray-900/60 border border-gray-100 dark:border-gray-800 p-8">
                    {/* Logo */}
                    <div className="flex justify-center mb-6">
                        <Logo showText={false} />
                    </div>

                    <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-1">
                        Create your account
                    </h1>
                    <p className="text-sm text-center text-gray-500 dark:text-gray-400 mb-6">
                        Already have an account?{' '}
                        <Link
                            to="/login"
                            className="font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
                        >
                            Sign in
                        </Link>
                    </p>

                    {/* Error message */}
                    {error && (
                        <div className="mb-5 px-4 py-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-sm text-red-700 dark:text-red-400">
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
                                    {...register('name', {
                                        required: 'Name is required',
                                        minLength: {
                                            value: 2,
                                            message: 'Name must be at least 2 characters',
                                        },
                                    })}
                                />
                                {errors.name && (
                                    <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
                                )}
                            </div>
                            <div>
                                <InputField
                                    label="Email address"
                                    type="email"
                                    placeholder="you@example.com"
                                    {...register('email', {
                                        required: 'Email is required',
                                        pattern: {
                                            value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/,
                                            message: 'Enter a valid email address',
                                        },
                                    })}
                                />
                                {errors.email && (
                                    <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
                                )}
                            </div>
                            <div>
                                <InputField
                                    label="Password"
                                    type="password"
                                    placeholder="••••••••"
                                    {...register('password', {
                                        required: 'Password is required',
                                        minLength: {
                                            value: 8,
                                            message: 'Password must be at least 8 characters',
                                        },
                                    })}
                                />
                                {errors.password && (
                                    <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
                                )}
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