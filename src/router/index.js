import { createRouter, createWebHistory } from "vue-router"
import store from '@/store'

export const homeRoute = {
    path: '/',
    name: 'home',
    meta: {
        level: 0,
        name: '首页',
        navSearchMutualExclusion: true,
    },
    component: () => import('@/single-page/home/home.vue')
}
export const movieRoute = {
    path: "/movie/",
    name: "movie",
    meta: {
        level: 0,
        name: '电影',
    },
    component: () => import('@/single-page/movie/movie-page.jsx')
}
export const summaryRoute = {
    path: "/summary/",
    name: "summary",
    meta: {
        level: 0,
        name: '总结',
        navSearchMutualExclusion: false, // 页脚筛选是否与nav筛选互斥，同时也是是否显示页脚筛选的标志
    },
    component: () => import('@/single-page/summary/index.vue')
}
export const summaryDetailRoute = {
    path: "/summary/detail",
    name: "summaryDetail",
    meta: {
        level: 1,
        name: '总结详情',
        parent: 'summary',
    },
    component: () => import('@/single-page/summary/detail/index.vue')
}
export const notFoundRoute = {
    path: "/:pathMatch(.*)",
    meta: {
        level: -1,
    },
    component: () => import('@/single-page/not-found-page/index.vue')
}

export const routes = [
    homeRoute,
    movieRoute,
    summaryRoute,
    summaryDetailRoute,
    notFoundRoute,
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.afterEach((to, from, failure) => {
    const { parent: toParentName } = to.meta
    const { parent: fromParentName } = from.meta
    store.commit('app/updateActiveNavIndex', to.path)
    // 重置搜索态，父子路由的切换无需重置
    if (store.state.app.searchFlag && from.name !== toParentName && to.name !== fromParentName) {
        // 清空输入框，重置搜索状态
        store.commit('app/updateInputValue', '')
        store.commit('app/updateSearchFlag', false)
    }
})

export default router
