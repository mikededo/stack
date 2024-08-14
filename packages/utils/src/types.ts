import type { createMutation } from '@tanstack/svelte-query';

export type MutationResult<
  T extends (...args: any) => any,
  Context
> = ReturnType<
  typeof createMutation<
    Awaited<ReturnType<T>>,
    Error,
    Parameters<T>[1],
    Context
  >
>;
