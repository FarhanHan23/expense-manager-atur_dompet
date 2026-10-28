import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { listExpenses, createExpense } from '@/features/expenses/repository';
import { expenseSchema } from '@/features/expenses/schema';
import { logger } from '@/lib/logger';
export async function GET(request: Request) {
    const session = await getSession();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') ?? undefined;
    const category = searchParams.get('category') ?? undefined;
    const pageParam = searchParams.get('page');
    const pageSizeParam = searchParams.get('pageSize');
    const page = pageParam && !isNaN(Number(pageParam)) ? Number(pageParam) : undefined;
    const pageSize = pageSizeParam && !isNaN(Number(pageSizeParam)) ? Number(pageSizeParam) : undefined;
    const data = listExpenses(session.tenantId, {
        search,
        category,
        page,
        pageSize,
    });
    return NextResponse.json({ data });
}
export async function POST(request: Request) {
    const session = await getSession();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    try {
        const body = await request.json();
        const result = expenseSchema.safeParse(body);
        if (!result.success) {
            logger.warn('expense.create.invalid', { tenantId: session.tenantId });
            return NextResponse.json(
                { error: 'Validasi gagal', details: result.error.flatten() },
                { status: 400 }
            );
        }
        const data = createExpense(session.tenantId, result.data);
        logger.info('expense.created', { tenantId: session.tenantId, id: data.id });
        return NextResponse.json({ data }, { status: 201 });
    } catch {
        return NextResponse.json({ error: 'Format JSON tidak valid' }, { status: 400 });
    }
}