<template>
    <div id="graph"></div>
</template>

<script>

import * as vis from 'vis-network'
import { DataSet } from "vis-data/peer/esm/vis-data"
import { Network } from "vis-network/peer/esm/vis-network";

export default {
    data() {
        return {};
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            // 节点
            var nodes = new DataSet([
                { 
                    id: 1, label: "client1", 
                    image: {
                        selected: require('@/assets/devices/computer1.png'),
                        unselected: require('@/assets/devices/computer1.png'),
                    },
                },
                { 
                    id: 2, label: "client2",
                    image: {
                        selected: require('@/assets/devices/printer.png'),
                        unselected: require('@/assets/devices/printer.png'),
                    },
                },
                { 
                    id: 3, label: "client3",
                    image: {
                        selected: require('@/assets/devices/switch.png'),
                        unselected: require('@/assets/devices/switch.png'),
                    },
                },
                { 
                    id: 4, label: "server4",
                    image: {
                        selected: require('@/assets/devices/switch.png'),
                        unselected: require('@/assets/devices/switch.png'),
                    },
                },
                { 
                    id: 5, label: "server5",
                    image: {
                        selected: require('@/assets/devices/drive.png'),
                        unselected: require('@/assets/devices/drive.png'),
                    },
                },
                { 
                    id: 6, label: "server6",
                    image: {
                        selected: require('@/assets/devices/computer1.png'),
                        unselected: require('@/assets/devices/computer1.png'),
                    },
                },
            ]);

            //  边
            var edges = new DataSet([
                { id: 1, from: 3, to: 4, width: 4 },
                { id: 2, from: 3, to: 2, width: 1 },
                { id: 3, from: 3, to: 1, width: 3 },
                { id: 4, from: 4, to: 5, width: 2 },
                { id: 5, from: 4, to: 6, width: 2 }
            ]);

            // create a network
            var container = document.getElementById("right-graph");

            var data = {
                nodes: nodes,
                edges: edges,
            };

            var options = {
                nodes:{
                    shape: 'image',
                    image: "@/assets/devices/computer1.png"
                },
                edges: {
                    chosen: false,
                }
            };

            const network = new Network(container, data, options);
            network.on("click", function(e) {
                console.log(e);
            });
        },
    },
};
</script>

<style scoped>
#mynetwork {
    height: 100%;
}
</style>

