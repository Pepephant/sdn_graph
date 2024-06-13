<template>
    <ul class="basicInfoList">
        <li v-for="(item) in this.nodeData" v-bind:key="item.list" @click="seeDetail(item.list)"
            :class="{'selector_selected': this.chosen == item.list, 'selector_unselected': this.chosen != item.list}">
            <div class="colorBlock"></div>
            <span class="attrName">{{item.id}}</span>
            <span class="attrValue">{{item.ip}}</span>
        </li>
    </ul>
</template>

<script>

export default {
    name: 'TopologyList',
    data(){
        return{
            chosen: -1,
        }
    },
    methods: {
        seeDetail(e){
            if(this.type){
                return;
            }
            this.$emit('updatehost', e);
            this.chosen = e;
        }
    },
    props: ['nodeData','type']
}
</script>


<style scoped>
.basicInfoList li{
    width: 100%;
    height: 4vh;
    list-style: none;
    position: relative;
}

.basicInfoList li:hover{
    background-color: rgb(5, 77, 128);
    cursor: pointer;
}

.attrName {
    position: absolute;
    display: inline-block;
    line-height: 4vh;
    color: whitesmoke;
    font-size: 15px;
    left: 3vw;
}

.attrValue {
    position: absolute;
    display: inline-block;
    line-height: 4vh;
    color: rgb(18, 235, 241);
    left: 12vw;
}

.colorBlock{
    width: 0.9vh;
    height: 0.9vh;
    position: absolute;
    left: 1.6vw;
    top: 1.6vh
}

.basicInfoList li:nth-child(6n) .colorBlock{
    background-color: aquamarine;
}

.basicInfoList li:nth-child(6n+1) .colorBlock{
    background-color: greenyellow;
}
.basicInfoList li:nth-child(6n+2) .colorBlock{
    background-color: palevioletred;
}
.basicInfoList li:nth-child(6n+3) .colorBlock{
    background-color: tomato;
}
.basicInfoList li:nth-child(6n+4) .colorBlock{
    background-color: lightgoldenrodyellow;
}
.basicInfoList li:nth-child(6n+5) .colorBlock{
    background-color: darkturquoise;
}

.selector_unselected:hover{
  background-color: rgb(50, 103, 149);
  cursor: pointer;
}

.selector_selected {
  background-color: rgb(4, 75, 127);
  border-top: 1px solid;
  border-bottom: 1px solid;
  border-image: linear-gradient(to right, rgb(48, 121, 168), rgb(170, 220, 254), rgb(48, 121, 168)) 1;
}
</style>