<template>
    <div id="chart"></div>
</template>

<script>
import { Chart } from '@antv/g2';
import { toRaw } from 'vue';

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

            chart.data(data);

            console.log(data);

            chart
                .interval()
                .encode('x', 'time')
                .encode('y', 'flow')
                .axis('y', {
                    position: 'left',
                    title: 'Flow',
                    titleFill: '#fdae6b',
                    style: {
                        fill: '#11e9fb'
                    },
                    label: {
                        textStyle: {
                            textAlign: 'center', // 文本对齐方向，可取值为： start middle end
                            fill: 'red', // 文本的颜色
                            fontSize: '40px', // 文本大小
                            autoRotate: true // 是否需要自动旋转，默认为 true
                        }
                    },
                    grid: {
                        line: {
                            style: {
                                stroke: '#11e9fb',
                            lineWidth: 1,
                            lineDash: [ 2, 2 ]
                            }
                        }
                    }
                })
                .tooltip(false);

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
                .tooltip({
                    field: 'flow'
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