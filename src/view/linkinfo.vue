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
import axios from 'axios'
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
            ],
            allHosts: [
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

        axios.get('/switches')
        .then(response => {
            this.nodeData = response.data;
        })
        .catch(error => {
            console.error("There was an error fetching the node data:", error);
        });

        axios.get('/paths')
        .then(response => {
            this.allHosts = response.data;
        })
        .catch(error => {
            console.error("There was an error fetching the node data:", error);
        });
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