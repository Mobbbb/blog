import { createStore } from 'vuex'
import app from './app'
import home from './home'
import movie from './movie'
import summary from './summary'

const store = createStore({
    modules: {
        app,
        home,
        movie,
        summary,
    },
})

export default store
