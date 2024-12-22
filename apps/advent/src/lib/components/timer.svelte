<script lang="ts">
    type Props = {
        running: boolean;
        label?: string;
    };

    let time = $state(0);
    let intervalId: null | number = $state(null);

    const { label, running }: Props = $props();

    // Format time as mm:ss:ms
    const formatTime = (ms: number) => {
        const minutes = Math.floor(ms / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        const milliseconds = Math.floor((ms % 1000) / 10);

        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;
    };

    const startTimer = () => {
        const startTime = Date.now() - time;
        intervalId = window.setInterval(() => {
            time = Date.now() - startTime;
        }, 10);
    };

    $effect(() => {
        if (running) {
            startTimer();
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    });
</script>

<div class="flex items-center gap-2 font-bold">
    {#if label}
        <span>{label}</span>
    {/if}
    <span class="font-mono">
        {formatTime(time)}
    </span>
</div>
