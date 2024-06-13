import {createRouter, createWebHistory} from "vue-router";
 
const Topology = () => import('@/view/topology')
const Deviceinfo = () => import('@/view/deviceinfo')
const Linkinfo = () => import('@/view/linkinfo')
 
const routes = [
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
    }
]
 
const router = createRouter({
    history: createWebHistory(),
    routes
})
 
export default router