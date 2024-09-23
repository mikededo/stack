import { getSupabaseClient } from '@stack/supabase';

import {
  createMutation,
  createQuery,
  useQueryClient
} from '@tanstack/svelte-query';

import { Keys } from '$lib/config';
import {
  type BudgetPlan,
  type BudgetPlans,
  deleteBudgetPlan,
  getBudgetPlans,
  upsertBudgetPlan
} from '$lib/db';

import {
  getAllocations,
  getBudgetPlanContext,
  splitOrNumber
} from './context.svelte';

export const useUpsertPlan = () => {
  const supabase = getSupabaseClient();
  const queryClient = useQueryClient();
  const ctx = getBudgetPlanContext();

  return createMutation({
    mutationFn: async () => {
      const [_, budget] = ctx.budget.split('€ ');
      const data = {
        allocations: getAllocations().map(
          ({ amount, id, name, percentage }) => {
            const validId = typeof id === 'number' ? id : null;

            if (amount) {
              const [, value] = splitOrNumber(amount, '€ ');
              return {
                amount: Number(value),
                id: validId,
                name,
                percentage: 0
              };
            } else if (percentage) {
              const [, value] = splitOrNumber(percentage, '% ');
              return {
                amount: 0,
                id: validId,
                name,
                percentage: Number(value)
              };
            }

            return { amount: 0, id: null, name, percentage: 0 }; // This should never happen
          }
        ),
        budget: Number(budget),
        id: ctx.id ?? null,
        name: ctx.name
      };

      return await upsertBudgetPlan(supabase, data);
    },
    // Pass to the context if the plan is being created or updated
    onMutate: () => ctx.id,
    onSuccess: (data, _, prevId) => {
      queryClient.setQueryData<BudgetPlans>(Keys.BUDGET_PLANS, (prev) => {
        if (!prev || !data) {
          return prev;
        }

        if (!prevId) {
          // @ts-expect-error Suapabse is not capable of properly typing custom function data
          return [...prev, data as BudgetPlan];
        } else {
          return prev.map(plan =>
            prevId === plan.id ? { ...plan, ...data } : plan
          );
        }
      });
    }
  });
};

export const useDeletePlan = () => {
  const supabase = getSupabaseClient();
  const queryClient = useQueryClient();

  return createMutation({
    mutationFn: async (id: number) => await deleteBudgetPlan(supabase, id),
    onSuccess: (_, id) => {
      queryClient.setQueryData<BudgetPlans>(Keys.BUDGET_PLANS, (prev) => {
        if (!prev) {
          return prev;
        }

        if (prev.length === 1) {
          return [];
        }

        return prev.filter(({ id: current }) => current !== id);
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
