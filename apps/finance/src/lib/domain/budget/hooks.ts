import { getSupabaseClient } from '@stack/svelte-supabase';

import { createMutation, createQuery, useQueryClient } from '@tanstack/svelte-query';

import { Keys } from '$lib/config';
import { type BudgetPlan, type BudgetPlans, createBudgetPlan, getBudgetPlans } from '$lib/db';

import { getBudgetPlanContext } from './context.svelte';

export const useCreatePlan = () => {
  const supabase = getSupabaseClient();
  const queryClient = useQueryClient();
  const ctx = getBudgetPlanContext();

  return createMutation({
    mutationFn: async () => {
      const [_, budget] = ctx.budget.split('€ ');
      const data = {
        allocations: ctx.allocations.map(({ amount, name, percentage }) => {
          if (amount) {
            const [, value] = amount.split('€ ');
            return { amount: Number(value), name, percentage: 0 };
          } else if (percentage) {
            const [, value] = percentage.split('% ');
            return { amount: 0, name, percentage: Number(value) };
          }

          // TODO: This is not valid
          return { amount: 0, name, percentage: 0 };
        }),
        budget: Number(budget),
        name: ctx.name
      };

      return await createBudgetPlan(supabase, data);
    },
    onSuccess: (data) => {
      queryClient.setQueryData<BudgetPlans>(Keys.BUDGET_PLANS, (prev) => {
        if (!prev || !data) {
          return prev;
        }

        // @ts-expect-error Suapabse is not capable of properly typing custom function data
        return [...prev, data as BudgetPlan];
      });
    }
  });
};

export const useSavedBudgetPlans = () => {
  const supabase = getSupabaseClient();

  return createQuery({
    queryFn: () => getBudgetPlans(supabase),
    queryKey: Keys.BUDGET_PLANS
  });
};
