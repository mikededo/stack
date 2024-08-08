<script lang="ts">
    import type { Snippet } from 'svelte';

    type Props = { children: Snippet };
    let { children }: Props = $props();
</script>

<svelte:head>
    <title>Authentication | Finance · MStack</title>
    <meta content="Sign in or sign up to access your Finance account" name="description" />
    <meta content="noindex, nofollow" name="robots" />
    <meta content="#ffffff" name="theme-color" />
    <meta content="width=device-width, initial-scale=1" name="viewport" />
    <meta content="Lang Hub" name="apple-mobile-web-app-title" />
    <meta content="Lang Hub" name="application-name" />
    <meta content="website" property="og:type" />
    <meta content="TBD" property="og:url" />
    <meta content="Authentication | Finance · MStack" property="og:title" />
    <meta content="Sign in or sign up to access your Finance account" property="og:description" />
    <meta content="TBD" property="og:image" />
    <meta content="1200" property="og:image:width" />
    <meta content="630" property="og:image:height" />
</svelte:head>

<main>
    <div class="fixed left-0 top-0 h-full w-full bg-background">
        <div
            class="absolute inset-0 h-full w-full bg-[radial-gradient(#e7e7e7_1px,transparent_1px)] [background-size:16px_16px] dark:bg-[radial-gradient(#333333_1px,transparent_1px)]"
        ></div>
    </div>
    <div class="flex min-h-screen items-center">
        <div
            class="fixed inset-0 overflow-auto bg-background p-8 md:relative md:mx-auto md:w-full md:max-w-md md:rounded md:border"
        >
            {@render children()}
        </div>
    </div>
</main>
