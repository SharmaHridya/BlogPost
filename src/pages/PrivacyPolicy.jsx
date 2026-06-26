export default function PrivacyPolicy() {
    return (
        <div className="mx-auto max-w-3xl px-6 py-16 text-zinc-800 dark:text-zinc-200">
            <h1 className="text-3xl font-bold">Privacy Policy</h1>

            <p className="mt-4 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
                We respect your privacy. Inkwell collects minimal data required to
                provide authentication and blogging functionality.
            </p>

            <p className="mt-4 text-sm leading-7">
                Your posts, account details, and uploads are stored securely using Appwrite.
                We do not sell or share your data with third parties.
            </p>
        </div>
    );
}