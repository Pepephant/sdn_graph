<template>
    <div id="mynetwork" class="mynetwork"></div>
</template>

<script>
// import * as vis from "vis-network";
const vis = require("vis-network/dist/vis-network.min.js");
// require("vis-network/dist/vis-network.min.css");
/*
*将 `vis.network` 对象移出 `data()` 方法
*/
var network = null;
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
            var nodes = new vis.DataSet([
                { id: 1, label: "Node 1", title: "1111" },
                { id: 2, label: "Node 2" },
                { id: 3, label: "Node 3" },
                { id: 4, label: "Node 4" },
                { id: 5, label: "Node 5" },
            ]);

            //  边
            var edges = new vis.DataSet([
                { id: 1, from: 1, to: 3 },
                { id: 2, from: 1, to: 3 },
                { id: 5, from: 3, to: 1 },
                { from: 1, to: 2 },
                { from: 2, to: 4 },
                { from: 2, to: 5 },
                { from: 3, to: 3 },
            ]);

            // create a network
            var container = document.getElementById("mynetwork");
            var data = {
                nodes: nodes,
                edges: edges,
            };
            var options = {};
            network = new vis.Network(container, data, options);
            nodes.add({ id: 6, label: "Node 6" });
            network.on("click", function(e) {
                console.log(e);
                edges.add({ from: 3, to: 2 });
            });
        },
    },
};
</script>

<style scoped>
.mynetwork {
    height: 100%;
}
</style>

