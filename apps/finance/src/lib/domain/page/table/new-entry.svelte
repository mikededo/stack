<script lang="ts">
    import { useActions, useAutofocus } from '@mstack/actions';

    import type { Action } from 'svelte/action';

    const useDateMask: Action<HTMLElement, undefined> = (node) => {
        if (!(node instanceof HTMLInputElement)) {
            return;
        }

        node.addEventListener('keydown', (event) => {
            if (!event.target || event.key === 'Backspace') {
                return;
            }

            const input = event.target as HTMLInputElement;
            const value = input.value;

            if (value.length === 2 || value.length === 5) {
                input.value = value + '/';
            }

            const isValidDate = (date: string) => {
                // dd/mm/yyyy
                if (date.length === 10) {
                    const [day, month, year] = date.split('/');
                    return day.length === 2 && month.length === 2 && year.length === 4;
                }
                return true;
            };

            // Check if date is invalid and add a aria-invalid attribute
            input.setAttribute('aria-invalid', `${!isValidDate(input.value)}`);
        });
    };
</script>

<tr class="flex w-full items-stretch">
    <td class="relative w-32 shrink-0 border-b border-secondary-100 p-3">
        <input
            name="date"
            class="invalid:color-destructive-500 w-full outline-none"
            placeholder="dd/mm/yyyy"
            use:useActions={[useAutofocus, useDateMask]}
        />
    </td>
    <td class="w-32 shrink-0 border-b border-secondary-100 p-3">
        <input name="amount" class="w-full outline-none" placeholder="€ xx.xx" />
    </td>
    <td class="w-full min-w-64 border-b border-secondary-100 p-3">
        <input
            name="comment"
            class="w-full outline-none"
            placeholder="What was this expense for...?"
        />
    </td>
    <td class="border-b border-secondary-100 p-3 sm:min-w-24 md:min-w-40"> </td>
</tr>
