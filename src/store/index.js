import { createStore } from 'vuex'
import app from './app'
import home from './home'
import movie from './movie'

const store = createStore({
    modules: {
        app,
        home,
        movie,
    },
})

export default store
