'use client';
import React from 'react';
import { LogOut } from 'lucide-react';
import { logoutAction } from '@/app/(auth)/logout/actions';
export function LogoutButton() {
    return (
        <form action={logoutAction}>
            <button
                type="submit"
                className="inline-flex items-center gap-1.5 rounded-md border border-[#d7d0c
3] bg-[#fbf8f2] px-2.5 py-1 text-xs font-medium text-[#20332f] transition-colors hove
r:bg-[#eae4d9] hover:border-[#b8afa1] cursor-pointer"
            >
                <LogOut className="h-3.5 w-3.5 text-[#68736d]" />
                <span>Keluar</span>
            </button>
        </form>
    );
}
export default LogoutButton;