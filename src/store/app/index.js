import router, { home, movie } from '@/router'

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
            if (router.currentRoute.value.name === home.name) {
                return rootState.home.filterConfig
            } else if (router.currentRoute.value.name === movie.name) {
                return rootState.movie.filterConfig
            }
            return {}
        },
        popoverSelectedFilter(state, getters, rootState) { // 选中的高级筛选集合
            if (router.currentRoute.value.name === home.name) {
                return rootState.home.selectedFilter
            } else if (router.currentRoute.value.name === movie.name) {
                return rootState.movie.selectedFilter
            }
            return {}
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
            if (router.currentRoute.value.name === home.name) {
                if (state.searchText.trim() === '' && !rootGetters['home/hasSelectedFilter']) {
                    commit('updateSearchFlag', false)
                } else {
                    commit('updateSearchFlag', true)
                    dispatch('home/filterDataByConfig', state.searchText, { root: true })
                }
            } else if (router.currentRoute.value.name === movie.name) {
                commit('updateSearchFlag', true)
                dispatch('movie/filterDataBySearchText', state.searchText, { root: true })
            }
        },
        setFilterHandle({ dispatch }, { type, data }) {
            if (router.currentRoute.value.name === home.name) {
                dispatch('home/setFilterConfig', { type, data }, { root: true })
            }
        },
        resetFilterHandle({ commit }) {
            commit('home/resetSelectedFilter', {}, { root: true })
        },
    },
}

export default app
