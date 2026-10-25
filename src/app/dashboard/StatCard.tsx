import React from 'react';
import { LucideIcon } from 'lucide-react';
interface StatCardProps {
    title: string;
    value: string;
    subtext?: string;
    icon: LucideIcon;
    iconColor?: string;
    badge?: string;
    badgePositive?: boolean;
}
export function StatCard({
    title,
    value,
    subtext,
    icon: Icon,
    iconColor = 'text-[#20332f]',
    badge,
    badgePositive = true,
}: StatCardProps) {
    return (
        <div className="relative overflow-hidden border border-[#d7d0c3] bg-[#fbf8f2] p-5
transition-colors hover:border-[#9caa9f]">
            <div className="flex items-start justify-between gap-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#7c8
77e]">
                    {title}
                </span>
                <div className={`flex h-8 w-8 items-center justify-center border border-[#d7d
0c3] ${iconColor}`}>
                    <Icon className="h-4 w-4" />
                </div>
            </div>
            <div className="mt-5 flex items-baseline gap-2">
                <span className="text-2xl font-bold tracking-tight text-[#20332f]">
                    {value}
                </span>
            </div>
            {(subtext || badge) && (
                <div className="mt-3 flex items-center gap-2 border-t border-[#e4ddd1] pt-3 t
ext-xs">
                    {badge && (
                        <span className={`font-mono text-[10px] uppercase tracking-wider ${badgePositive ? 'text-[#4f8069]' : 'text-[#c45f4a]'}`}>
                            {badge}
                        </span>
                    )}
                    {subtext && <span className="text-[#68736d]">{subtext}</span>}
                </div>
            )
            }
        </div >
    );
}