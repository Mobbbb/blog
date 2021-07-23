import { createStore } from 'vuex'
import app from './app'
import home from './home'

const store = createStore({
    modules: {
        app,
        home,
    },
})

export default store
