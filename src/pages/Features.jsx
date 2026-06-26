export default function Features() {
    return (
        <div className="mx-auto max-w-3xl px-6 py-16 text-zinc-800 dark:text-zinc-200">
            <h1 className="text-3xl font-bold">Features</h1>

            <p className="mt-4 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
                Inkwell is a modern blogging platform built for simplicity and performance.
            </p>

            <ul className="mt-6 list-disc space-y-2 pl-5 text-sm">
                <li>Rich text editor for writing articles</li>
                <li>Secure authentication with Appwrite</li>
                <li>Fast and responsive UI</li>
                <li>Image uploads and post management</li>
                <li>Dark mode support</li>
            </ul>
        </div>
    );
}