<script lang="ts">
    import { BarController, Chart as ChartJS } from 'chart.js';

    import type { ChartBaseProps } from './types';

    import Chart from './base.svelte';

    type Props = {
        data: number[];
        labels?: ChartBaseProps<'bar'>['data']['labels'];
    };

    ChartJS.register(BarController);
    const COLOR = [
        '#c7d6f6',
        '#a0bcf0',
        '#648de5',
        '#5275df',
        '#3d58d3',
        '#3447c1',
        '#2f3b9e',
        '#2b357d'
    ];

    let { data, labels }: Props = $props();
    const chartData = $derived<ChartBaseProps<'bar'>['data']>({
        datasets: [
            {
                backgroundColor: COLOR,
                borderWidth: 0,
                data
            }
        ],
        labels
    });
</script>

<Chart
    data={chartData}
    type="bar"
    options={{
        animation: { animateScale: true },
        plugins: {
            legend: { display: false },
            tooltip: {
                bodyFont: { family: 'Geist' },
                caretSize: 0,
                displayColors: false
            }
        }
    } as ChartBaseProps<'bar'>['options']}
/>
