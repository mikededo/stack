import { getSupabaseClient } from '@stack/svelte-supabase';

import { createMutation, createQuery, useQueryClient } from '@tanstack/svelte-query';

import { Keys } from '$lib/config';
import { type BudgetPlan, type BudgetPlans, createBudgetPlan, getBudgetPlans } from '$lib/db';

import { getAllocations, getBudgetPlanContext, splitOrNumber } from './context.svelte';

export const useCreatePlan = () => {
  const supabase = getSupabaseClient();
  const queryClient = useQueryClient();
  const ctx = getBudgetPlanContext();

  return createMutation({
    mutationFn: async () => {
      const [_, budget] = ctx.budget.split('€ ');
      const data = {
        allocations: getAllocations().map(({ amount, name, percentage }) => {
          if (amount) {
            const [, value] = splitOrNumber(amount, '€ ');
            return { amount: Number(value), name, percentage: 0 };
          } else if (percentage) {
            const [, value] = splitOrNumber(percentage, '% ');
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
