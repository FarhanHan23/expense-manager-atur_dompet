import { DashboardLoadingSkeleton } from '@/components/ui/LoadingSkeleton';
// loading.tsx menjadi fallback Suspense untuk seluruh segment dashboard.
export default function Loading() {
    return (
        <div className="mx-auto max-w-7xl space-y-6">
            <div className="h-8 w-56 animate-pulse rounded-md bg-[#e4ddd1]" />
            <DashboardLoadingSkeleton />
        </div>
    );
}