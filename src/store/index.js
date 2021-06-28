import { createStore } from 'vuex'

const store = createStore({
    state() {
        return {
            mainTopGap: 32
        }
    },
    getters: {
        mainTopStyle(state) {
            return {
                marginTop: `${state.mainTopGap}px`
            }
        }
    },
})

export default store