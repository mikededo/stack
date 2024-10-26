<script lang="ts">
    import { Chip, Combobox } from '@stack/ui';

    import type { Language, Languages } from '$lib/db';

    import { CheckIcon } from 'lucide-svelte';

    type Props = {
        label: string;
        languages: Languages;
        name: string;
        placeholder: string;
        onLanguageClick: (language: Language) => void;
        disabled?: boolean;
        multiple?: boolean;
    };
    const { languages, multiple, onLanguageClick, ...externalInputProps }: Props = $props();

    let selectedLanguages = $state<(Languages[number])[]>([]);
    const inputProps = $derived({
        ...externalInputProps,
        class: 'text-ellipsis',
        // Hide the placeholder if all options are selected
        placeholder: selectedLanguages.length !== languages.length || languages.length === 0
            ? externalInputProps.placeholder
            : ''
    });

    const onClick = (language: Language) => () => {
        if (!multiple) {
            selectedLanguages = [language];
        } else {
            const updated = [...selectedLanguages];
            const iof = selectedLanguages.findIndex(({ id }) => id === language.id);
            if (iof !== -1) {
                updated.splice(iof, 1);
            } else {
                updated.push(language);
            }
            selectedLanguages = updated;
        }

        onLanguageClick(language);
    };

    const onBackspacePress = () => {
        if (selectedLanguages.length === 0) {
            return;
        }

        const updated = [...selectedLanguages];
        const removed = updated.pop();
        if (removed) {
            selectedLanguages = updated;
            onLanguageClick(removed);
        }
    };
</script>

{#snippet option(language: Language)}
    {@const selected = selectedLanguages.findIndex(({ id }) => id === language.id) !== -1}
    <button
        class="flex mb-0.5 items-center justify-between gap-1 text-sm py-1.5 px-3 hover:bg-primary-50 focus:bg-primary-50 w-full rounded-sm transition-all outline-none"
        class:bg-primary-50={selected}
        onclick={onClick(language)}
    >
        <p>
            <strong>{language.code.toUpperCase()}</strong>
            {language.name}
        </p>
        {#if selected}
            <CheckIcon class="size-4 stroke-primary" />
        {/if}
    </button>
{/snippet}

{#snippet selectedOptions()}
    <div class="flex items-center justify-between gap-1 data-[selected]:text-primary">
        {#each [...selectedLanguages] as language (language.id)}
            <Chip variant="primary" onClick={onClick(language)}>{language.name}</Chip>
        {/each}
    </div>
{/snippet}

<div class="flex gap-2 flex-col">
    <Combobox
        selectedOptions={selectedLanguages.length ? selectedOptions : undefined}
        {inputProps}
        {onBackspacePress}
    >
        {#snippet options()}
            {#each languages as language (language.id)}
                {@render option(language)}
            {/each}
        {/snippet}
    </Combobox>
</div>
