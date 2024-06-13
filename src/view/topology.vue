<template>
    <div id="view">
        <div id="left-charts">
            <div class="left-block">
                <div class="title">设备列表</div>
                <div class="titleback"><div class="triangle"></div></div>
                <div id="device-chart" ref="device_chart">
                    <topo-list :nodeData="this.nodeData" :type="1"></topo-list>
                </div>
            </div>
            <!-- <div class="left-block"> 待加入 </div> -->
        </div>
        <net-visual id="right-graph"></net-visual>
    </div>
</template>

<script>
import NetVisual from '@/components/NetVisual.vue'
import TopoList from '@/components/TopoList.vue'

export default {
    data(){
        return{
            nodeData: [
                { 
                    list: 1, id: "h1a", ip:'2001:1:1::1/64'
                },
                { 
                    list: 2, id: "h1b", ip:'2001:1:1::2/64'
                },
                { 
                    list: 3, id: "h2a", ip:'2001:1:1::3/64'
                },
                { 
                    list: 4, id: "h2b", ip:'2001:1:1::4/64'
                },
                { 
                    list: 5, id: "h3a", ip:'2001:1:1::5/64'
                },
                { 
                    list: 6, id: "h3b", ip:'2001:1:1::6/64'
                },
                { 
                    list: 7, id: "h4a", ip:'2001:1:1::7/64'
                },
                { 
                    list: 8, id: "h4b", ip:'2001:1:1::8/64'
                },
                { 
                    list: 9, id: "h5a", ip:'2001:1:1::9/64'
                },
                { 
                    list: 10, id: "h5b", ip:'2001:1:1::10/64'
                },
                { 
                    list: 11, id: "h5c", ip:'2001:1:1::11/64'
                },
                { 
                    list: 12, id: "leaf1", ip:''
                },
                { 
                    list: 13, id: "leaf2", ip:''
                },
                { 
                    list: 14, id: "leaf3", ip:''
                },
                { 
                    list: 15, id: "leaf4", ip:''
                },
                { 
                    list: 16, id: "leaf5", ip:''
                },
                { 
                    list: 17, id: "spine1", ip:''
                },
                { 
                    list: 18, id: "spine2", ip:''
                },
                { 
                    list: 19, id: "spine3", ip:''
                },
                { 
                    list: 20, id: "edge", ip:''
                },
                { 
                    list: 21, id: "h6", ip:''
                },
                { 
                    list: 22, id: "h7", ip:''
                },
                { 
                    list: 23, id: "h8", ip:''
                },
            ]
        }
    },
    components: { TopoList, NetVisual },
    mounted() {
        this.$refs.device_chart.scrollTop = 0;
    }
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
    height: 64vh;
    width: 80%;
    overflow-x: hidden;
    overflow-y: scroll;
    scrollbar-width: none;
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

</style>