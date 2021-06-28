import { createRouter, createWebHashHistory } from "vue-router"

const home = () => import('@/single-page/home/home.vue')
const movie = () => import('@/single-page/movie/movie-page.jsx')
const summary = () => import('@/single-page/summary/index.vue')

const routes = [
    { path: "/", redirect: "/home" },
    {
        path: "/home",
        name: "home",
        component: home
    },
    {
        path: "/movie",
        name: "movie",
        component: movie
    },
    {
        path: "/summary",
        name: "summary",
        component: summary
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    localStorage.setItem('active-nav-index', to.name)
    next()
})

export default router
