<script lang="ts">
    import { type SignInData, getSupabaseClient, signInUser } from '@mstack/svelte-supabase';
    import { Button, Input } from '@mstack/ui';
    import { EMAIL_REGEX, PASSWORD_REGEX } from '@mstack/utils';

    import { createMutation } from '@tanstack/svelte-query';

    import { goto } from '$app/navigation';
    import { pathTo } from '$lib/config';

    const supabaseClient = getSupabaseClient();
    let validEmail = $state(true);
    let validPassword = $state(true);
    let errorMessage = $state<string | undefined>(undefined);

    const mutation = createMutation({
        mutationFn: async ({ email, password }: SignInData) =>
            await signInUser(supabaseClient, email, password),
        onSuccess: () => {
            goto(pathTo('app'));
        },
        onError: (e) => {
            errorMessage = e.message;
        }
    });

    const handleOnSubmit = (e: Event) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const { email, password } = Object.fromEntries(new FormData(form)) as {
            email: string;
            password: string;
        };

        validEmail = EMAIL_REGEX.test(email);
        validPassword = PASSWORD_REGEX.test(password);

        if (validEmail && validPassword) {
            $mutation.mutate({ email, password });
        }
    };
</script>

<form
    class="flex h-full w-full flex-col items-center justify-center gap-8"
    onsubmit={handleOnSubmit}
>
    <div class="flex w-full flex-col items-center gap-2">
        <h1 class="text-3xl font-bold">Finance 💰</h1>
        <p class="text-foreground/75">Log in to your account to continue</p>
        {#if errorMessage}
            <p class="text-destructive">{errorMessage}</p>
        {/if}
    </div>
    <div class="flex w-full flex-col gap-4">
        <Input
            label="Email"
            name="email"
            id="email"
            placeholder="email@example.com"
            type="email"
            invalid={!validEmail}
        />
        <Input
            label="Password"
            name="password"
            id="password"
            placeholder="Must be 8 characters long!"
            type="password"
            invalid={!validPassword}
        />
        <a class="ml-auto inline-block text-sm underline" href="/">Forgot your password?</a>
    </div>
    <Button class="h-10 w-full" type="submit">Sign in</Button>
    <hr class="mx-auto w-3/4" />
    <div class="space-y-2 text-sm">
        <p>
            Don't have an account?
            <a class="underline" href="/auth/sign-up">Sign up</a>
        </p>
    </div>
</form>
