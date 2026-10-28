'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { ExpenseFormData } from './schema';
import { createExpenseApi, updateExpenseApi, type UpdateExpenseData } from './api-client';
// Mutation lewat TanStack Query: status pending/error dikelola library,
// dan cache 'expenses' ditandai basi setelah data berubah.
export function useCreateExpense() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: ExpenseFormData) => createExpenseApi(data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['expenses'] }),
    });
}
export function useUpdateExpense(id: string) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: UpdateExpenseData) => updateExpenseApi(id, data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['expenses'] }),
    });
}