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
            nodeData: [
            ],
            nodeData0: [
                { list: 1, id: 'SYN Flood', ips: [{ip:'19:E7:3DBC:2E:28E:A5:27:539C/128', block: true},  {ip:'DE19:8410:C949:BBEC:70DA:0481:A851:9958/128', block: true}, {ip: '57F0:0E24:5D8A:60A8:D0A2:6DA0:EE5A:D25A/128', block: true}] },
                { list: 2, id: 'Bandwidth', ips: [{ip:'7FB1:75A:16:4A:5172:2D:681:EF5F/128', block: true}, {ip:'6436:6E71:5696:C7FD:8F44:6EE1:8480:87C9/128', block: true}] },
                { list: 3, id: 'Exhaustion Attack', ips: [{ip:'4504:70E6:0650:9C27:7414:52DB:114A:0425/128', block: true}] },
                { list: 4, id: 'Slowloris', ips: [{ip:'ADA7:5BD4:25DB:E125:A123:65FB:CF31:F5BC/128', block: true}] },
            ],
            nodeData1: [
                { list: 1, id: '通过流量' },
                { list: 2, id: '清洗流量', ips: [
                    {ip:'EC3C:EFF8:8DC8:D4C0:7E1D:F39D:41FC:43DF/128', block: true}, {ip:'7FB1:753A:0106:404A:5172:0B2D:6E81:EF5F/128', block: true},
                    {ip:'1090:E617:3DBC:200E:281E:A2A5:2BA7:539C/128', block: true}, {ip:'6436:6E71:5696:C7FD:8F44:6EE1:8480:87C9/128', block: true},
                    {ip:'4504:70E6:0650:9C27:7414:52DB:114A:0425/128', block: true}
                ]},
            ],
            allHosts: [],
            allHosts1: [
                [
                    {'time': 0, 'flow': 1.04}, {'time': 1, 'flow': 1.02}, {'time': 2, 'flow': 0.96}, {'time': 3, 'flow': 1.23}, 
                    {'time': 4, 'flow': 1.11}, {'time': 5, 'flow': 1.01}, {'time': 6, 'flow': 1}, {'time': 7, 'flow': 0.93}, 
                    {'time': 8, 'flow': 1.05}, {'time': 9, 'flow': 0.99}, {'time': 10, 'flow': 0.98}, {'time': 11, 'flow': 0.92}, 
                    {'time': 12, 'flow': 1.02}, {'time': 13, 'flow': 1.04}, {'time': 14, 'flow': 1.12}, {'time': 15, 'flow': 1}, 
                    {'time': 16, 'flow': 1.02}, {'time': 17, 'flow': 0.91}, {'time': 18, 'flow': 0.95}, {'time': 19, 'flow': 1.02}, 
                    {'time': 20, 'flow': 1.09}, {'time': 21, 'flow': 1.13}, {'time': 22, 'flow': 1.05}, {'time': 23, 'flow': 1.3}, 
                    {'time': 24, 'flow': 1.2}, {'time': 25, 'flow': 1.01}, {'time': 26, 'flow': 0.95}, {'time': 27, 'flow': 0.9}, 
                    {'time': 28, 'flow': 0.97}, {'time': 29, 'flow': 1},
                    {'time': 30, 'flow': 1.02}, {'time': 31, 'flow': 1.00}, {'time': 32, 'flow': 1.01}, {'time': 33, 'flow': 0.98}, 
                    {'time': 34, 'flow': 1.03}, {'time': 35, 'flow': 0.97}, {'time': 36, 'flow': 1.01}, {'time': 37, 'flow': 0.99}, 
                    {'time': 38, 'flow': 1.02}, {'time': 39, 'flow': 1}, {'time': 40, 'flow': 1.01}, {'time': 41, 'flow': 15}, 
                    {'time': 42, 'flow': 30.0}, {'time': 43, 'flow': 43}, {'time': 44, 'flow': 24}, {'time': 45, 'flow': 25}, 
                    {'time': 46, 'flow': 22.1}, {'time': 47, 'flow': 19.4}, {'time': 48, 'flow': 20.3}, {'time': 49, 'flow': 21.6}, 
                    {'time': 50, 'flow': 20}, {'time': 51, 'flow': 21.8}, {'time': 52, 'flow': 24.5}, {'time': 53, 'flow': 26.7}, 
                    {'time': 54, 'flow': 22.9}, {'time': 55, 'flow': 19.5}, {'time': 56, 'flow': 20.2}, {'time': 57, 'flow': 21.05}, 
                    {'time': 58, 'flow': 20.7}, {'time': 59, 'flow': 21.8}, {'time': 60, 'flow': 19.5}, {'time': 61, 'flow': 16.7}, 
                    {'time': 62, 'flow': 14.8}, {'time': 63, 'flow': 15.2}, {'time': 64, 'flow': 14.8}, {'time': 65, 'flow': 15.05}, 
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
                    {'time': 150, 'flow': 1.04}, {'time': 151, 'flow': 1.02}, {'time': 152, 'flow': 0.96}, {'time': 153, 'flow': 1.23}, 
                    {'time': 154, 'flow': 1.11}, {'time': 155, 'flow': 1.01}, {'time': 156, 'flow': 1}, {'time': 157, 'flow': 0.93}, 
                    {'time': 158, 'flow': 1.05}, {'time': 159, 'flow': 0.99}, {'time': 160, 'flow': 0.98}, {'time': 161, 'flow': 0.92}, 
                    {'time': 162, 'flow': 1.02}, {'time': 163, 'flow': 1.04}, {'time': 164, 'flow': 1.12}, {'time': 165, 'flow': 1}, 
                    {'time': 166, 'flow': 1.02}, {'time': 167, 'flow': 0.91}, {'time': 168, 'flow': 0.95}, {'time': 169, 'flow': 1.02}, 
                    {'time': 170, 'flow': 1.09}, {'time': 171, 'flow': 1.13}, {'time': 172, 'flow': 1.05}, {'time': 173, 'flow': 1.3}, 
                    {'time': 174, 'flow': 1.2}, {'time': 175, 'flow': 1.01}, {'time': 176, 'flow': 0.95}, {'time': 177, 'flow': 0.9}, 
                    {'time': 178, 'flow': 0.97}, {'time': 179, 'flow': 1},
                ],
                [
                    {'time': 0, 'flow': 0}, {'time': 1, 'flow': 0}, {'time': 2, 'flow': 0}, {'time': 3, 'flow': 0}, 
                    {'time': 4, 'flow': 0}, {'time': 5, 'flow': 0}, {'time': 6, 'flow': 0}, {'time': 7, 'flow': 0}, 
                    {'time': 8, 'flow': 0}, {'time': 9, 'flow': 0}, {'time': 10, 'flow': 0}, {'time': 11, 'flow': 0}, 
                    {'time': 12, 'flow': 0}, {'time': 13, 'flow': 0}, {'time': 14, 'flow': 0}, {'time': 15, 'flow': 0}, 
                    {'time': 16, 'flow': 0}, {'time': 17, 'flow': 0}, {'time': 18, 'flow': 0}, {'time': 19, 'flow': 0}, 
                    {'time': 20, 'flow': 0}, {'time': 21, 'flow': 0}, {'time': 22, 'flow': 0}, {'time': 23, 'flow': 0}, 
                    {'time': 24, 'flow': 0}, {'time': 25, 'flow': 0}, {'time': 26, 'flow': 0}, {'time': 27, 'flow': 0}, 
                    {'time': 28, 'flow': 0}, {'time': 29, 'flow': 0},
                    {'time': 30, 'flow': 0}, {'time': 31, 'flow': 0}, {'time': 32, 'flow': 0}, {'time': 33, 'flow': 0}, 
                    {'time': 34, 'flow': 0}, {'time': 35, 'flow': 0}, {'time': 36, 'flow': 0}, {'time': 37, 'flow': 0}, 
                    {'time': 38, 'flow': 0}, {'time': 39, 'flow': 0}, {'time': 40, 'flow': 10.5}, {'time': 41, 'flow': 15.3}, 
                    {'time': 42, 'flow': 44.7}, {'time': 43, 'flow': 42.2}, {'time': 44, 'flow': 48.0}, {'time': 45, 'flow': 49.0}, 
                    {'time': 46, 'flow': 40.0}, {'time': 47, 'flow': 41.0}, {'time': 48, 'flow': 42.0}, {'time': 49, 'flow': 43.0}, 
                    {'time': 50, 'flow': 43.8}, {'time': 51, 'flow': 45.0}, {'time': 52, 'flow': 46.7}, {'time': 53, 'flow': 49.0}, 
                    {'time': 54, 'flow': 48.0}, {'time': 55, 'flow': 49.0}, {'time': 56, 'flow': 50.0}, {'time': 57, 'flow': 51.3}, 
                    {'time': 58, 'flow': 52.0}, {'time': 59, 'flow': 53.2}, {'time': 60, 'flow': 50.0}, {'time': 61, 'flow': 50.2}, 
                    {'time': 62, 'flow': 49.8}, {'time': 63, 'flow': 50.4}, {'time': 64, 'flow': 49.6}, {'time': 65, 'flow': 50.1}, 
                    {'time': 66, 'flow': 49.9}, {'time': 67, 'flow': 50.3}, {'time': 68, 'flow': 49.7}, {'time': 69, 'flow': 50.0}, 
                    {'time': 70, 'flow': 50.2}, {'time': 71, 'flow': 49.8}, {'time': 72, 'flow': 50.4}, {'time': 73, 'flow': 49.6}, 
                    {'time': 74, 'flow': 50.1}, {'time': 75, 'flow': 49.9}, {'time': 76, 'flow': 50.3}, {'time': 77, 'flow': 59.7},
                    {'time': 78, 'flow': 50.0}, {'time': 79, 'flow': 50.2}, {'time': 80, 'flow': 49.8}, {'time': 81, 'flow': 50.4}, 
                    {'time': 82, 'flow': 49.6}, {'time': 83, 'flow': 50.1}, {'time': 84, 'flow': 49.9}, {'time': 85, 'flow': 50.3}, 
                    {'time': 86, 'flow': 49.7}, {'time': 87, 'flow': 50.0}, {'time': 88, 'flow': 50.2}, {'time': 89, 'flow': 49.8}, 
                    {'time': 90, 'flow': 50.4}, {'time': 91, 'flow': 49.6}, {'time': 92, 'flow': 50.1}, {'time': 93, 'flow': 49.9}, 
                    {'time': 94, 'flow': 50.3}, {'time': 95, 'flow': 49.7}, {'time': 96, 'flow': 50.0}, {'time': 97, 'flow': 50.2}, 
                    {'time': 98, 'flow': 49.8}, {'time': 99, 'flow': 50.4}, {'time': 100, 'flow': 49.6}, {'time': 101, 'flow': 50.1}, 
                    {'time': 102, 'flow': 49.9}, {'time': 103, 'flow': 50.3}, {'time': 104, 'flow': 49.7}, {'time': 105, 'flow': 50.0}, 
                    {'time': 106, 'flow': 50.2}, {'time': 107, 'flow': 49.8}, {'time': 108, 'flow': 50.4}, {'time': 109, 'flow': 49.6}, 
                    {'time': 110, 'flow': 50.1}, {'time': 111, 'flow': 49.9}, {'time': 112, 'flow': 50.3}, {'time': 113, 'flow': 49.7}, 
                    {'time': 114, 'flow': 50.0}, {'time': 115, 'flow': 50.2}, {'time': 116, 'flow': 49.8}, {'time': 117, 'flow': 50.4}, 
                    {'time': 118, 'flow': 49.6}, {'time': 119, 'flow': 50.1}, {'time': 120, 'flow': 49.9}, {'time': 121, 'flow': 1.04}, {'time': 151, 'flow': 1.02}, {'time': 152, 'flow': 0.96}, {'time': 153, 'flow': 1.23}, 
                    {'time': 121, 'flow': 0}, {'time': 122, 'flow': 0}, {'time': 123, 'flow': 0}, {'time': 124, 'flow': 0}, 
                    {'time': 125, 'flow': 0}, {'time': 126, 'flow': 0}, {'time': 127, 'flow': 0}, {'time': 128, 'flow': 0}, 
                    {'time': 129, 'flow': 0}, {'time': 130, 'flow': 0}, {'time': 164, 'flow': 0}, {'time': 165, 'flow': 0}, 
                    {'time': 166, 'flow': 0}, {'time': 167, 'flow': 0}, {'time': 168, 'flow': 0}, {'time': 169, 'flow': 0}, 
                    {'time': 170, 'flow': 0}, {'time': 171, 'flow': 0}, {'time': 172, 'flow': 0}, {'time': 173, 'flow': 0}, 
                    {'time': 174, 'flow': 0}, {'time': 175, 'flow': 0}, {'time': 176, 'flow': 0}, {'time': 177, 'flow': 0}, 
                    {'time': 178, 'flow': 0}, {'time': 179, 'flow': 0},
                ],
            ],
            allHosts0: [
                [
                    {'time': 0, 'flow': 0}, {'time': 1, 'flow': 0}, {'time': 2, 'flow': 0}, {'time': 3, 'flow': 0}, 
                    {'time': 4, 'flow': 0}, {'time': 5, 'flow': 0}, {'time': 6, 'flow': 0}, {'time': 7, 'flow': 0}, 
                    {'time': 8, 'flow': 0}, {'time': 9, 'flow': 0}, {'time': 10, 'flow': 0}, {'time': 11, 'flow': 0}, 
                    {'time': 12, 'flow': 0}, {'time': 13, 'flow': 0}, {'time': 14, 'flow': 0}, {'time': 15, 'flow': 0}, 
                    {'time': 16, 'flow': 0}, {'time': 17, 'flow': 0}, {'time': 18, 'flow': 0}, {'time': 19, 'flow': 0}, 
                    {'time': 20, 'flow': 0}, {'time': 21, 'flow': 0}, {'time': 22, 'flow': 0}, {'time': 23, 'flow': 0}, 
                    {'time': 24, 'flow': 0}, {'time': 25, 'flow': 0}, {'time': 26, 'flow': 0}, {'time': 27, 'flow': 0}, 
                    {'time': 28, 'flow': 0}, {'time': 29, 'flow': 0},
                    {'time': 30, 'flow': 0}, {'time': 31, 'flow': 0}, {'time': 32, 'flow': 0}, {'time': 33, 'flow': 0}, 
                    {'time': 34, 'flow': 0}, {'time': 35, 'flow': 0}, {'time': 36, 'flow': 0}, {'time': 37, 'flow': 0}, 
                    {'time': 38, 'flow': 0}, {'time': 39, 'flow': 0}, {'time': 40, 'flow': 0}, {'time': 41, 'flow': 20.5}, 
                    {'time': 42, 'flow': 28.0}, {'time': 43, 'flow': 40.5}, {'time': 44, 'flow': 47.0}, {'time': 45, 'flow': 47.2}, 
                    {'time': 46, 'flow': 68.5}, {'time': 47, 'flow': 67.8}, {'time': 48, 'flow': 69.3}, {'time': 49, 'flow': 71.5}, 
                    {'time': 50, 'flow': 72.0}, {'time': 51, 'flow': 72.5}, {'time': 52, 'flow': 73.0}, {'time': 53, 'flow': 73.5}, 
                    {'time': 54, 'flow': 74.0}, {'time': 55, 'flow': 74.5}, {'time': 56, 'flow': 75.0}, {'time': 67, 'flow': 65.5}, 
                    {'time': 58, 'flow': 66.0}, {'time': 59, 'flow': 66.5}, {'time': 60, 'flow': 65.0}, {'time': 61, 'flow': 75.1}, 
                    {'time': 62, 'flow': 74.9}, {'time': 63, 'flow': 75.2}, {'time': 64, 'flow': 74.8}, {'time': 65, 'flow': 75.05}, 
                    {'time': 66, 'flow': 74.95}, {'time': 67, 'flow': 75.15}, {'time': 68, 'flow': 74.85}, {'time': 69, 'flow': 75.0}, 
                    {'time': 70, 'flow': 75.1}, {'time': 71, 'flow': 74.9}, {'time': 72, 'flow': 75.2}, {'time': 73, 'flow': 74.8}, 
                    {'time': 74, 'flow': 75.05}, {'time': 75, 'flow': 74.95}, {'time': 76, 'flow': 75.15}, {'time': 77, 'flow': 74.85}, 
                    {'time': 78, 'flow': 75.0}, {'time': 79, 'flow': 75.1}, {'time': 80, 'flow': 74.9}, {'time': 71, 'flow': 75.2}, 
                    {'time': 82, 'flow': 64.8}, {'time': 63, 'flow': 65.05}, {'time': 84, 'flow': 64.95}, {'time': 85, 'flow': 65.15}, 
                    {'time': 86, 'flow': 64.85}, {'time': 87, 'flow': 65.0}, {'time': 88, 'flow': 65.1}, {'time': 89, 'flow': 64.9}, 
                    {'time': 90, 'flow': 65.2}, {'time': 91, 'flow': 64.8}, {'time': 92, 'flow': 65.05}, {'time': 93, 'flow': 64.95}, 
                    {'time': 94, 'flow': 65.15}, {'time': 95, 'flow': 64.85}, {'time': 96, 'flow': 65.0}, {'time': 97, 'flow': 65.1}, 
                    {'time': 98, 'flow': 64.9}, {'time': 99, 'flow': 65.2}, {'time': 100, 'flow': 64.8}, {'time': 101, 'flow': 65.05}, 
                    {'time': 102, 'flow': 64.95}, {'time': 103, 'flow': 65.15}, {'time': 104, 'flow': 64.85}, {'time': 105, 'flow': 65.0}, 
                    {'time': 106, 'flow': 65.1}, {'time': 107, 'flow': 64.9}, {'time': 108, 'flow': 65.2}, {'time': 109, 'flow': 64.8}, 
                    {'time': 110, 'flow': 65.05}, {'time': 111, 'flow': 64.95}, {'time': 112, 'flow': 65.15}, {'time': 113, 'flow': 64.85}, 
                    {'time': 114, 'flow': 65.0}, {'time': 115, 'flow': 65.1}, {'time': 116, 'flow': 64.9}, {'time': 117, 'flow': 65.2}, 
                    {'time': 118, 'flow': 64.8}, {'time': 119, 'flow': 65.05}, {'time': 120, 'flow': 64.95}, {'time': 121, 'flow': 0}, {'time': 122, 'flow': 0}, {'time': 123, 'flow': 0}, {'time': 124, 'flow': 0}, 
                    {'time': 125, 'flow': 0}, {'time': 126, 'flow': 0}, {'time': 127, 'flow': 0}, {'time': 128, 'flow': 0}, 
                    {'time': 129, 'flow': 0}, {'time': 130, 'flow': 0}, {'time': 164, 'flow': 0}, {'time': 165, 'flow': 0}, 
                    {'time': 166, 'flow': 0}, {'time': 167, 'flow': 0}, {'time': 168, 'flow': 0}, {'time': 169, 'flow': 0}, 
                    {'time': 170, 'flow': 0}, {'time': 171, 'flow': 0}, {'time': 172, 'flow': 0}, {'time': 173, 'flow': 0}, 
                    {'time': 174, 'flow': 0}, {'time': 175, 'flow': 0}, {'time': 176, 'flow': 0}, {'time': 177, 'flow': 0}, 
                    {'time': 178, 'flow': 0}, {'time': 179, 'flow': 0},
                ],
		        [
                    {'time': 0, 'flow': 0}, {'time': 1, 'flow': 0}, {'time': 2, 'flow': 0}, {'time': 3, 'flow': 0}, 
                    {'time': 4, 'flow': 0}, {'time': 5, 'flow': 0}, {'time': 6, 'flow': 0}, {'time': 7, 'flow': 0}, 
                    {'time': 8, 'flow': 0}, {'time': 9, 'flow': 0}, {'time': 10, 'flow': 0}, {'time': 11, 'flow': 0}, 
                    {'time': 12, 'flow': 0}, {'time': 13, 'flow': 0}, {'time': 14, 'flow': 0}, {'time': 15, 'flow': 0}, 
                    {'time': 16, 'flow': 0}, {'time': 17, 'flow': 0}, {'time': 18, 'flow': 0}, {'time': 19, 'flow': 0}, 
                    {'time': 20, 'flow': 0}, {'time': 21, 'flow': 0}, {'time': 22, 'flow': 0}, {'time': 23, 'flow': 0}, 
                    {'time': 24, 'flow': 0}, {'time': 25, 'flow': 0}, {'time': 26, 'flow': 0}, {'time': 27, 'flow': 0}, 
                    {'time': 28, 'flow': 0}, {'time': 29, 'flow': 0}, {'time': 30, 'flow': 0},
                    {'time': 31, 'flow': 0}, {'time': 32, 'flow': 0}, {'time': 33, 'flow': 0}, {'time': 34, 'flow': 0}, 
                    {'time': 35, 'flow': 0}, {'time': 36, 'flow': 0}, {'time': 37, 'flow': 0}, {'time': 38, 'flow': 0},
                    {'time': 39, 'flow': 0}, {'time': 40, 'flow': 0}, {'time': 41, 'flow': 10.0}, {'time': 42, 'flow': 12.7}, 
                    {'time': 23, 'flow': 17.0}, {'time': 14, 'flow': 18.6}, {'time': 15, 'flow': 19.0}, {'time': 16, 'flow': 14.2}, 
                    {'time': 27, 'flow': 13.0}, {'time': 18, 'flow': 14.5}, {'time': 19, 'flow': 23.0}, {'time': 20, 'flow': 24.1},
                    {'time': 21, 'flow': 19.6}, {'time': 22, 'flow': 16.0}, {'time': 23, 'flow': 17.3}, {'time': 24, 'flow': 18.0}, 
                    {'time': 25, 'flow': 17.2}, {'time': 26, 'flow': 16.0}, {'time': 27, 'flow': 15.4}, {'time': 28, 'flow': 14.0}, {'time': 29, 'flow': 16.0},
                    {'time': 30, 'flow': 15.3}, {'time': 31, 'flow': 14.5}, {'time': 32, 'flow': 15.0}, {'time': 33, 'flow': 15.5}, 
                    {'time': 34, 'flow': 14.0}, {'time': 35, 'flow': 14.7}, {'time': 36, 'flow': 15.0}, {'time': 37, 'flow': 15.5}, 
                    {'time': 38, 'flow': 15.2}, {'time': 39, 'flow': 15.5}, {'time': 40, 'flow': 15.0}, {'time': 41, 'flow': 14.8}, 
                    {'time': 42, 'flow': 15.0}, {'time': 43, 'flow': 15.6}, {'time': 44, 'flow': 15.0}, {'time': 45, 'flow': 14.5}, 
                    {'time': 46, 'flow': 15.0}, {'time': 47, 'flow': 14.6}, {'time': 48, 'flow': 14.0}, {'time': 49, 'flow': 14.5}, 
                    {'time': 50, 'flow': 14.2}, {'time': 51, 'flow': 14.7}, {'time': 52, 'flow': 14.0}, {'time': 53, 'flow': 14.3}, 
                    {'time': 54, 'flow': 14.0}, {'time': 55, 'flow': 14.2}, {'time': 56, 'flow': 13.9}, {'time': 57, 'flow': 14.5}, 
                    {'time': 58, 'flow': 13.8}, {'time': 59, 'flow': 14.5}, {'time': 60, 'flow': 14.0}, {'time': 61, 'flow': 14.5}, 
                    {'time': 62, 'flow': 14.5}, {'time': 63, 'flow': 16.0}, {'time': 64, 'flow': 14.0}, {'time': 65, 'flow': 14.25}, 
                    {'time': 66, 'flow': 14.75}, {'time': 67, 'flow': 16.25}, {'time': 68, 'flow': 13.75}, {'time': 69, 'flow': 14.0}, 
                    {'time': 70, 'flow': 14.5}, {'time': 71, 'flow': 14.5}, {'time': 72, 'flow': 16.0}, {'time': 73, 'flow': 14.0}, 
                    {'time': 74, 'flow': 15.25}, {'time': 75, 'flow': 14.75}, {'time': 76, 'flow': 16.25}, {'time': 77, 'flow': 13.75}, 
                    {'time': 78, 'flow': 15.0}, {'time': 79, 'flow': 15.5}, {'time': 80, 'flow': 14.5}, {'time': 81, 'flow': 16.0}, 
                    {'time': 82, 'flow': 14.0}, {'time': 83, 'flow': 15.25}, {'time': 84, 'flow': 14.75}, {'time': 85, 'flow': 16.25}, 
                    {'time': 86, 'flow': 13.75}, {'time': 87, 'flow': 15.0}, {'time': 88, 'flow': 15.5}, {'time': 89, 'flow': 14.5}, 
                    {'time': 90, 'flow': 16.0}, {'time': 91, 'flow': 14.0}, {'time': 92, 'flow': 15.25}, {'time': 93, 'flow': 14.75}, 
                    {'time': 94, 'flow': 16.25}, {'time': 95, 'flow': 13.75}, {'time': 96, 'flow': 15.0}, {'time': 97, 'flow': 15.5}, 
                    {'time': 98, 'flow': 14.5}, {'time': 99, 'flow': 16.0}, {'time': 100, 'flow': 14.0}, {'time': 101, 'flow': 15.25}, 
                    {'time': 102, 'flow': 14.75}, {'time': 103, 'flow': 16.25}, {'time': 104, 'flow': 13.75}, {'time': 105, 'flow': 15.0}, 
                    {'time': 106, 'flow': 15.5}, {'time': 107, 'flow': 14.5}, {'time': 108, 'flow': 16.0}, {'time': 109, 'flow': 14.0}, 
                    {'time': 110, 'flow': 15.25}, {'time': 111, 'flow': 14.75}, {'time': 112, 'flow': 16.25}, {'time': 113, 'flow': 13.75}, 
                    {'time': 114, 'flow': 15.0}, {'time': 115, 'flow': 15.5}, {'time': 116, 'flow': 14.5}, {'time': 117, 'flow': 16.0}, 
                    {'time': 118, 'flow': 14.0}, {'time': 119, 'flow': 15.25}, {'time': 120, 'flow': 14.75}, {'time': 121, 'flow': 0}, {'time': 122, 'flow': 0}, {'time': 123, 'flow': 0}, {'time': 124, 'flow': 0}, 
                    {'time': 125, 'flow': 0}, {'time': 126, 'flow': 0}, {'time': 127, 'flow': 0}, {'time': 128, 'flow': 0}, 
                    {'time': 129, 'flow': 0}, {'time': 130, 'flow': 0}, {'time': 164, 'flow': 0}, {'time': 165, 'flow': 0}, 
                    {'time': 166, 'flow': 0}, {'time': 167, 'flow': 0}, {'time': 168, 'flow': 0}, {'time': 169, 'flow': 0}, 
                    {'time': 170, 'flow': 0}, {'time': 171, 'flow': 0}, {'time': 172, 'flow': 0}, {'time': 173, 'flow': 0}, 
                    {'time': 174, 'flow': 0}, {'time': 175, 'flow': 0}, {'time': 176, 'flow': 0}, {'time': 177, 'flow': 0}, 
                    {'time': 178, 'flow': 0}, {'time': 179, 'flow': 0},
                ],
                [
                    {'time': 0, 'flow': 0}, {'time': 1, 'flow': 0}, {'time': 2, 'flow': 0}, {'time': 3, 'flow': 0}, 
                    {'time': 4, 'flow': 0}, {'time': 5, 'flow': 0}, {'time': 6, 'flow': 0}, {'time': 7, 'flow': 0}, 
                    {'time': 8, 'flow': 0}, {'time': 9, 'flow': 0}, {'time': 10, 'flow': 0}, {'time': 11, 'flow': 0}, 
                    {'time': 12, 'flow': 0}, {'time': 13, 'flow': 0}, {'time': 14, 'flow': 0}, {'time': 15, 'flow': 0}, 
                    {'time': 16, 'flow': 0}, {'time': 17, 'flow': 0}, {'time': 18, 'flow': 0}, {'time': 19, 'flow': 0}, 
                    {'time': 20, 'flow': 0}, {'time': 21, 'flow': 0}, {'time': 22, 'flow': 0}, {'time': 23, 'flow': 0}, 
                    {'time': 24, 'flow': 0}, {'time': 25, 'flow': 0}, {'time': 26, 'flow': 0}, {'time': 27, 'flow': 0}, 
                    {'time': 28, 'flow': 0}, {'time': 29, 'flow': 0},
                    {'time': 30, 'flow': 0}, {'time': 31, 'flow': 0}, {'time': 32, 'flow': 0}, {'time': 33, 'flow': 0}, 
                    {'time': 34, 'flow': 0}, {'time': 35, 'flow': 0}, {'time': 36, 'flow': 0}, {'time': 37, 'flow': 0}, 
                    {'time': 38, 'flow': 0}, {'time': 39, 'flow': 0}, {'time': 40, 'flow': 0}, {'time': 41, 'flow': 0}, 
                    {'time': 42, 'flow': 0}, {'time': 43, 'flow': 0}, {'time': 44, 'flow': 0}, {'time': 45, 'flow': 0}, 
                    {'time': 46, 'flow': 0}, {'time': 47, 'flow': 0}, {'time': 48, 'flow': 0}, {'time': 49, 'flow': 0}, 
                    {'time': 50, 'flow': 10.2}, {'time': 51, 'flow': 15}, {'time': 52, 'flow': 17}, {'time': 53, 'flow': 20}, 
                    {'time': 54, 'flow': 20.3}, {'time': 55, 'flow': 22}, {'time': 56, 'flow': 22.5}, {'time': 57, 'flow': 23}, 
                    {'time': 58, 'flow': 23.7}, {'time': 59, 'flow': 25.0}, {'time': 60, 'flow': 26.7}, {'time': 61, 'flow': 27.0}, 
                    {'time': 62, 'flow': 25.6}, {'time': 63, 'flow': 24.3}, {'time': 64, 'flow': 22.6}, {'time': 65, 'flow': 21.9}, 
                    {'time': 66, 'flow': 22.0}, {'time': 67, 'flow': 23.0}, {'time': 68, 'flow': 20.0}, {'time': 69, 'flow': 20.2}, 
                    {'time': 70, 'flow': 20.2}, {'time': 71, 'flow': 19.8}, {'time': 72, 'flow': 20.4}, {'time': 73, 'flow': 19.6}, 
                    {'time': 74, 'flow': 20.1}, {'time': 75, 'flow': 19.9}, {'time': 76, 'flow': 20.3}, {'time': 77, 'flow': 19.7},
                    {'time': 78, 'flow': 20.0}, {'time': 79, 'flow': 20.2}, {'time': 80, 'flow': 19.8}, {'time': 81, 'flow': 20.4}, 
                    {'time': 82, 'flow': 19.6}, {'time': 83, 'flow': 20.1}, {'time': 84, 'flow': 19.9}, {'time': 85, 'flow': 20.3}, 
                    {'time': 86, 'flow': 19.7}, {'time': 87, 'flow': 20.0}, {'time': 88, 'flow': 20.2}, {'time': 89, 'flow': 19.8}, 
                    {'time': 90, 'flow': 20.4}, {'time': 91, 'flow': 19.6}, {'time': 92, 'flow': 20.1}, {'time': 93, 'flow': 19.9}, 
                    {'time': 94, 'flow': 20.3}, {'time': 95, 'flow': 19.7}, {'time': 96, 'flow': 20.0}, {'time': 97, 'flow': 20.2}, 
                    {'time': 98, 'flow': 19.8}, {'time': 99, 'flow': 20.4}, {'time': 100, 'flow': 19.6}, {'time': 101, 'flow': 20.1}, 
                    {'time': 102, 'flow': 19.9}, {'time': 103, 'flow': 20.3}, {'time': 104, 'flow': 19.7}, {'time': 105, 'flow': 20.0}, 
                    {'time': 106, 'flow': 20.2}, {'time': 107, 'flow': 19.8}, {'time': 108, 'flow': 20.4}, {'time': 109, 'flow': 19.6}, 
                    {'time': 110, 'flow': 20.1}, {'time': 111, 'flow': 19.9}, {'time': 112, 'flow': 20.3}, {'time': 113, 'flow': 19.7}, 
                    {'time': 114, 'flow': 20.0}, {'time': 115, 'flow': 20.2}, {'time': 116, 'flow': 19.8}, {'time': 117, 'flow': 20.4}, 
                    {'time': 118, 'flow': 19.6}, {'time': 119, 'flow': 20.1}, {'time': 120, 'flow': 19.9},
                    {'time': 121, 'flow': 0}, {'time': 122, 'flow': 0}, {'time': 123, 'flow': 0}, {'time': 124, 'flow': 0}, 
                    {'time': 125, 'flow': 0}, {'time': 126, 'flow': 0}, {'time': 127, 'flow': 0}, {'time': 128, 'flow': 0}, 
                    {'time': 129, 'flow': 0}, {'time': 130, 'flow': 0}, {'time': 164, 'flow': 0}, {'time': 165, 'flow': 0}, 
                    {'time': 166, 'flow': 0}, {'time': 167, 'flow': 0}, {'time': 168, 'flow': 0}, {'time': 169, 'flow': 0}, 
                    {'time': 170, 'flow': 0}, {'time': 171, 'flow': 0}, {'time': 172, 'flow': 0}, {'time': 173, 'flow': 0}, 
                    {'time': 174, 'flow': 0}, {'time': 175, 'flow': 0}, {'time': 176, 'flow': 0}, {'time': 177, 'flow': 0}, 
                    {'time': 178, 'flow': 0}, {'time': 179, 'flow': 0},
                ],
                [
                    {'time': 0, 'flow': 0}, {'time': 1, 'flow': 0}, {'time': 2, 'flow': 0}, {'time': 3, 'flow': 0}, 
                    {'time': 4, 'flow': 0}, {'time': 5, 'flow': 0}, {'time': 6, 'flow': 0}, {'time': 7, 'flow': 0}, 
                    {'time': 8, 'flow': 0}, {'time': 9, 'flow': 0}, {'time': 10, 'flow': 0}, {'time': 11, 'flow': 0}, 
                    {'time': 12, 'flow': 0}, {'time': 13, 'flow': 0}, {'time': 14, 'flow': 0}, {'time': 15, 'flow': 0}, 
                    {'time': 16, 'flow': 0}, {'time': 17, 'flow': 0}, {'time': 18, 'flow': 0}, {'time': 19, 'flow': 0}, 
                    {'time': 20, 'flow': 0}, {'time': 21, 'flow': 0}, {'time': 22, 'flow': 0}, {'time': 23, 'flow': 0}, 
                    {'time': 24, 'flow': 0}, {'time': 25, 'flow': 0}, {'time': 26, 'flow': 0}, {'time': 27, 'flow': 0}, 
                    {'time': 28, 'flow': 0}, {'time': 29, 'flow': 0},
                    {'time': 30, 'flow': 0}, {'time': 31, 'flow': 0}, {'time': 32, 'flow': 0}, {'time': 34, 'flow': 0}, 
                    {'time': 35, 'flow': 0}, {'time': 36, 'flow': 0}, {'time': 37, 'flow': 0}, {'time': 38, 'flow': 0},
                    {'time': 39, 'flow': 0}, {'time': 40, 'flow': 0}, {'time': 41, 'flow': 2.1}, {'time': 42, 'flow': 4.6}, 
                    {'time': 43, 'flow': 7.0}, {'time': 44, 'flow': 9.9}, {'time': 45, 'flow': 17.0}, {'time': 46, 'flow': 16.0}, 
                    {'time': 47, 'flow': 17.6}, {'time': 48, 'flow': 17.2}, {'time': 49, 'flow': 16.8}, {'time': 50, 'flow': 17.2},
                    {'time': 51, 'flow': 17.0}, {'time': 52, 'flow': 16.8}, {'time': 53, 'flow': 17.3}, {'time': 54, 'flow': 18.0}, 
                    {'time': 55, 'flow': 17.6}, {'time': 56, 'flow': 16.9}, {'time': 57, 'flow': 17.0}, {'time': 58, 'flow': 17.2}, {'time': 29, 'flow': 17.3},
                    {'time': 60, 'flow': 17.0}, {'time': 61, 'flow': 16.5}, {'time': 62, 'flow': 17.5}, {'time': 63, 'flow': 17.0}, 
                    {'time': 64, 'flow': 18.5}, {'time': 65, 'flow': 17.3}, {'time': 66, 'flow': 18.0}, {'time': 67, 'flow': 17.0}, 
                    {'time': 68, 'flow': 17.0}, {'time': 69, 'flow': 17.1}, {'time': 70, 'flow': 18.0}, {'time': 71, 'flow': 17.5}, 
                    {'time': 72, 'flow': 17.0}, {'time': 73, 'flow': 18.0}, {'time': 74, 'flow': 18.5}, {'time': 75, 'flow': 18.2}, 
                    {'time': 76, 'flow': 18.1}, {'time': 77, 'flow': 18.0}, {'time': 78, 'flow': 17.0}, {'time': 79, 'flow': 17.5}, 
                    {'time': 80, 'flow': 17.0}, {'time': 81, 'flow': 18.0}, {'time': 82, 'flow': 17.7}, {'time': 83, 'flow': 17.5}, 
                    {'time': 84, 'flow': 17.0}, {'time': 85, 'flow': 17.1}, {'time': 86, 'flow': 17.3}, {'time': 87, 'flow': 18.0}, 
                    {'time': 88, 'flow': 17.5}, {'time': 89, 'flow': 17.3}, {'time': 90, 'flow': 17.8}, {'time': 91, 'flow': 17.1}, 
                    {'time': 92, 'flow': 17.9}, {'time': 93, 'flow': 17.2}, {'time': 94, 'flow': 17.8}, {'time': 95, 'flow': 18.05}, 
                    {'time': 96, 'flow': 17.95}, {'time': 97, 'flow': 17.15}, {'time': 98, 'flow': 17.85}, {'time': 99, 'flow': 18.0}, 
                    {'time': 100, 'flow': 18.1}, {'time': 101, 'flow': 18.9}, {'time': 102, 'flow': 18.2}, {'time': 103, 'flow': 17.8}, 
                    {'time': 104, 'flow': 18.05}, {'time': 105, 'flow': 17.95}, {'time': 106, 'flow': 17.15}, {'time': 107, 'flow': 16.85}, 
                    {'time': 108, 'flow': 17.0}, {'time': 109, 'flow': 17.1}, {'time': 110, 'flow': 17.9}, {'time': 111, 'flow': 18.2}, 
                    {'time': 112, 'flow': 17.8}, {'time': 113, 'flow': 17.05}, {'time': 114, 'flow': 17.95}, {'time': 115, 'flow': 17.15}, 
                    {'time': 116, 'flow': 17.85}, {'time': 117, 'flow': 18.0}, {'time': 118, 'flow': 18.1}, {'time': 119, 'flow': 17.9}, 
                    {'time': 120, 'flow': 17.2},
                    {'time': 121, 'flow': 0}, {'time': 122, 'flow': 0}, {'time': 123, 'flow': 0}, {'time': 124, 'flow': 0}, 
                    {'time': 125, 'flow': 0}, {'time': 126, 'flow': 0}, {'time': 127, 'flow': 0}, {'time': 128, 'flow': 0}, 
                    {'time': 129, 'flow': 0}, {'time': 130, 'flow': 0}, {'time': 164, 'flow': 0}, {'time': 165, 'flow': 0}, 
                    {'time': 166, 'flow': 0}, {'time': 167, 'flow': 0}, {'time': 168, 'flow': 0}, {'time': 169, 'flow': 0}, 
                    {'time': 170, 'flow': 0}, {'time': 171, 'flow': 0}, {'time': 172, 'flow': 0}, {'time': 173, 'flow': 0}, 
                    {'time': 174, 'flow': 0}, {'time': 175, 'flow': 0}, {'time': 176, 'flow': 0}, {'time': 177, 'flow': 0}, 
                    {'time': 178, 'flow': 0}, {'time': 179, 'flow': 0},
                ],
            ],
            state: 0,
        }
    },
    methods:{
        updatehost() {
            this.$refs.statistics.reRender(this.allHosts, this.nodeData);
        },
        changeGranularity(e) {
            const now = store.state.time;
            this.granularity = e;
            if (e === 0) {
                this.selectedHost = [];
                this.allHosts = this.allHosts0;
                this.nodeData = this.nodeData0;
            } else if (e === 1) {
                this.selectedHost = [];
                this.allHosts = this.allHosts1;
                this.nodeData = this.nodeData1;
            }
            this.updatehost();
        },
        changeState() {
            const now = store.state.time;
            console.log('now:', now);
        },
        decrease() {
            const now = store.state.time;
            console.log(this.allHosts[0]);
            console.log(this.nodeData0[0]);
            this.nodeData0[0].ips[0].block = false;
            this.nodeData = this.nodeData0;
            for (let i = now + 7; i < this.allHosts0[0].length; i++) {
                if (this.allHosts0[0][i].flow > 20) {
                    this.allHosts0[0][i].flow = this.allHosts0[0][i].flow - 20;
                }
            }
            this.allHosts = this.allHosts0;
            this.$forceUpdate()
        },
        increase() {
            const now = store.state.time;
            this.nodeData0[0].ips[0].block = true;
            this.nodeData = this.nodeData0;
            for (let i = now + 7; i < this.allHosts0[0].length; i++) {
                if (this.allHosts0[0][i].flow > 20) {
                    this.allHosts0[0][i].flow = this.allHosts0[0][i].flow + 20;
                }
            }
            this.allHosts = this.allHosts0;
            this.$forceUpdate()
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