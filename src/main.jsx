/* eslint-disable react-refresh/only-export-components */
import React, { lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import store from './store/store.js';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import { AuthLayout } from './components/index.js';
import ErrorBoundary from './components/ErrorBoundary.jsx';

// Lazy-loaded pages for code splitting
const Home = lazy(() => import('./pages/Home.jsx'));
const Login = lazy(() => import('./pages/Login.jsx'));
const Signup = lazy(() => import('./pages/Signup.jsx'));
const AddPost = lazy(() => import('./pages/AddPost.jsx'));
const EditPost = lazy(() => import('./pages/EditPost.jsx'));
const Post = lazy(() => import('./pages/Post.jsx'));
const AllPosts = lazy(() => import('./pages/AllPosts.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

// Minimal spinner used during lazy-load suspense
const PageSpinner = () => (
    <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
    </div>
);

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,                  // App is the layout shell — renders once
        children: [
            {
                index: true,               // Matches exactly "/"
                element: (
                    <Suspense fallback={<PageSpinner />}>
                        <Home />
                    </Suspense>
                ),
            },
            {
                path: 'login',
                element: (
                    // authentication={false} → redirect logged-in users away from this page
                    <AuthLayout authentication={false}>
                        <Suspense fallback={<PageSpinner />}>
                            <Login />
                        </Suspense>
                    </AuthLayout>
                ),
            },
            {
                path: 'signup',
                element: (
                    <AuthLayout authentication={false}>
                        <Suspense fallback={<PageSpinner />}>
                            <Signup />
                        </Suspense>
                    </AuthLayout>
                ),
            },
            {
                path: 'add-post',          // Fixed: was /addPost (mismatched with header link)
                element: (
                    // authentication={true} → redirect guests to /login
                    <AuthLayout authentication={true}>
                        <Suspense fallback={<PageSpinner />}>
                            <AddPost />
                        </Suspense>
                    </AuthLayout>
                ),
            },
            {
                path: 'all-posts',
                element: (
                    <AuthLayout authentication={true}>
                        <Suspense fallback={<PageSpinner />}>
                            <AllPosts />
                        </Suspense>
                    </AuthLayout>
                ),
            },
            {
                path: 'edit-post/:slug',   // Fixed: was authentication={false}
                element: (
                    <AuthLayout authentication={true}>
                        <Suspense fallback={<PageSpinner />}>
                            <EditPost />
                        </Suspense>
                    </AuthLayout>
                ),
            },
            {
                path: 'post/:slug',        // Public — anyone can read a post
                element: (
                    <Suspense fallback={<PageSpinner />}>
                        <Post />
                    </Suspense>
                ),
            },
            {
                path: '*',
                element: (
                    <Suspense fallback={<PageSpinner />}>
                        <NotFound />
                    </Suspense>
                ),
            },
        ],
    },
]);

createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <ErrorBoundary>
                {/*
                    RouterProvider renders the matched route tree.
                    App is the root layout element — do NOT render <App /> here again.
                    The old code had <App /> both as a route element AND as a child of
                    RouterProvider, causing a double mount.
                */}
                <RouterProvider router={router} />
            </ErrorBoundary>
        </Provider>
    </React.StrictMode>
);
