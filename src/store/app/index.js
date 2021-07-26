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
        searchPopoverData(state, getters, rootState) {
            if (router.currentRoute.value.name === home.name) {
                return rootState.home.allLabelArr
            }
            return []
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
        searchHandle({ state, commit, dispatch }) {
            if (state.searchText.trim() === '') {
                commit('updateSearchFlag', false)
            } else if (router.currentRoute.value.name === home.name) {
                commit('updateSearchFlag', true)
                dispatch('home/filterDataBySearchText', state.searchText, { root: true })
            } else if (router.currentRoute.value.name === movie.name) {
                commit('updateSearchFlag', true)
                dispatch('movie/filterDataBySearchText', state.searchText, { root: true })
            }
        },
    },
}

export default app
