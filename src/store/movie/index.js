import listData from '@/single-page/movie/data.js'
import { deepClone } from '@/libs/util'

const movie = {
    namespaced: true,
    state() {
        return {
            movieList: [],
            filterSearchTextData: [],
            filterConfig: {},
            selectedFilter: {},
        }
    },
    getters: {
        showMovieList(state, getters, rootState) {
            if (rootState.app.searchFlag) {
                return state.filterSearchTextData
            } else {
                return state.movieList
            }
        },
    },
    mutations: {
        setFilterSearchTextData(state, value) {
            state.filterSearchTextData = value
        },
        setMovieList(state, value) {
            state.movieList = value
        },
    },
    actions: {
        getMovieListHandle({ commit }) {
            const _listData = deepClone(listData)
            commit('setMovieList', _listData)
        },
        filterDataBySearchText({ state, commit }, text) {
            let regStr = ['', ...text.trim().toLowerCase(), ''].join('.*')
            let reg = new RegExp(regStr)
            let filterData = state.movieList.filter(item => {
                return reg.test(item.name.toLowerCase())
            })
            commit('setFilterSearchTextData', filterData)
        },
    },
}

export default movie
