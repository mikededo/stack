<script lang="ts">
    import { getSupabaseClient, type SignInData, signInUser } from '@stack/supabase';
    import { Button, Input } from '@stack/ui';
    import { EMAIL_REGEX, PASSWORD_REGEX } from '@stack/utils';
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
        onError: (e) => {
            errorMessage = e.message;
        },
        onSuccess: () => {
            goto(pathTo('app'), {});
        }
    });

    const onSubmit = (e: Event) => {
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

<form class="flex h-full w-full flex-col items-center justify-center gap-8" onsubmit={onSubmit}>
    <div class="flex w-full flex-col items-center gap-2">
        <h1 class="text-3xl font-bold">Finance 💰</h1>
        <p class="text-foreground/75">Log in to your account to continue</p>
        {#if errorMessage}
            <p class="text-destructive">{errorMessage}</p>
        {/if}
    </div>
    <div class="flex w-full flex-col gap-4">
        <Input
            id="email"
            invalid={!validEmail}
            label="Email"
            name="email"
            placeholder="email@example.com"
            type="email"
        />
        <Input
            id="password"
            invalid={!validPassword}
            label="Password"
            name="password"
            placeholder="Must be 8 characters long!"
            type="password"
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
