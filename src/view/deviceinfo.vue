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
                { list: 1, id: 'h1a', ip: '未受攻击' },
                { list: 2, id: 'h1b', ip: '未受攻击' },
                { list: 3, id: "h2a", ip: '未受攻击' },
                { list: 4, id: "h2b", ip: '未受攻击' },
                { list: 5, id: "h3a", ip: '未受攻击' },
                { list: 6, id: "h3b", ip: '未受攻击' },
                { list: 7, id: "h4a", ip: '未受攻击' },
                { list: 8, id: "h4b", ip: '未受攻击' },
                { list: 9, id: "h5a", ip: '未受攻击' },
                { list: 10, id: "h5b", ip: '未受攻击' },
                { list: 11, id: "h5c", ip: '未受攻击' },
                { list: 12, id: "leaf1", ip: '未受攻击' },
                { list: 13, id: "leaf2", ip: '未受攻击' },
                { list: 14, id: "leaf3", ip: '未受攻击' },
                { list: 15, id: "leaf4", ip: '未受攻击' },
                { list: 16, id: "leaf5", ip: '未受攻击' },
                { list: 17, id: "spine1", ip: '未受攻击' },
                { list: 18, id: "spine2", ip: '未受攻击' },
                { list: 19, id: "spine3", ip: '未受攻击' },
                { list: 20, id: "edge", ip: '未受攻击' },
                { list: 21, id: "h6", ip: '未受攻击' },
                { list: 22, id: "h7", ip: '未受攻击' },
                { list: 23, id: "h8", ip: '未受攻击' },
            ],
            allHosts: [
                [
                    {'time': 30, 'flow': 2.0}, {'time': 31, 'flow': 2.5}, {'time': 32, 'flow': 3.0}, {'time': 33, 'flow': 3.5}, 
                    {'time': 34, 'flow': 4.0}, {'time': 35, 'flow': 4.5}, {'time': 36, 'flow': 5.0}, {'time': 37, 'flow': 5.5}, 
                    {'time': 38, 'flow': 6.0}, {'time': 39, 'flow': 6.5}, {'time': 40, 'flow': 7.0}, {'time': 41, 'flow': 7.5}, 
                    {'time': 42, 'flow': 8.0}, {'time': 43, 'flow': 8.5}, {'time': 44, 'flow': 9.0}, {'time': 45, 'flow': 9.5}, 
                    {'time': 46, 'flow': 10.0}, {'time': 47, 'flow': 10.5}, {'time': 48, 'flow': 11.0}, {'time': 49, 'flow': 11.5}, 
                    {'time': 50, 'flow': 12.0}, {'time': 51, 'flow': 12.5}, {'time': 52, 'flow': 13.0}, {'time': 53, 'flow': 13.5}, 
                    {'time': 54, 'flow': 14.0}, {'time': 55, 'flow': 14.5}, {'time': 56, 'flow': 15.0}, {'time': 57, 'flow': 15.5}, 
                    {'time': 58, 'flow': 16.0}, {'time': 59, 'flow': 16.5}, {'time': 60, 'flow': 15.0}, {'time': 61, 'flow': 15.1}, 
                    {'time': 62, 'flow': 14.9}, {'time': 63, 'flow': 15.2}, {'time': 64, 'flow': 14.8}, {'time': 65, 'flow': 15.05}, 
                    {'time': 66, 'flow': 14.95}, {'time': 67, 'flow': 15.15}, {'time': 68, 'flow': 14.85}, {'time': 69, 'flow': 15.0}, 
                    {'time': 70, 'flow': 15.1}, {'time': 71, 'flow': 14.9}, {'time': 72, 'flow': 15.2}, {'time': 73, 'flow': 14.8}, 
                    {'time': 74, 'flow': 15.05}, {'time': 75, 'flow': 14.95}, {'time': 76, 'flow': 15.15}, {'time': 77, 'flow': 14.85}, 
                    {'time': 78, 'flow': 15.0}, {'time': 79, 'flow': 15.1}, {'time': 80, 'flow': 14.9}, {'time': 81, 'flow': 15.2}, 
                    {'time': 82, 'flow': 14.8}, {'time': 83, 'flow': 15.05}, {'time': 84, 'flow': 14.95}, {'time': 85, 'flow': 15.15}, 
                    {'time': 86, 'flow': 14.85}, {'time': 87, 'flow': 15.0}, {'time': 88, 'flow': 15.1}, {'time': 89, 'flow': 14.9}, 
                    {'time': 90, 'flow': 15.2}, {'time': 91, 'flow': 14.8}, {'time': 92, 'flow': 15.05}, {'time': 93, 'flow': 14.95}, 
                    {'time': 94, 'flow': 15.15}, {'time': 95, 'flow': 14.85}, {'time': 96, 'flow': 15.0}, {'time': 97, 'flow': 15.1}, 
                    {'time': 98, 'flow': 14.9}, {'time': 99, 'flow': 15.2}, {'time': 100, 'flow': 14.8}, {'time': 101, 'flow': 15.05}, 
                    {'time': 102, 'flow': 14.95}, {'time': 103, 'flow': 15.15}, {'time': 104, 'flow': 14.85}, {'time': 105, 'flow': 15.0}, 
                    {'time': 106, 'flow': 15.1}, {'time': 107, 'flow': 14.9}, {'time': 108, 'flow': 15.2}, {'time': 109, 'flow': 14.8}, 
                    {'time': 110, 'flow': 15.05}, {'time': 111, 'flow': 14.95}, {'time': 112, 'flow': 15.15}, {'time': 113, 'flow': 14.85}, 
                    {'time': 114, 'flow': 15.0}, {'time': 115, 'flow': 15.1}, {'time': 116, 'flow': 14.9}, {'time': 117, 'flow': 15.2}, 
                    {'time': 118, 'flow': 14.8}, {'time': 119, 'flow': 15.05}, {'time': 120, 'flow': 14.95}, {'time': 121, 'flow': 14.0},
                    {'time': 122, 'flow': 15.25}, {'time': 123, 'flow': 14.75}, {'time': 124, 'flow': 16.25}, {'time': 125, 'flow': 13.75}, 
                    {'time': 126, 'flow': 15.0}, {'time': 127, 'flow': 15.5}, {'time': 128, 'flow': 14.5}, {'time': 129, 'flow': 16.0}, 
                    {'time': 130, 'flow': 14.0}, {'time': 131, 'flow': 15.25}, {'time': 132, 'flow': 14.75}, {'time': 133, 'flow': 16.25},
                    {'time': 134, 'flow': 14.75}, {'time': 135, 'flow': 16.25}, {'time': 136, 'flow': 13.75}, {'time': 137, 'flow': 15.0}, 
                    {'time': 138, 'flow': 15.5}, {'time': 139, 'flow': 14.5}, {'time': 140, 'flow': 16.0}, {'time': 141, 'flow': 14.0}, 
                    {'time': 142, 'flow': 15.25}, {'time': 143, 'flow': 14.75}, {'time': 144, 'flow': 16.25}, {'time': 145, 'flow': 13.75}, 
                    {'time': 146, 'flow': 15.0}, {'time': 147, 'flow': 15.5}, {'time': 148, 'flow': 14.5}, {'time': 149, 'flow': 16.0},  
                ],
                [
                    {'time': 30, 'flow': 4.0}, {'time': 31, 'flow': 5.0}, {'time': 32, 'flow': 6.0}, {'time': 33, 'flow': 7.0}, 
                    {'time': 34, 'flow': 8.0}, {'time': 35, 'flow': 9.0}, {'time': 36, 'flow': 10.0}, {'time': 37, 'flow': 11.0}, 
                    {'time': 38, 'flow': 12.0}, {'time': 39, 'flow': 13.0}, {'time': 40, 'flow': 14.0}, {'time': 41, 'flow': 15.0}, 
                    {'time': 42, 'flow': 16.0}, {'time': 43, 'flow': 17.0}, {'time': 44, 'flow': 18.0}, {'time': 45, 'flow': 19.0}, 
                    {'time': 46, 'flow': 20.0}, {'time': 47, 'flow': 21.0}, {'time': 48, 'flow': 22.0}, {'time': 49, 'flow': 23.0}, 
                    {'time': 50, 'flow': 24.0}, {'time': 51, 'flow': 25.0}, {'time': 52, 'flow': 26.0}, {'time': 53, 'flow': 27.0}, 
                    {'time': 54, 'flow': 28.0}, {'time': 55, 'flow': 29.0}, {'time': 56, 'flow': 30.0}, {'time': 57, 'flow': 31.0}, 
                    {'time': 58, 'flow': 32.0}, {'time': 59, 'flow': 33.0}, {'time': 60, 'flow': 30.0}, {'time': 61, 'flow': 30.2}, 
                    {'time': 62, 'flow': 29.8}, {'time': 63, 'flow': 30.4}, {'time': 64, 'flow': 29.6}, {'time': 65, 'flow': 30.1}, 
                    {'time': 66, 'flow': 29.9}, {'time': 67, 'flow': 30.3}, {'time': 68, 'flow': 29.7}, {'time': 69, 'flow': 30.0}, 
                    {'time': 70, 'flow': 30.2}, {'time': 71, 'flow': 29.8}, {'time': 72, 'flow': 30.4}, {'time': 73, 'flow': 29.6}, 
                    {'time': 74, 'flow': 30.1}, {'time': 75, 'flow': 29.9}, {'time': 76, 'flow': 30.3}, {'time': 77, 'flow': 29.7},
                    {'time': 78, 'flow': 30.0}, {'time': 79, 'flow': 30.2}, {'time': 80, 'flow': 29.8}, {'time': 81, 'flow': 30.4}, 
                    {'time': 82, 'flow': 29.6}, {'time': 83, 'flow': 30.1}, {'time': 84, 'flow': 29.9}, {'time': 85, 'flow': 30.3}, 
                    {'time': 86, 'flow': 29.7}, {'time': 87, 'flow': 30.0}, {'time': 88, 'flow': 30.2}, {'time': 89, 'flow': 29.8}, 
                    {'time': 90, 'flow': 30.4}, {'time': 91, 'flow': 29.6}, {'time': 92, 'flow': 30.1}, {'time': 93, 'flow': 29.9}, 
                    {'time': 94, 'flow': 30.3}, {'time': 95, 'flow': 29.7}, {'time': 96, 'flow': 30.0}, {'time': 97, 'flow': 30.2}, 
                    {'time': 98, 'flow': 29.8}, {'time': 99, 'flow': 30.4}, {'time': 100, 'flow': 29.6}, {'time': 101, 'flow': 30.1}, 
                    {'time': 102, 'flow': 29.9}, {'time': 103, 'flow': 30.3}, {'time': 104, 'flow': 29.7}, {'time': 105, 'flow': 30.0}, 
                    {'time': 106, 'flow': 30.2}, {'time': 107, 'flow': 29.8}, {'time': 108, 'flow': 30.4}, {'time': 109, 'flow': 29.6}, 
                    {'time': 110, 'flow': 30.1}, {'time': 111, 'flow': 29.9}, {'time': 112, 'flow': 30.3}, {'time': 113, 'flow': 29.7}, 
                    {'time': 114, 'flow': 30.0}, {'time': 115, 'flow': 30.2}, {'time': 116, 'flow': 29.8}, {'time': 117, 'flow': 30.4}, 
                    {'time': 118, 'flow': 29.6}, {'time': 119, 'flow': 30.1}, {'time': 120, 'flow': 29.9}
                ],
                [
                    {'time': 30, 'flow': 10.0}, {'time': 31, 'flow': 12.5}, {'time': 32, 'flow': 15.0}, {'time': 33, 'flow': 17.5}, 
                    {'time': 34, 'flow': 20.0}, {'time': 35, 'flow': 22.5}, {'time': 36, 'flow': 25.0}, {'time': 37, 'flow': 27.5}, 
                    {'time': 38, 'flow': 30.0}, {'time': 39, 'flow': 32.5}, {'time': 40, 'flow': 35.0}, {'time': 41, 'flow': 37.5}, 
                    {'time': 42, 'flow': 40.0}, {'time': 43, 'flow': 42.5}, {'time': 44, 'flow': 45.0}, {'time': 45, 'flow': 47.5}, 
                    {'time': 46, 'flow': 50.0}, {'time': 47, 'flow': 52.5}, {'time': 48, 'flow': 55.0}, {'time': 49, 'flow': 57.5}, 
                    {'time': 50, 'flow': 60.0}, {'time': 51, 'flow': 62.5}, {'time': 52, 'flow': 65.0}, {'time': 53, 'flow': 67.5}, 
                    {'time': 54, 'flow': 70.0}, {'time': 55, 'flow': 72.5}, {'time': 56, 'flow': 75.0}, {'time': 57, 'flow': 77.5}, 
                    {'time': 58, 'flow': 80.0}, {'time': 59, 'flow': 82.5}, {'time': 60, 'flow': 75.0}, {'time': 61, 'flow': 75.5}, 
                    {'time': 62, 'flow': 74.5}, {'time': 63, 'flow': 76.0}, {'time': 64, 'flow': 74.0}, {'time': 65, 'flow': 75.25}, 
                    {'time': 66, 'flow': 74.75}, {'time': 67, 'flow': 76.25}, {'time': 68, 'flow': 73.75}, {'time': 69, 'flow': 75.0}, 
                    {'time': 70, 'flow': 75.5}, {'time': 71, 'flow': 74.5}, {'time': 72, 'flow': 76.0}, {'time': 73, 'flow': 74.0}, 
                    {'time': 74, 'flow': 75.25}, {'time': 75, 'flow': 74.75}, {'time': 76, 'flow': 76.25}, {'time': 77, 'flow': 73.75}, 
                    {'time': 78, 'flow': 75.0}, {'time': 79, 'flow': 75.5}, {'time': 80, 'flow': 74.5}, {'time': 81, 'flow': 76.0}, 
                    {'time': 82, 'flow': 74.0}, {'time': 83, 'flow': 75.25}, {'time': 84, 'flow': 74.75}, {'time': 85, 'flow': 76.25}, 
                    {'time': 86, 'flow': 73.75}, {'time': 87, 'flow': 75.0}, {'time': 88, 'flow': 75.5}, {'time': 89, 'flow': 74.5}, 
                    {'time': 90, 'flow': 76.0}, {'time': 91, 'flow': 74.0}, {'time': 92, 'flow': 75.25}, {'time': 93, 'flow': 74.75}, 
                    {'time': 94, 'flow': 76.25}, {'time': 95, 'flow': 73.75}, {'time': 96, 'flow': 75.0}, {'time': 97, 'flow': 75.5}, 
                    {'time': 98, 'flow': 74.5}, {'time': 99, 'flow': 76.0}, {'time': 100, 'flow': 74.0}, {'time': 101, 'flow': 75.25}, 
                    {'time': 102, 'flow': 74.75}, {'time': 103, 'flow': 76.25}, {'time': 104, 'flow': 73.75}, {'time': 105, 'flow': 75.0}, 
                    {'time': 106, 'flow': 75.5}, {'time': 107, 'flow': 74.5}, {'time': 108, 'flow': 76.0}, {'time': 109, 'flow': 74.0}, 
                    {'time': 110, 'flow': 75.25}, {'time': 111, 'flow': 74.75}, {'time': 112, 'flow': 76.25}, {'time': 113, 'flow': 73.75}, 
                    {'time': 114, 'flow': 75.0}, {'time': 115, 'flow': 75.5}, {'time': 116, 'flow': 74.5}, {'time': 117, 'flow': 76.0}, 
                    {'time': 118, 'flow': 74.0}, {'time': 119, 'flow': 75.25}, {'time': 120, 'flow': 74.75}, {'time': 121, 'flow': 74.0},
                    {'time': 122, 'flow': 75.25}, {'time': 123, 'flow': 74.75}, {'time': 124, 'flow': 76.25}, {'time': 125, 'flow': 73.75}, 
                    {'time': 126, 'flow': 75.0}, {'time': 127, 'flow': 75.5}, {'time': 128, 'flow': 74.5}, {'time': 129, 'flow': 76.0}, 
                    {'time': 130, 'flow': 74.0}, {'time': 131, 'flow': 75.25}, {'time': 132, 'flow': 74.75}, {'time': 133, 'flow': 76.25},
                    {'time': 134, 'flow': 74.75}, {'time': 135, 'flow': 76.25}, {'time': 136, 'flow': 73.75}, {'time': 137, 'flow': 75.0}, 
                    {'time': 138, 'flow': 75.5}, {'time': 139, 'flow': 74.5}, {'time': 140, 'flow': 76.0}, {'time': 141, 'flow': 74.0}, 
                    {'time': 142, 'flow': 75.25}, {'time': 143, 'flow': 74.75}, {'time': 144, 'flow': 76.25}, {'time': 145, 'flow': 73.75}, 
                    {'time': 146, 'flow': 75.0}, {'time': 147, 'flow': 75.5}, {'time': 148, 'flow': 74.5}, {'time': 149, 'flow': 76.0},  
                ],
                [
                    {'time': 30, 'flow': 4.0}, {'time': 31, 'flow': 5.0}, {'time': 32, 'flow': 6.0}, {'time': 33, 'flow': 7.0}, 
                    {'time': 34, 'flow': 8.0}, {'time': 35, 'flow': 9.0}, {'time': 36, 'flow': 10.0}, {'time': 37, 'flow': 11.0}, 
                    {'time': 38, 'flow': 12.0}, {'time': 39, 'flow': 13.0}, {'time': 40, 'flow': 14.0}, {'time': 41, 'flow': 15.0}, 
                    {'time': 42, 'flow': 16.0}, {'time': 43, 'flow': 17.0}, {'time': 44, 'flow': 18.0}, {'time': 45, 'flow': 19.0}, 
                    {'time': 46, 'flow': 20.0}, {'time': 47, 'flow': 21.0}, {'time': 48, 'flow': 22.0}, {'time': 49, 'flow': 23.0}, 
                    {'time': 50, 'flow': 24.0}, {'time': 51, 'flow': 25.0}, {'time': 52, 'flow': 26.0}, {'time': 53, 'flow': 27.0}, 
                    {'time': 54, 'flow': 28.0}, {'time': 55, 'flow': 29.0}, {'time': 56, 'flow': 30.0}, {'time': 57, 'flow': 31.0}, 
                    {'time': 58, 'flow': 32.0}, {'time': 59, 'flow': 33.0}, {'time': 60, 'flow': 30.0}, {'time': 61, 'flow': 30.1}, 
                    {'time': 62, 'flow': 29.9}, {'time': 63, 'flow': 30.2}, {'time': 64, 'flow': 29.8}, {'time': 65, 'flow': 30.05}, 
                    {'time': 66, 'flow': 29.95}, {'time': 67, 'flow': 30.15}, {'time': 68, 'flow': 29.85}, {'time': 69, 'flow': 30.0}, 
                    {'time': 70, 'flow': 30.1}, {'time': 71, 'flow': 29.9}, {'time': 72, 'flow': 30.2}, {'time': 73, 'flow': 29.8}, 
                    {'time': 74, 'flow': 30.05}, {'time': 75, 'flow': 29.95}, {'time': 76, 'flow': 30.15}, {'time': 77, 'flow': 29.85}, 
                    {'time': 78, 'flow': 30.0}, {'time': 79, 'flow': 30.1}, {'time': 80, 'flow': 29.9}, {'time': 81, 'flow': 30.2}, 
                    {'time': 82, 'flow': 29.8}, {'time': 83, 'flow': 30.05}, {'time': 84, 'flow': 29.95}, {'time': 85, 'flow': 30.15}, 
                    {'time': 86, 'flow': 29.85}, {'time': 87, 'flow': 30.0}, {'time': 88, 'flow': 30.1}, {'time': 89, 'flow': 29.9}, 
                    {'time': 90, 'flow': 30.2}, {'time': 91, 'flow': 29.8}, {'time': 92, 'flow': 30.05}, {'time': 93, 'flow': 29.95}, 
                    {'time': 94, 'flow': 30.15}, {'time': 95, 'flow': 29.85}, {'time': 96, 'flow': 30.0}, {'time': 97, 'flow': 30.1}, 
                    {'time': 98, 'flow': 29.9}, {'time': 99, 'flow': 30.2}, {'time': 100, 'flow': 29.8}, {'time': 101, 'flow': 30.05}, 
                    {'time': 102, 'flow': 29.95}, {'time': 103, 'flow': 30.15}, {'time': 104, 'flow': 29.85}, {'time': 105, 'flow': 30.0}, 
                    {'time': 106, 'flow': 30.1}, {'time': 107, 'flow': 29.9}, {'time': 108, 'flow': 30.2}, {'time': 109, 'flow': 29.8}, 
                    {'time': 110, 'flow': 30.05}, {'time': 111, 'flow': 29.95}, {'time': 112, 'flow': 30.15}, {'time': 113, 'flow': 29.85}, 
                    {'time': 114, 'flow': 30.0}, {'time': 115, 'flow': 30.1}, {'time': 116, 'flow': 29.9}, {'time': 117, 'flow': 30.2}, 
                    {'time': 118, 'flow': 29.8}, {'time': 119, 'flow': 30.05}, {'time': 120, 'flow': 29.95}
                ],
                []
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