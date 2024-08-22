import {createRouter, createWebHistory} from "vue-router";
 
const Topology = () => import('@/view/topology')
const Deviceinfo = () => import('@/view/deviceinfo')
const Linkinfo = () => import('@/view/linkinfo')
const Cleantraffic = () => import("@/view/cleantraffic.vue")
 
const routes = [
    {
        path: '/',
        name: 'index',
        component: Topology
    },
    {
        path: '/topology',
        name: 'topology',
        component: Topology
    },
    {
        path: '/deviceinfo',
        name: 'deviceinfo',
        component: Deviceinfo
    },
    {
        path: '/linkinfo',
        name: 'linkinfo',
        component: Linkinfo
    },
    {
        path: '/cleantraffic',
        name: 'cleantraffic',
        component: Cleantraffic
    }
]
 
const router = createRouter({
    history: createWebHistory(),
    routes
})
 
export default router