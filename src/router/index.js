import { createRouter, createWebHashHistory } from "vue-router"
import store from '@/store'

export const homeRoute = {
    path: '/home',
    name: 'home',
    component: () => import('@/single-page/home/home.vue')
}
export const movieRoute = {
    path: "/movie",
    name: "movie",
    component: () => import('@/single-page/movie/movie-page.jsx')
}
export const summaryRoute = {
    path: "/summary",
    name: "summary",
    component: () => import('@/single-page/summary/index.vue')
}
export const summaryDetailRoute = {
    path: "/summary/detail",
    name: "summaryDetail",
    component: () => import('@/single-page/summary/detail/index.vue')
}

const routes = [
    { path: "/", redirect: "/home" },
    homeRoute,
    movieRoute,
    summaryRoute,
    summaryDetailRoute,
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

router.afterEach((to, from, failure) => {
    store.commit('app/updateActiveNavIndex', to.path)
    if (store.state.app.searchFlag) {
        // 清空输入框，重置搜索状态
        store.commit('app/updateInputValue', '')
        store.commit('app/updateSearchFlag', false)
        // store.dispatch('app/resetFilterHandle')
    }
})

export default router
