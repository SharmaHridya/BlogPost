function StatCard({ label, value, tone = 'blue', helper }) {
    const tones = {
        blue: 'bg-blue-50 text-blue-700 ring-blue-100 dark:bg-blue-950/40 dark:text-blue-300 dark:ring-blue-900/60',
        emerald: 'bg-emerald-50 text-emerald-700 ring-emerald-100 dark:bg-emerald-950/35 dark:text-emerald-300 dark:ring-emerald-900/60',
        amber: 'bg-amber-50 text-amber-700 ring-amber-100 dark:bg-amber-950/35 dark:text-amber-300 dark:ring-amber-900/60',
    };

    return (
        <div className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm shadow-zinc-200/60 dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-black/20">
            <div className={`mb-4 inline-flex h-9 w-9 items-center justify-center rounded-lg ring-1 ${tones[tone] || tones.blue}`}>
                <span className="text-sm font-bold">{String(label).charAt(0)}</span>
            </div>
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{label}</p>
            <p className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">{value}</p>
            {helper && <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">{helper}</p>}
        </div>
    );
}

export default StatCard;
