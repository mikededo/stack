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

export type CamelCase<S extends string> = S extends `${infer T}_${infer U}`
  ? `${T}${Capitalize<CamelCase<U>>}`
  : S;
export type TrimPrefix<S extends string, Prefix extends string> = S extends `${Prefix}${infer Rest}`
  ? Rest
  : S;
export type CamelCaseProperties<T, Prefix extends string = ''> = T extends object
  ? T extends Array<infer U>
    ? Array<CamelCaseProperties<U, Prefix>>
    : {
        [K in keyof T as CamelCase<TrimPrefix<K & string, Prefix>>]: CamelCaseProperties<T[K], Prefix>;
      }
  : T;
