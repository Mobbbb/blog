import router from '@/router'

const app = {
    namespaced: true,
    state() {
        return {
            mainTopGap: 32,
            searchText: '',
            searchFlag: false,
            activeNavIndex: '',
        }
    },
    getters: {
        mainTopStyle(state) {
            return {
                marginTop: `${state.mainTopGap}px`
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
            const navIndex = localStorage.getItem('active-nav-index') || 'home'
            commit('updateActiveNavIndex', navIndex)
        },
        searchHandle({ state, rootGetters, commit, dispatch }) {
            const { name } = router.currentRoute.value
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
