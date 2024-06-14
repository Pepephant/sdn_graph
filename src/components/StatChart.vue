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

            let new_datas = [];
            const now = new Date();

            for (let i = lower, j = 10; i < lower + 10 && i < 144; i++, j--) {
                const new_flow = data[i].flow;
                const time = new Date(now.getTime() - j * 1000);
                const hours = String(time.getHours()).padStart(2, '0');
                const minutes = String(time.getMinutes()).padStart(2, '0');
                const seconds = String(time.getSeconds()).padStart(2, '0');
                const new_time = `${hours}:${minutes}:${seconds}`;
                let new_data = { 'time': new_time, 'flow': new_flow};
                new_datas.push(new_data);
            }

            chart.data(new_datas);

            console.log('new_datas', new_datas);

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
                    labelFill: 'white',
                    labelTransform: 'rotate(30deg)'
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