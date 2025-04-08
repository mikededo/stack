<script lang="ts">
    import type { Snippet } from 'svelte';

    type Props = { appName: string; children: Snippet };
    const { appName, children }: Props = $props();
</script>

<svelte:head>
    <title>Authentication | {appName} · stack</title>
    <meta content="Sign in or sign up to access your {appName}  account" name="description" />
    <meta content="noindex, nofollow" name="robots" />
    <meta content="#ffffff" name="theme-color" />
    <meta content="width=device-width, initial-scale=1" name="viewport" />
    <meta content="Lang Hub" name="apple-mobile-web-app-title" />
    <meta content="Lang Hub" name="application-name" />
    <meta content="website" property="og:type" />
    <meta content="TBD" property="og:url" />
    <meta content="Authentication | {appName} · stack" property="og:title" />
    <meta content="Sign in or sign up to access your {appName} account" property="og:description" />
    <meta content="TBD" property="og:image" />
    <meta content="1200" property="og:image:width" />
    <meta content="630" property="og:image:height" />
</svelte:head>

<main>
    <div class="fixed left-0 top-0 h-full w-full bg-background">
        <div
            class="absolute inset-0 h-full w-full background"
        ></div>
    </div>
    <div class="flex min-h-screen justify-center items-center">
        <div
            class="fixed inset-0 overflow-auto bg-background p-8 md:relative md:inset-unset md:mx-auto md:w-full md:max-w-md md:rounded md:border"
        >
            {@render children()}
        </div>
    </div>
</main>

<style>
.background {
    background: radial-gradient(#e7e7e7 1px, transparent 1px);
  background-size: 16px 16px;
}

@media (prefers-color-shceme: dark) {
  .background {
    background: radial-gradient(#333 1px, transparent 1px);
  }
}
</style>
