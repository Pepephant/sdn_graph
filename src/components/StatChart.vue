<template>
    <div id="chart"></div>
</template>

<script>
import { Chart } from '@antv/g2';
import { toRaw } from 'vue';
import store from '@/store/store';

export default {
    name: 'StatisticsChart',
    props: ["flow",'flowIndex'],
    data(){
        return{
            chart: {},
        }
    },
    methods: {
        reRender(data) {
            const chart = new Chart({
                container: 'chart',
                autoFit: true,
            });

            const lower = store.state.time;
            console.log('lower: ', lower);

            let new_data = [];
            for (let i = lower; i < lower + 10 && i < 120; i++) {
                new_data.push(data[i]);
            }

            chart.data(new_data);

            chart
                .area()
                .encode('x', 'time')
                .encode('y', 'flow')
                .encode('shape', 'area')
                .style('opacity', 0.2)

            chart
                .line()
                .encode('x', 'time')
                .encode('y', 'flow')
                .encode('shape', 'line')
                .axis('y', {
                    position: 'left',
                    title: 'Flow',
                    titleFill: 'white',
                    labelFill: 'white',
                    gridFill: 'white'
                })
                .axis('x', {
                    title: 'Time',
                    titleFill: 'white',
                    labelFill: 'white'
                });

            chart.render();

            this.chart = chart;
        }
    },
    mounted(){
        const data = [
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