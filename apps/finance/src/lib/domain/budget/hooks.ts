import { getSupabaseClient } from '@stack/svelte-supabase';

import { createMutation } from '@tanstack/svelte-query';

import { createBudgetPlan } from '$lib/db';

import { getBudgetPlanContext } from './context.svelte';

export const useCreatePlan = () => {
  const supabase = getSupabaseClient();
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
    onSuccess: () => {
      // TODO: Update the saved plans query data
    }
  });
};
