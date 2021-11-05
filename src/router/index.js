import { createRouter, createWebHistory } from "vue-router"
import store from '@/store'

export const homeRoute = {
    path: '/',
    name: 'home',
    meta: {
        level: 0,
        name: '首页',
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
    },
    component: () => import('@/single-page/summary/index.vue')
}
export const summaryDetailRoute = {
    path: "/summary/detail",
    name: "summaryDetail",
    meta: {
        level: 1,
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
    store.commit('app/updateActiveNavIndex', to.path)
    if (store.state.app.searchFlag) {
        // 清空输入框，重置搜索状态
        store.commit('app/updateInputValue', '')
        store.commit('app/updateSearchFlag', false)
        // store.dispatch('app/resetFilterHandle')
    }
})

export default router
