export default function GlobalLoader({ show }) {
    if (!show) return null;

    return (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/40">
            <div className="flex items-center gap-3 rounded-xl bg-white px-6 py-4 shadow-lg">
                <div className="h-6 w-6 animate-spin rounded-full border-4 border-gray-300 border-t-black"></div>
                <p className="text-sm font-semibold text-gray-800">Loading...</p>
            </div>
        </div>
    );
}

