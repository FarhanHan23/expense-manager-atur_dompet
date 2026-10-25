import Link from 'next/link';
import { Inbox, PlusCircle } from 'lucide-react';
interface EmptyStateProps {
    title?: string;
    description?: string;
    actionLabel?: string;
    actionHref?: string;
    onActionClick?: () => void;
}
const actionClass = 'inline-flex items-center gap-2 rounded-md bg-[#20332f] px-4 py-2.5 text-sm font-semibold text - [#f4f0e8] transition - colors hover: bg - [#2d4941] focus: outline - none focus: ring - 2 focus: ring - [#f2b66d] focus: ring - offset - 2';

export function EmptyState({
    title = 'Belum Ada Data Pengeluaran',
    description = 'Mulai catat transaksi harian untuk melacak pengeluaran dan anggaran.',
    actionLabel = 'Catat Pengeluaran Baru',
    actionHref = '/expenses/new',
    onActionClick,
}: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center rounded-md border borde
r-dashed border-[#cfc7b9] bg-[#fbf8f2] p-8 text-center sm:p-12">
            <div className="flex h-14 w-14 items-center justify-center rounded-md border bo
rder-[#d7d0c3] bg-[#f4f0e8] text-[#20332f]">
                <Inbox className="h-7 w-7" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-[#20332f]">{title}</h3>
            <p className="mt-2 max-w-sm text-sm text-[#68736d]">{description}</p>
            <div className="mt-6">
                {onActionClick ? (
                    <button type="button" onClick={onActionClick} className={actionClass}>
                        <PlusCircle className="h-4 w-4" />
                        {actionLabel}
                    </button>
                ) : (
                    <Link href={actionHref} className={actionClass}>
                        <PlusCircle className="h-4 w-4" />
                        {actionLabel}
                    </Link>
                )}
            </div>
        </div>
    );
}