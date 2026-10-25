// Skeleton meniru bentuk layout akhir, supaya halaman tidak "melompat" saat data tiba.
const block = 'rounded-md bg-[#e4ddd1]';
export function StatCardSkeleton() {
    return (
        <div className="animate-pulse border border-[#d7d0c3] bg-[#fbf8f2] p-5">
            <div className="flex items-center justify-between">
                <div className={`h-3 w-28 ${block}`} />
                <div className={`h-8 w-8 ${block}`} />
            </div>
            <div className={`mt-5 h-7 w-36 ${block}`} />
            <div className={`mt-3 h-3 w-24 ${block}`} />
        </div>
    );
}
export function ExpenseRowSkeleton() {
    return (
        <div className="flex animate-pulse items-center justify-between border-b border-
[#e4ddd1] py-4 last:border-0">
            <div className="space-y-2">
                <div className={`h-4 w-40 ${block}`} />
                <div className={`h-3 w-24 ${block}`} />
            </div>
            <div className={`h-4 w-24 ${block}`} />
        </div>
    );
}
export function DashboardLoadingSkeleton() {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <StatCardSkeleton />
                <StatCardSkeleton />
                <StatCardSkeleton />
                <StatCardSkeleton />
            </div>
            <div className="border border-[#d7d0c3] bg-[#fbf8f2] p-6">
                <div className={`mb-6 h-5 w-48 ${block}`} />
                <ExpenseRowSkeleton />
                <ExpenseRowSkeleton />
                <ExpenseRowSkeleton />
                <ExpenseRowSkeleton />
            </div>
        </div>
    );
}