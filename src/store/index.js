import { createStore } from 'vuex'

const store = createStore({
    state() {
        return {
            mainTopGap: 32,
            searchText: '',
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
    },
})

export default store