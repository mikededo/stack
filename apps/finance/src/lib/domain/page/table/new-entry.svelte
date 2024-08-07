<script lang="ts">
    import { useMoneyMask } from '@mstack/actions';

    import type { Expense } from '$lib/db';

    import { Comment, Date } from './new-expense';

    type IntialState = { date: string; amount: string; comment: string };
    type Props = { disableAutofocus?: boolean; expenses: Expense[]; initialState?: IntialState };
    let { disableAutofocus, initialState, expenses }: Props = $props();
</script>

<tr class="group flex w-full items-stretch">
    <td class=" relative w-32 shrink-0 border-b border-secondary-100 p-3">
        <Date {disableAutofocus} defaultValue={initialState?.date} />
    </td>
    <td class=" w-32 shrink-0 border-b border-secondary-100 p-3">
        <input
            name="amount"
            class="w-full outline-none hover:bg-secondary-50 group-hover:bg-secondary-50"
            value={initialState?.amount}
            placeholder="€ xx.xx"
            use:useMoneyMask
        />
    </td>
    <td class=" relative h-[45px] w-full min-w-64 border-b border-secondary-100 p-3">
        <Comment {expenses} defaultValue={initialState?.comment} />
    </td>
    <td class="min-w-24 border-b border-secondary-100 p-3 md:min-w-40"> </td>
</tr>
