<template>
    <div id="view">
        <div id="left-charts">
            <div class="left-block">
                <div class="title">设备列表</div>
                <div class="titleback"><div class="triangle"></div></div>
                <div id="device-chart" ref="device_chart">
                    <topo-list :nodeData="this.nodeData" :type="1"></topo-list>
                </div>
                <div class="title">链路状态</div>
                <div class="titleback"><div class="triangle"></div></div>
                <div id="device-chart" ref="device_chart">
                    <ul class="basicInfoList">
                        <li>
                            <div class="colorBlock"></div>
                            <span class="attrName">拥塞</span>
                        </li>
                        <li>
                            <div class="colorBlock"></div>
                            <span class="attrName">空闲</span>
                        </li>
                        <li>
                            <div class="colorBlock"></div>
                            <span class="attrName">正常</span>
                        </li>
                        <li>
                            <div class="colorBlock"></div>
                            <span class="attrName">克隆流量检测</span>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- <div class="left-block"> 待加入 </div> -->
        </div>
        <net-visual id="right-graph"></net-visual>
    </div>
</template>

<script>
import axios from 'axios'
import store from '@/store/store'
import NetVisual from '@/components/NetVisual.vue'
import TopoList from '@/components/TopoList.vue'
import { ElMessageBox } from 'element-plus'

export default {
    data(){
        return{
            nodeData: [
            ]
        }
    },
    components: { TopoList, NetVisual },
    methods: {
        changeState() {
            axios.get("/get/attacked")
                .then( response=> {
                    if (response.data.state === "attacked") {
                        ElMessageBox.alert(
                            'h1a、h1b受到攻击',
                            '攻击提示',
                            {
                                type: 'error',
                                confirmButtonText: '确定',
                                callback: action => {
                                    console.log(action)
                                }
                            }
                        )
                    } else if (response.data.state === "relieved") {
                        ElMessageBox.alert(
                            'h1a、h1b攻击解除',
                            '攻击解除提示',
                            {
                                type: 'success',
                                confirmButtonText: '确定',
                                callback: action => {
                                    console.log(action)
                                }
                            }
                        )
                    }
                })
        }
    },
    mounted() {
        this.$refs.device_chart.scrollTop = 0;
        setInterval(this.changeState, 1000);

        axios.get('/get/devices')
        .then(response => {
            this.nodeData = response.data;
        })
        .catch(error => {
            console.error("There was an error fetching the node data:", error);
        });
    },
}
</script>

<style scoped>

#view {
    height: 90vh;
    width: 100%;
    display: flex;
    background-image: radial-gradient(#0c5a9e, #032b50);
}

#left-charts {
    height: 100%;
    width: 35%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-around;
}

#device-chart {
    display: flex;
    flex-direction: column;
    height: 54vh;
    width: 80%;
    overflow-x: hidden;
    overflow-y: scroll;
    scrollbar-width: none;
    margin-bottom: 7vh;
}

#device-chart::-webkit-scrollbar {
    display: none;
}

.left-block {
    height: 75vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: white;
}

.title {
    width: 80%;
    height: 25px;
    padding-left: 5vw;
    padding-bottom: 1vh;
    font-size: 18px;
    color: white;
}


.titleback{
    width: 80%;
    height: 2vh;
    margin-bottom: 1vh;
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

#right-graph {
    width: 65%;
    height: 100vh;
}

.basicInfoList li{
    width: 100%;
    height: 4vh;
    list-style: none;
    position: relative;

    display: flex;
}

.basicInfoList li:hover{
    background-color: rgb(5, 77, 128);
    cursor: pointer;
}

.attrName {
    width: 50%;
    display: block;
    height: 4vh;
    color: whitesmoke;
    font-size: 15px;
    display: flex;
    justify-content: start;
    align-items: center;
    margin-left: 1vw;
}

.attrValue {
    width: 40%;
    display: block;
    height: 4vh;
    color: rgb(18, 235, 241);
    display: flex;
    justify-content: start;
    align-items: center;
}

.colorBlock{
    width: 0.9vh;
    height: 0.9vh;
    margin-left: 1.6vw;
    margin-top: 1.6vh
}

.basicInfoList li:nth-child(1) .colorBlock{
    background-color: red;
}

.basicInfoList li:nth-child(2) .colorBlock{
    background-color: rgb(43,124,233);
}
.basicInfoList li:nth-child(3) .colorBlock{
    background-color: green;
}
.basicInfoList li:nth-child(4) .colorBlock{
    background-color: orange;
}

</style>