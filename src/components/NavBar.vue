<template>
    <nav class="nav-top">
        <ul class="nav-ul">
            <li class="nav-li" :class="{'chosen': chosen == 0, 'unchosen': chosen != 0}"
            @click="this.chosen = 0">
                <router-link :to="{ name: 'topology'}" class="page-link">
                    网络拓扑
                </router-link>
            </li>
            <li class="nav-li" :class="{'chosen': chosen == 1, 'unchosen': chosen != 1}"
            @click="this.chosen = 1">
                <router-link :to="{ name: 'deviceinfo'}" class="page-link">
                    设备信息
                </router-link>
            </li>
            <li class="nav-li" :class="{'chosen': chosen == 2, 'unchosen': chosen != 2}"
            @click="this.chosen = 2">
                <router-link :to="{ name: 'linkinfo'}" class="page-link">
                    链路信息
                </router-link>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    name: 'App',
    data(){
        return {
            chosen: -1,
        }
    },
}
</script>

<style lang="css" scoped>
.nav-top {
    width: 100vw;
    height: 10vh;
    background-color: rgb(6,56,102);
    display: flex;
    justify-content: center;
    border-bottom: 1.5px solid rgb(56,115,165);
}

.nav-ul {
    width: 67%;
    height: 100%;
    display: flex;
    justify-content: center;
}

.nav-li {
    width: 20%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.page-link {
    font-size: 2.5vh;
    font-weight: 500;
    font-family: '华文中宋';
    color: white;
    text-decoration: none;
}

.unchosen:hover{
    background-color: rgb(50, 103, 149);
    cursor: pointer;
}

.chosen {
    background-color: rgb(4, 75, 127);
    border-bottom: 1px solid;
    border-image: linear-gradient(to right, rgb(48, 121, 168), rgb(170, 220, 254), rgb(48, 121, 168)) 1;
}

</style>