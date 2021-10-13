import router, { homeRoute, movieRoute, summaryRoute } from '@/router'

const app = {
    namespaced: true,
    state() {
        return {
            mainGap: [32, 0, 8, 0],
            mainWidth: {
                width: 0.62,
                minWidth: 660,
            },

            searchText: '',
            searchFlag: false,
            activeNavIndex: '',
        }
    },
    getters: {
        mainStyle(state) {
            return {
                marginTop: `${state.mainGap[0]}px`,
                width: `${state.mainWidth.width * 100}%`,
                minWidth: `${state.mainWidth.minWidth}px`,
                height: `calc(100% - ${state.mainGap[0] + state.mainGap[2]}px)`,
            }
        },
        popoverFilterConfig(state, getters, rootState) { // 高级筛选面板的选项配置
            const { name } = router.currentRoute.value
            return rootState[name] && rootState[name].filterConfig || {}
        },
        popoverSelectedFilter(state, getters, rootState) { // 选中的高级筛选集合
            const { name } = router.currentRoute.value
            return rootState[name] && rootState[name].selectedFilter || {}
        },
    },
    mutations: {
        updateInputValue(state, value) {
            state.searchText = value
        },
        updateSearchFlag(state, value) {
            state.searchFlag = value
        },
        updateActiveNavIndex(state, value) {
            state.activeNavIndex = value
            localStorage.setItem('active-nav-index', value)
        },
    },
    actions: {
        initActiveNavIndex({ commit }) {
            const navIndex = localStorage.getItem('active-nav-index') || homeRoute.path
            commit('updateActiveNavIndex', navIndex)
        },
        searchHandle({ state, rootGetters, commit, dispatch }) {
            const { name } = router.currentRoute.value
            const searchRouteList = [homeRoute.name, movieRoute.name, summaryRoute.name]

            if (!searchRouteList.includes(name)) return

            if (state.searchText.trim() === '' && !rootGetters[`${name}/hasSelectedFilter`]) {
                commit('updateSearchFlag', false)
            } else {
                commit('updateSearchFlag', true)
                dispatch(`${name}/filterDataByConfig`, state.searchText, { root: true })
            }
        },
        setFilterHandle({ commit }, { commitName, data }) {
            const { name } = router.currentRoute.value
            commit(`${name}/${commitName}`, data, { root: true })
        },
        resetFilterHandle({ commit }) {
            const { name } = router.currentRoute.value
            commit(`${name}/resetSelectedFilter`, {}, { root: true })
        },
    },
}

export default app
