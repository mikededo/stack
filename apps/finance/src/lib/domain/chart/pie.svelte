<script lang="ts">
    import type { ChartBaseProps } from './types';

    import { Chart as ChartJS, DoughnutController } from 'chart.js';

    import Chart from './base.svelte';

    type Props = {
        data: number[];
        labels?: ChartBaseProps<'doughnut'>['data']['labels'];
    };

    ChartJS.register(DoughnutController);
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
    const chartData = $derived<ChartBaseProps<'doughnut'>['data']>({
        datasets: [
            {
                backgroundColor: COLOR,
                borderWidth: 0,
                data
            }
        ],
        labels
    });

    // Optinos are defined here as TS is not inferring the type correctly
    const options = {
        animation: { animateRotate: false, animateScale: true },
        plugins: {
            legend: {
                display: true,
                position: 'bottom'
            },
            tooltip: {
                bodyFont: {
                    family: 'Geist'
                },
                caretSize: 0,
                displayColors: false
            }
        }
    } as ChartBaseProps<'doughnut'>['options'];
</script>

<Chart data={chartData} options={options as any} type="doughnut" />
