<script lang="ts">
    import type { ChartType, DefaultDataPoint } from 'chart.js';

    import type { ChartBaseProps } from './types';

    import {
        ArcElement,
        BarElement,
        CategoryScale,
        Chart as ChartJS,
        Legend,
        LinearScale,
        Title,
        Tooltip
    } from 'chart.js';
    import { onMount } from 'svelte';

    interface Props<
        TType extends ChartType = ChartType,
        TData = DefaultDataPoint<TType>,
        TLabel = unknown
    > extends ChartBaseProps<TType, TData, TLabel> {
        chart?: ChartJS<TType, TData, TLabel> | null;
    }

    ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, BarElement);

    let {
        chart,
        data = { datasets: [] },
        options,
        plugins,
        type: chartType,
        updateMode = 'show',
        ...rest
    }: Props = $props();

    let canvasRef = $state<HTMLCanvasElement | undefined>();
    let chartState = $state<ChartJS | undefined>();

    onMount(() => {
        if (!canvasRef) {
            return;
        }

        chartState = new ChartJS(canvasRef, {
            data,
            options,
            plugins,
            type: chartType
        });

        return () => {
            chart?.destroy();
            chart = null;
        };
    });

    $effect(() => {
        if (!chartState) {
            return;
        }

        chartState.data = data;
        if (chartState.options) {
            Object.assign(chartState.options, options);
        }
        chartState.update(updateMode);
    });
</script>

<canvas bind:this={canvasRef} {...rest}></canvas>
