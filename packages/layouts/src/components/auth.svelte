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
    <div class="l-fixed l-left-0 l-top-0 l-h-full l-w-full l-bg-background">
        <div
            class="l-absolute l-inset-0 l-h-full l-w-full background"
        ></div>
    </div>
    <div class="l-flex l-min-h-screen l-items-center">
        <div
            class="l-fixed l-inset-0 l-overflow-auto l-bg-background l-p-8 md:l-relative md:l-mx-auto md:l-w-full md:l-max-w-md md:l-rounded md:l-border"
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
