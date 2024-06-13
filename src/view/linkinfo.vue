<template>
    <div class="hostPad">
        <div id="left">
            <div class="title">设备列表</div>
            <div class="titleback"><div class="triangle"></div></div>
            <topo-list class="basicInfoListBox" @updatehost="updatehost" :nodeData="this.nodeData" :type="0"></topo-list>
        </div>
        <div class="board">
            <h2 class="h2title">流 量 监 控</h2>
            <div class="statistics">
                <div class="flow">
                    <stat-chart :flow="this.selectedHost.flow" :flowIndex="this.selectedHost.flowIndex" ref="statistics"></stat-chart>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TopoList from '@/components/TopoList.vue'
import StatChart from '@/components/StatChart.vue'

export default {
    name: 'HostMessage',
    components: {
        TopoList,
        StatChart
    },
    data(){
        return{
            selectedHost: {},
            nodeData: [
                {
                    list: 1,
                    id: '链路1',
                    ip: '下降',
                },
                {
                    list: 2,
                    id: '链路2',
                    ip: '下降'
                },
                {
                    list: 3,
                    id: '链路3',
                    ip: '升高'
                },
                {
                    list: 4,
                    id: '链路4',
                    ip: '升高'
                },
                {
                    list: 5,
                    id: '链路5',
                    ip: '下降'
                },
            ],
            allHosts: {
                1: [
                    { time: 1, flow: 10},
                    { time: 2, flow: 12},
                    { time: 3, flow: 130},
                    { time: 4, flow: 98},
                    { time: 5, flow: 115},
                    { time: 6, flow: 48},
                    { time: 7, flow: 13},
                ],
                2: [
                    { time: 1, flow: 10},
                    { time: 2, flow: 12},
                    { time: 3, flow: 66},
                    { time: 4, flow: 98},
                    { time: 5, flow: 105},
                    { time: 6, flow: 38},
                    { time: 7, flow: 13},
                ],
                3: [
                    { time: 1, flow: 10},
                    { time: 2, flow: 12},
                    { time: 3, flow: 66},
                    { time: 4, flow: 13},
                    { time: 5, flow: 25},
                    { time: 6, flow: 48},
                    { time: 7, flow: 113},
                ],
                4: [
                    { time: 1, flow: 10},
                    { time: 2, flow: 32},
                    { time: 3, flow: 26},
                    { time: 4, flow: 13},
                    { time: 5, flow: 75},
                    { time: 6, flow: 48},
                    { time: 7, flow: 113},
                ],
                5: [
                    { time: 1, flow: 10},
                    { time: 2, flow: 12},
                    { time: 3, flow: 66},
                    { time: 4, flow: 98},
                    { time: 5, flow: 95},
                    { time: 6, flow: 118},
                    { time: 7, flow: 13},
                ],
            }
        }
    },
    methods:{
        updatehost(e){
            this.selectedHost = this.allLInks['Link:'+e].basic;
            this.selectedHost.name = e;
            this.selectedHost.flow = this.timeFlow['r'+e];
            this.selectedHost.flowIndex = this.timeFlow.curIndex;
            this.$refs.statistics.reRender();
        },
    },
}
</script>

<style scoped>
.hostPad {
    width: 100vw;
    height: 100vh;
    position: relative;
    background-image: radial-gradient(#0c5a9e, #032b50);
    display: flex;
}

#left {
    margin-top: 3vh;
    width: 35vw;
    height: 72vh;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.basicInfoListBox {
    padding: 1vh;
    border: 2px dashed rgb(9, 85, 133);
    width: 75%;
    height: 60vh;
}

.titleback{
    width: 80%;
    height: 2vh;
    margin-bottom: 2vh;
    background-image: linear-gradient(to right, rgb(14, 115, 181), rgba(14, 115, 181, 1), rgba(10, 87, 139, 0.1));
}

.triangle {
    width: 0;
    height: 0;
    border-top: 0.75vh solid rgb(4, 40, 73);
    border-left: 3vh solid rgb(4, 40, 73);
    border-right: 3vh solid transparent;
    border-bottom: 0.75vh solid transparent;
}

.title {
    width: 80%;
    height: 25px;
    padding-left: 5vw;
    padding-bottom: 2vh;
    font-size: 18px;
    color: white;
}

.board{
    border: 1px solid rgb(21, 130, 221);
    position: relative;
    top: 8vh;
    right: 3vh;
    width: 65vw;
    height: 65vh;
}

.h2title{
    height: 10vh;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    border-bottom: 1px solid;
    padding: 0.5vh 0;
    text-align: center;
    border-image: linear-gradient(to right, rgb(21, 130, 221), rgb(17, 224, 253), rgb(21, 130, 221)) 1;
}

.statistics{
    float: left;
    width: 100%;
    background-color: #042647;
    height: 55vh;
}

.flow{
    margin-top: 4px;
    width: 100%;
    height: 55vh;
}
</style>