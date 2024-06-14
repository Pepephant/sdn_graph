<template>
    <div id="graph"></div>
</template>

<script>
import store from '@/store/store'
import { DataSet } from "vis-data/peer/esm/vis-data"
import { Network } from "vis-network/peer/esm/vis-network";

export default {
    data() {
        return {
            network: {}
        };
    },
    mounted() {
        this.init();
        setInterval(this.changeState, 1000);
    },
    methods: {
        init() {
            // 节点
            var nodes = new DataSet([
                { 
                    id: 1, label: "h1a", 
                    image: {
                        selected: require('@/assets/img/server.png'),
                        unselected: require('@/assets/img/server.png'),
                    },
                },
                { 
                    id: 2, label: "h1b", 
                    image: {
                        selected: require('@/assets/img/server.png'),
                        unselected: require('@/assets/img/server.png'),
                    },
                },
                { 
                    id: 3, label: "h2a", 
                    image: {
                        selected: require('@/assets/img/server.png'),
                        unselected: require('@/assets/img/server.png'),
                    },
                },
                { 
                    id: 4, label: "h2b", 
                    image: {
                        selected: require('@/assets/img/server.png'),
                        unselected: require('@/assets/img/server.png'),
                    },
                },
                { 
                    id: 5, label: "h3a", 
                    image: {
                        selected: require('@/assets/img/server.png'),
                        unselected: require('@/assets/img/server.png'),
                    },
                },
                { 
                    id: 6, label: "h3b", 
                    image: {
                        selected: require('@/assets/img/server.png'),
                        unselected: require('@/assets/img/server.png'),
                    },
                },
                { 
                    id: 7, label: "h4a", 
                    image: {
                        selected: require('@/assets/img/server.png'),
                        unselected: require('@/assets/img/server.png'),
                    },
                },
                { 
                    id: 8, label: "h4b", 
                    image: {
                        selected: require('@/assets/img/server.png'),
                        unselected: require('@/assets/img/server.png'),
                    },
                },
                { 
                    id: 9, label: "h5a", 
                    image: {
                        selected: require('@/assets/img/server.png'),
                        unselected: require('@/assets/img/server.png'),
                    },
                },
                { 
                    id: 10, label: "h5b", 
                    image: {
                        selected: require('@/assets/img/server.png'),
                        unselected: require('@/assets/img/server.png'),
                    },
                },
                { 
                    id: 11, label: "h5c", 
                    image: {
                        selected: require('@/assets/img/server.png'),
                        unselected: require('@/assets/img/server.png'),
                    },
                },
                { 
                    id: 12, label: "leaf1", 
                    image: {
                        selected: require('@/assets/img/switch.png'),
                        unselected: require('@/assets/img/switch.png'),
                    },
                },
                { 
                    id: 13, label: "leaf2", 
                    image: {
                        selected: require('@/assets/img/switch.png'),
                        unselected: require('@/assets/img/switch.png'),
                    },
                },
                { 
                    id: 14, label: "leaf3", 
                    image: {
                        selected: require('@/assets/img/switch.png'),
                        unselected: require('@/assets/img/switch.png'),
                    },
                },
                { 
                    id: 15, label: "leaf4", 
                    image: {
                        selected: require('@/assets/img/switch.png'),
                        unselected: require('@/assets/img/switch.png'),
                    },
                },
                { 
                    id: 16, label: "leaf5", 
                    image: {
                        selected: require('@/assets/img/switch.png'),
                        unselected: require('@/assets/img/switch.png'),
                    },
                },
                { 
                    id: 17, label: "spine1", 
                    image: {
                        selected: require('@/assets/img/switch.png'),
                        unselected: require('@/assets/img/switch.png'),
                    },
                },
                { 
                    id: 18, label: "spine2", 
                    image: {
                        selected: require('@/assets/img/switch.png'),
                        unselected: require('@/assets/img/switch.png'),
                    },
                },
                { 
                    id: 19, label: "spine3", 
                    image: {
                        selected: require('@/assets/img/switch.png'),
                        unselected: require('@/assets/img/switch.png'),
                    },
                },
                { 
                    id: 20, label: "edge", 
                    image: {
                        selected: require('@/assets/img/switch.png'),
                        unselected: require('@/assets/img/switch.png'),
                    },
                },
                { 
                    id: 21, label: "h6", 
                    image: {
                        selected: require('@/assets/img/server.png'),
                        unselected: require('@/assets/img/server.png'),
                    },
                },
                { 
                    id: 22, label: "h7", 
                    image: {
                        selected: require('@/assets/img/server.png'),
                        unselected: require('@/assets/img/server.png'),
                    },
                },
                { 
                    id: 23, label: "h8", 
                    image: {
                        selected: require('@/assets/img/server.png'),
                        unselected: require('@/assets/img/server.png'),
                    },
                },
            ]);

            //  边
            var edges = new DataSet([
                { id: 1, from: 12, to: 1, width: 2 },
                { id: 2, from: 12, to: 2, width: 2 },
                { id: 3, from: 13, to: 3, width: 2 },
                { id: 4, from: 13, to: 4, width: 2 },
                { id: 5, from: 14, to: 5, width: 2 },
                { id: 6, from: 14, to: 6, width: 2 },
                { id: 7, from: 15, to: 7, width: 2 },
                { id: 8, from: 15, to: 8, width: 2 },
                { id: 9, from: 16, to: 9, width: 2 },
                { id: 10, from: 16, to: 10, width: 2 },
                { id: 11, from: 16, to: 11, width: 2 },
                { id: 12, from: 17, to: 12, width: 2 },
                { id: 13, from: 17, to: 13, width: 2 },
                { id: 14, from: 17, to: 14, width: 2 },
                { id: 15, from: 17, to: 15, width: 2 },
                { id: 16, from: 17, to: 16, width: 2 },
                { id: 17, from: 18, to: 12, width: 2 },
                { id: 18, from: 18, to: 13, width: 2 },
                { id: 19, from: 18, to: 14, width: 2 },
                { id: 20, from: 18, to: 15, width: 2 },
                { id: 21, from: 18, to: 16, width: 2 },
                { id: 22, from: 19, to: 12, width: 2 },
                { id: 23, from: 19, to: 13, width: 2 },
                { id: 24, from: 19, to: 14, width: 2 },
                { id: 25, from: 19, to: 15, width: 2 },
                { id: 26, from: 19, to: 16, width: 2 },
                { id: 27, from: 20, to: 17, width: 2 },
                { id: 28, from: 20, to: 18, width: 2 },
                { id: 29, from: 20, to: 19, width: 2 },
                { id: 30, from: 21, to: 20, width: 2 },
                { id: 31, from: 22, to: 20, width: 2 },
                { id: 32, from: 23, to: 20, width: 2 },
            ]);

            // create a network
            var container = document.getElementById("right-graph");

            var data = {
                nodes: nodes,
                edges: edges,
            };

            var options = {
                layout: {
                    hierarchical: {
                        direction: "UD",
                        sortMethod: "directed",
                    },
                },
                nodes:{
                    shape: 'image',
                    image: "@/assets/devices/computer1.png",
                    font: {
                        color: '#ffffff'
                    }
                },
                edges: {
                    chosen: false,
                }
            };

            const network = new Network(container, data, options);
            this.network = network;
            network.on("click", function(e) {
                console.log(e);
            });
        },
        changeState() {
            const now = store.state.time;
            if (now < 30) {
                return ;
            } else if (now === 30) {
                this.network.updateEdge(1, { id: 1, from: 12, to: 1, width: 2, color: 'red' })
            } else if (now === 120) {
                
            }
        }
    },
};
</script>

<style scoped>
#mynetwork {
    height: 100%;
}
</style>

