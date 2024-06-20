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
import store from '@/store/store'
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
            index: -1,
            selectedHost: {},
            nodeData: [
                {
                    list: 1,
                    id: '链路1(leaf1-h1a)',
                    ip: '空闲',
                },
                {
                    list: 2,
                    id: '链路2(leaf1-h1b)',
                    ip: '空闲'
                },
                {
                    list: 3,
                    id: '链路3(leaf2-h2a)',
                    ip: '空闲'
                },
                {
                    list: 4,
                    id: '链路4(leaf2-h2b)',
                    ip: '空闲'
                },
                {
                    list: 5,
                    id: '链路5(leaf3-h3a)',
                    ip: '空闲'
                },
                {
                    list: 6,
                    id: '链路6(leaf3-h3b)',
                    ip: '空闲'
                },
                {
                    list: 7,
                    id: '链路7(leaf4-h4a)',
                    ip: '空闲'
                },
                {
                    list: 8,
                    id: '链路8(leaf4-h4b)',
                    ip: '空闲'
                },
                {
                    list: 9,
                    id: '链路9(leaf5-h5a)',
                    ip: '空闲'
                },
                {
                    list: 10,
                    id: '链路10(leaf5-h5b)',
                    ip: '空闲'
                },
                {
                    list: 11,
                    id: '链路11(leaf5-h5c)',
                    ip: '空闲'
                },
                {
                    list: 12,
                    id: '链路12(spine1-leaf1)',
                    ip: '空闲'
                },
                {
                    list: 13,
                    id: '链路13(spine1-leaf2)',
                    ip: '空闲'
                },
                {
                    list: 14,
                    id: '链路14(spine1-leaf3)',
                    ip: '空闲'
                },
                {
                    list: 15,
                    id: '链路15(spine1-leaf4)',
                    ip: '空闲'
                },
                {
                    list: 16,
                    id: '链路16(spine1-leaf5)',
                    ip: '空闲'
                },
                {
                    list: 17,
                    id: '链路17(spine2-leaf1)',
                    ip: '空闲'
                },
                {
                    list: 18,
                    id: '链路18(spine2-leaf2)',
                    ip: '空闲'
                },
                {
                    list: 19,
                    id: '链路19(spine2-leaf3)',
                    ip: '空闲'
                },
                {
                    list: 20,
                    id: '链路20(spine2-leaf4)',
                    ip: '空闲'
                },
                {
                    list: 21,
                    id: '链路21(spine2-leaf5)',
                    ip: '空闲'
                },
                {
                    list: 22,
                    id: '链路22(spine3-leaf1)',
                    ip: '空闲'
                },
                {
                    list: 23,
                    id: '链路23(spine3-leaf2)',
                    ip: '空闲'
                },
                {
                    list: 24,
                    id: '链路24(spine3-leaf3)',
                    ip: '空闲'
                },
                {
                    list: 25,
                    id: '链路25(spine3-leaf4)',
                    ip: '空闲'
                },
                {
                    list: 26,
                    id: '链路26(spine3-leaf5)',
                    ip: '空闲'
                },
                {
                    list: 27,
                    id: '链路27(edge-spine1)',
                    ip: '空闲'
                },
                {
                    list: 28,
                    id: '链路28(edge-spine2)',
                    ip: '空闲'
                },
                {
                    list: 29,
                    id: '链路29(edge-spine3)',
                    ip: '空闲'
                }
            ],
            allHosts: [
                [
                    {'time': 0, 'flow': 1.02}, {'time': 1, 'flow': 1.0}, {'time': 2, 'flow': 1.05}, {'time': 3, 'flow': 1.0}, 
                    {'time': 4, 'flow': 1.03}, {'time': 5, 'flow': 1.0}, {'time': 6, 'flow': 1.02}, {'time': 7, 'flow': 1.01}, 
                    {'time': 8, 'flow': 1.04}, {'time': 9, 'flow': 1.0}, {'time': 10, 'flow': 1.02}, {'time': 11, 'flow': 1.01}, 
                    {'time': 12, 'flow': 1.02}, {'time': 13, 'flow': 1.0}, {'time': 14, 'flow': 1.02}, {'time': 15, 'flow': 1.01}, 
                    {'time': 16, 'flow': 1.03}, {'time': 17, 'flow': 1.0}, {'time': 18, 'flow': 1.02}, {'time': 19, 'flow': 1.01}, 
                    {'time': 20, 'flow': 1.05}, {'time': 21, 'flow': 1.0}, {'time': 22, 'flow': 1.02}, {'time': 23, 'flow': 1.01}, 
                    {'time': 24, 'flow': 1.03}, {'time': 25, 'flow': 1.0}, {'time': 26, 'flow': 1.02}, {'time': 27, 'flow': 1.01}, 
                    {'time': 28, 'flow': 1.02}, {'time': 29, 'flow': 1.0}, {'time': 30, 'flow': 1.04}, {'time': 31, 'flow': 2.0}, 
                    {'time': 32, 'flow': 3.4}, {'time': 33, 'flow': 3.9}, {'time': 34, 'flow': 5.0}, {'time': 35, 'flow': 8.2}, 
                    {'time': 36, 'flow': 12.0}, {'time': 37, 'flow': 14.0}, {'time': 38, 'flow': 15.0}, {'time': 39, 'flow': 19.0}, 
                    {'time': 40, 'flow': 20.0}, {'time': 41, 'flow': 55.0}, {'time': 42, 'flow': 100.0}, {'time': 43, 'flow': 95.0}, 
                    {'time': 44, 'flow': 90.0}, {'time': 45, 'flow': 95.0}, {'time': 46, 'flow': 100.0}, {'time': 47, 'flow': 105.0}, 
                    {'time': 48, 'flow': 110.0}, {'time': 49, 'flow': 115.0}, {'time': 50, 'flow': 120.0}, {'time': 51, 'flow': 125.0},
                    {'time': 52, 'flow': 130.0}, {'time': 53, 'flow': 135.0}, {'time': 54, 'flow': 140.0}, {'time': 55, 'flow': 145.0}, 
                    {'time': 56, 'flow': 150.0}, {'time': 57, 'flow': 155.0}, {'time': 58, 'flow': 160.0}, {'time': 59, 'flow': 165.0}, 
                    {'time': 60, 'flow': 150.0}, {'time': 61, 'flow': 140.0}, {'time': 62, 'flow': 130.0}, {'time': 63, 'flow': 120.0}, 
                    {'time': 64, 'flow': 110.0}, {'time': 65, 'flow': 100.0}, {'time': 66, 'flow': 110.0}, {'time': 67, 'flow': 120.0}, 
                    {'time': 68, 'flow': 90.0}, {'time': 69, 'flow': 95.0}, {'time': 70, 'flow': 98.0}, {'time': 71, 'flow': 95.0}, 
                    {'time': 72, 'flow': 100.0}, {'time': 73, 'flow': 95.0}, {'time': 74, 'flow': 90.0}, {'time': 75, 'flow': 95.0},
                    {'time': 76, 'flow': 90.0}, {'time': 77, 'flow': 85.0}, {'time': 78, 'flow': 80.0}, {'time': 79, 'flow': 48.0}, 
                    {'time': 80, 'flow': 6.0}, {'time': 81, 'flow': 5.0}, {'time': 82, 'flow': 4.5}, {'time': 83, 'flow': 4.0}, 
                    {'time': 84, 'flow': 3.5}, {'time': 85, 'flow': 3.0}, {'time': 86, 'flow': 2.5}, {'time': 87, 'flow': 2.0}, 
                    {'time': 88, 'flow': 1.8}, {'time': 89, 'flow': 1.6}, {'time': 90, 'flow': 1.4}, {'time': 91, 'flow': 1.2}, 
                    {'time': 92, 'flow': 1.1}, {'time': 93, 'flow': 1.0}, {'time': 94, 'flow': 0.9}, {'time': 95, 'flow': 0.8}, 
                    {'time': 96, 'flow': 0.7}, {'time': 97, 'flow': 0.6}, {'time': 98, 'flow': 0.5}, {'time': 99, 'flow': 0.4}, 
                    {'time': 100, 'flow': 0.35}, {'time': 101, 'flow': 0.3}, {'time': 102, 'flow': 0.25}, {'time': 103, 'flow': 0.2}, 
                    {'time': 104, 'flow': 0.15}, {'time': 105, 'flow': 0.1}, {'time': 106, 'flow': 0.08}, {'time': 107, 'flow': 0.06}, 
                    {'time': 108, 'flow': 0.04}, {'time': 109, 'flow': 0.02}, {'time': 110, 'flow': 0.01}, {'time': 111, 'flow': 1.0}, 
                    {'time': 112, 'flow': 1.0}, {'time': 113, 'flow': 1.01}, {'time': 114, 'flow': 1.0}, {'time': 115, 'flow': 1.02}, 
                    {'time': 116, 'flow': 1.0}, {'time': 117, 'flow': 1.03}, {'time': 118, 'flow': 1.0}, {'time': 119, 'flow': 1.02}, 
                    {'time': 120, 'flow': 1.0}, {'time': 121, 'flow': 1.2}, {'time': 122, 'flow': 1.1}, {'time': 123, 'flow': 1.3},
                    {'time': 124, 'flow': 1.0}, {'time': 125, 'flow': 1.1}, {'time': 126, 'flow': 1.2}, {'time': 127, 'flow': 0.7},
                    {'time': 128, 'flow': 0.9}, {'time': 129, 'flow': 1.1}, {'time': 130, 'flow': 1.0}, {'time': 131, 'flow': 1.2},
                    {'time': 132, 'flow': 1.0}, {'time': 133, 'flow': 1.1}, {'time': 134, 'flow': 1.2}, {'time': 135, 'flow': 0.7},
                    {'time': 136, 'flow': 0.9}, {'time': 137, 'flow': 1.1}, {'time': 138, 'flow': 1.0}, {'time': 139, 'flow': 1.2},
                    {'time': 140, 'flow': 0.9}, {'time': 141, 'flow': 1.3}, {'time': 143, 'flow': 1.3}, {'time': 144, 'flow': 1.2},
                ],
            ],
            state: 0
        }
    },
    methods:{
        updatehost(e){
            this.selectedHost = this.allHosts[e - 1];
            console.log(e - 1);
            console.log(this.allHosts[e - 1]);
            this.$refs.statistics.reRender(this.allHosts[e-1], this.flowIndex);
        },
        changeState() {
            const now = store.state.time;
            console.log(now);

            if (now >= 0 && this.state === 0) {
                this.state = 1;
                let edges = [1, 3, 12, 13, 17, 18, 22, 23];
                for (let i = 0; i < edges.length; i++) {
                    this.nodeData[edges[i] - 1].ip = "正常"
                }
            } else if (now >= 30 && this.state === 1) {
                this.state = 2;
                for (let i = 0; i < this.nodeData.length; i++) {
                    this.nodeData[i].ip = "空闲"
                }
                let edges_green = [3, 13, 18, 23];
                for (let i = 0; i < edges_green.length; i++) {
                    this.nodeData[edges_green[i] - 1].ip = "正常"
                }
                let edges_red = [27, 28, 29, 12, 17, 22, 1];
                for (let i = 0; i < edges_red.length; i++) {
                    this.nodeData[edges_red[i] - 1].ip = "拥塞"
                }
                let edges_orange = [9, 10, 11, 16, 21, 26];
                for (let i = 0; i < edges_orange.length; i++) {
                    this.nodeData[edges_orange[i] - 1].ip = "克隆流量检测"
                }
            } else if (now >= 70 && this.state === 2) {
                this.state = 3;
                for (let i = 0; i < this.nodeData.length; i++) {
                    this.nodeData[i].ip = "空闲"
                }
                let edges_green = [1, 3, 12, 13, 17, 18, 22, 23];
                for (let i = 0; i < edges_green.length; i++) {
                    this.nodeData[edges_green[i] - 1].ip = "正常"
                }
                let edges_orange = [9, 10, 11, 16, 21, 26, 27, 28, 29];
                for (let i = 0; i < edges_orange.length; i++) {
                    this.nodeData[edges_orange[i] - 1].ip = "克隆流量检测"
                }
            }
        },
    },
    mounted() {
        setInterval(this.changeState, 1000);
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

    overflow-x: hidden;
    overflow-y: scroll;
    scrollbar-width: none;
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