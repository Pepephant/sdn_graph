<template>
    <div class="hostPad">
        <div id="left">
            <div class="title"> 选择粒度 </div>
            <div class="titleback"><div class="triangle"></div></div>
            <div class="select">
                <div class="option" @click="this.changeGranularity(1)" 
                    :class="{'chosen': this.granularity == 1, 'unchosen': this.granularity != 1}"> 粗粒度 </div>
                <div class="option" @click="this.changeGranularity(0)" 
                    :class="{'chosen': this.granularity == 0, 'unchosen': this.granularity != 0}"> 细粒度 </div>
            </div>
            <div class="title"> 选择IP </div>
            <div class="titleback"><div class="triangle"></div></div>
            <div class="selected-ip">
                <div><input style="width: 200px; margin-right: 1.5vw; height: 3vh; background-color: aliceblue;" 
                    v-model="this.selectedip"/></div>
                <el-button type="success" @click="this.decrease()">放行</el-button>
                <el-button type="danger" @click="this.increase()">屏蔽</el-button>
            </div>
            <div class="title"> 流量类型 </div>
            <div class="titleback"><div class="triangle"></div></div>
            <mult-list class="basicInfoListBox" :nodeData="this.nodeData" :type="0"></mult-list>
        </div>

        <div class="board">
            <h2 class="h2title"> 清 洗 流 量 </h2>
            <div class="statistics">
                <div class="flow">
                    <mult-chart :flow="this.selectedHost" :flowIndex="this.flowIndex" ref="statistics"></mult-chart>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import MultList from '@/components/MultList.vue'
import MultChart from '@/components/MultChart.vue'
import StatChart from '@/components/StatChart.vue'
import store from '@/store/store'
import { ElButton } from 'element-plus'
import { now } from 'lodash'
import axios from 'axios'

export default {
    name: 'HostMessage',
    components: {
        MultList,
        StatChart,
        MultChart,
        ElButton
    },
    data(){
        return{
            granularity: 1,
            selectedHost: {},
            flowIndex: 0,
            selectedip: "",
            nodeData: [],
            allHosts: [],
            state: 0,
        }
    },
    methods:{
        updatehost() {
            this.$refs.statistics.reRender(this.allHosts, this.nodeData);
        },
        changeGranularity(e) {
            axios.get(`/get/hosts?granularity=${e}`)
                .then(response => {
                    this.allHosts = response.data.allHosts;
                })
                .catch(error => {
                    console.error(error);
                });
            },
        decrease() {
            axios.put(`/ban/hosts`, {selectedip: this.selectedip})
                .catch(error => {
                    console.error(error);
                });
        },
        increase() {
            axios.put(`/let/hosts`, {selectedip: this.selectedip})
                .catch(error => {
                    console.error(error);
                });
        }
    },
    mounted() {
        this.allHosts = this.allHosts1;
        this.nodeData = this.nodeData1;
        this.updatehost();
        setInterval(this.changeState, 1000);
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
    height: 50vh;

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

.select {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    padding: 1vh;
    border: 2px dashed rgb(9, 85, 133);
    width: 75%;
    height: 6vh;
    margin-bottom: 6vh;
}

.option {
    height: 100%;
    width: 50%;

    display: flex;
    justify-content: center;
    align-items: center;
}

.chosen {
    background-color: rgb(4, 75, 127);
    color: rgb(250,250,210);
}

.selected-ip {
    height: 5vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 6vh;
}

input:focus{
    outline: none;
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