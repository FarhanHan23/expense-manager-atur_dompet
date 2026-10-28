import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getSession } from '@/lib/auth';
import {
    getExpense,
    updateExpense,
    deleteExpense,
} from '@/features/expenses/repository';
import { expenseSchema } from '@/features/expenses/schema';
type RouteContext = {
    params: Promise<{ id: string }>;
};
export async function GET(
    _request: Request,
    { params }: RouteContext
) {
    const session = await getSession();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { id } = await params;
    const expense = getExpense(session.tenantId, id);
    if (!expense) {
        return NextResponse.json({ error: 'Pengeluaran tidak ditemukan' }, {
            status: 404
        });
    }
    return NextResponse.json({ data: expense });
}
export async function PATCH(
    request: Request,
    { params }: RouteContext
) {
    const session = await getSession();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { id } = await params;
    try {
        const body = await request.json();
        const patchSchema = expenseSchema.partial().extend({
            status: z.enum(['completed', 'pending']).optional(),
        });
        const result = patchSchema.safeParse(body);
        if (!result.success) {
            return NextResponse.json(
                { error: 'Validasi gagal', details: result.error.flatten() },
                { status: 400 }
            );
        }
        const updated = updateExpense(session.tenantId, id, result.data);
        if (!updated) {
            return NextResponse.json({ error: 'Pengeluaran tidak ditemukan' }, {
                status: 404
            });
        }
        return NextResponse.json({ data: updated });
    } catch {
        return NextResponse.json({ error: 'Format JSON tidak valid' }, { status: 400 });
    }
}
export async function DELETE(
    _request: Request,
    { params }: RouteContext
) {
    const session = await getSession();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { id } = await params;
    const success = deleteExpense(session.tenantId, id);
    if (!success) {
        return NextResponse.json({ error: 'Pengeluaran tidak ditemukan' }, {
            status: 404
        });
    }
    return NextResponse.json({ data: { success: true } });
}