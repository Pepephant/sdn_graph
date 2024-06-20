<template>
    <div class="hostPad">
        <div id="left">
            <div class="title">设备列表</div>
            <div class="titleback"><div class="triangle"></div></div>
            <topo-list class="basicInfoListBox" @updatehost="updatehost" :nodeData="this.nodeData" :type="0"></topo-list>
        </div>
        <div class="board">
            <h2 class="h2title">攻 击 监 控</h2>
            <div class="statistics">
                <div class="flow">
                    <stat-chart :flow="this.selectedHost" :flowIndex="this.flowIndex" ref="statistics"></stat-chart>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import TopoList from '@/components/TopoList.vue'
import StatChart from '@/components/StatChart.vue'
import store from '@/store/store'

export default {
    name: 'HostMessage',
    components: {
        TopoList,
        StatChart
    },
    data(){
        return{
            selectedHost: {},
            flowIndex: 0,
            nodeData: [
            ],
            allHosts: [
            ],
            state: 0,
        }
    },
    methods:{
        updatehost(e){
            const now = store.state.time;
            if (now > 30 && now < 110) {
                this.flowIndex = 0;
                this.selectedHost = this.allHosts[e - 1];
                console.log(this.selectedHost);
                this.$refs.statistics.reRender(this.allHosts[e-1], this.flowIndex);
            }
        },
        changeState() {
            const now = store.state.time;
            console.log('now:', now);
            if (now < 30) {
                return ;
            } else if (now >= 30 && now < 120 && this.state === 0){
                this.state = 1;
                for (let i = 0; i < 1; i++) {
                    this.nodeData.shift();
                }
                this.nodeData.unshift(
                    { list: 1, id: 'h1a', ip: 'SYN Flood'},
                    { list: 2, id: 'h1a', ip: 'Bandwidth Exhaustion attack'},
                    { list: 3, id: 'h1a', ip: 'CPU and Memory Exhaustion'},
                    { list: 4, id: 'h1a', ip: 'Slowloris'},
                );
                for (let i = 0; i < this.nodeData.length; i++) {
                    this.nodeData[i].list = i + 1;
                }
            } else if (now >= 120 && this.state === 1) {
                this.state = 2;
                for (let i = 0; i < 4; i++) {
                    this.nodeData.shift();
                }
                this.nodeData.unshift(
                    { list: 1, id: 'h1a', ip: '未受攻击'},
                );
                for (let i = 0; i < this.nodeData.length; i++) {
                    this.nodeData[i].list = i + 1;
                }
            }
        }
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
    }
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