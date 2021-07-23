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
        }
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
            } else {
                commit('updateSearchFlag', true)
                dispatch('home/filterDataBySearchText', state.searchText, { root: true })
            }
        },
    },
}

export default app
