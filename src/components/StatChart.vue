<template>
    <div id="chart"></div>
</template>

<script>
import { Chart } from '@antv/g2';

export default {
    name: 'StatisticsChart',
    props: ["flow",'flowIndex'],
    data(){
        return{
            chart: {},
        }
    },
    methods: {
    },
    mounted(){
        const data = [
            { time: 1, flow: 10},
            { time: 2, flow: 12},
            { time: 3, flow: 130},
            { time: 4, flow: 98},
            { time: 5, flow: 115},
            { time: 6, flow: 48},
            { time: 7, flow: 13},
        ];

        const chart = new Chart({
            container: 'chart',
            autoFit: true,
        });

        chart.data(data);

        chart
            .interval()
            .encode('x', 'time')
            .encode('y', 'flow')
            .axis('y', {
                position: 'left',
                title: 'Flow',
                titleFill: '#fdae6b',
            });

        chart
            .line()
            .encode('x', 'time')
            .encode('y', 'flow')
            .encode('shape', 'smooth')
            .style('stroke', '#fdae6b')
            .style('lineWidth', 2)
            .scale('y', { independent: true })
            .axis('y', {
                position: 'right',
            })
            .tooltip();

        chart.render();

        this.chart = chart;
    }
}
</script>

<style scoped>
#chart {
    width: 100%;
    height: 100%;
}
</style>