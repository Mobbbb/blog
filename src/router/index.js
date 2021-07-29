import { createRouter, createWebHashHistory } from "vue-router"
import store from '@/store'

export const home = {
    path: '/home',
    name: 'home',
    component: () => import('@/single-page/home/home.vue')
}
export const movie = {
    path: "/movie",
    name: "movie",
    component: () => import('@/single-page/movie/movie-page.jsx')
}
export const summary = {
    path: "/summary",
    name: "summary",
    component: () => import('@/single-page/summary/index.vue')
}

const routes = [
    { path: "/", redirect: "/home" },
    home,
    movie,
    summary,
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

router.afterEach((to, from, failure) => {
    localStorage.setItem('active-nav-index', to.name)
    if (store.state.app.searchFlag) {
        // 清空输入框，重置搜索状态
        store.commit('app/updateInputValue', '')
        store.commit('app/updateSearchFlag', false)
        // store.dispatch('app/resetFilterHandle')
    }
})

export default router
