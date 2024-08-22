<template>
    <ul class="basicInfoList">
        <li v-for="(item) in this.nodeData" v-bind:key="item.list"
            :class="{'selector_selected': this.chosen == item.list, 'selector_unselected': this.chosen != item.list}">
            <div class="large-li" @click="seeDetail(item.list)">
                <div class="colorBlock"></div>
                <span class="attrName">{{item.id}}</span>
                <span class="attrValue"></span>
            </div>
            <div>
                <ol class="smallList" v-if="this.chosen == item.list">
                    <li v-for="(ip) in item.ips" v-bind:key="ip" class="small-li">
                        <span class="blockedip">{{ ip.ip }}</span>
                        <span class="ipstate">{{ (ip.block) ? "已屏蔽" : "已放行" }}</span>
                    </li>
                </ol>
            </div>
        </li>
    </ul>
</template>

<script>

export default {
    name: 'TopologyList',
    props: ['nodeData','type'],
    data(){
        return{
            chosen: -1,
        }
    },
    methods: {
        seeDetail(e){
            console.log('this.type', this.type);
            console.log(this.nodeData);
            if(this.type){
                return;
            }
            this.$emit('updatehost', e);
            if (this.chosen == e) {
                this.chosen = -1;
            } else {
                this.chosen = e;
            }
        }
    }
}
</script>


<style scoped>
.large-li{
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

.smallList li{
    width: 100%;
    height: 4vh;
    list-style: none;
    position: relative;

    display: flex;
}

.blockedip {
    width: 80%;
    display: block;
    height: 3vh;
    color: rgb(18, 235, 241);
    font-size: 13px;
    display: flex;
    justify-content: start;
    align-items: center;
    margin-left: 1vw;
}

.ipstate {
    width: 20%;
    display: block;
    height: 3vh;
    color: whitesmoke;
    font-size: 13px;
    display: flex;
    justify-content: start;
    align-items: center;
    margin-left: 1vw;
}


.smallList li:hover{
    background-color: rgb(5, 77, 128);
    cursor: pointer;
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

</style>