import listData from '@/single-page/movie/data.js'
import { deepClone } from '@/libs/util'
import { filterDataByRateScore, filterDataByText, movieTotalScore } from '@/libs/data-processing'
import { movieRateScoreConfig } from '@/config/constant.js'

const movie = {
    namespaced: true,
    state() {
        return {
            movieList: [],
            filterSearchTextData: [],
            filterConfig: {
                rateScore: movieRateScoreConfig,
            },
            selectedFilter: {
                rateScore: [0, movieTotalScore],
            },
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
        hasSelectedRateScore(state) {
            return state.selectedFilter.rateScore[0] !== 0 || state.selectedFilter.rateScore[1] !== homeTotalScore
        },
        hasSelectedFilter(state, getters) {
            return getters.hasSelectedRateScore
        },
    },
    mutations: {
        setFilterSearchTextData(state, value) {
            state.filterSearchTextData = value
        },
        setMovieList(state, value) {
            state.movieList = value
        },
        resetSelectedFilter(state) {
            state.selectedFilter = {
                rateScore: [0, movieTotalScore],
            }
        },
        setSelectedRateScore(state, { type, data }) {
            state.selectedFilter[type] = data
        },
    },
    actions: {
        getMovieListHandle({ commit }) {
            const _listData = deepClone(listData)
            commit('setMovieList', _listData)
        },
        filterDataByConfig() {

        },
        filterDataByConfig({ state, getters, commit }, text) {
            let filterData = []

            // 按输入框内容进行数据筛选
            if (text !== '') {
                filterData = filterDataByText(text, state.movieList)
            } else {
                filterData = state.movieList
            }

            // 过滤评分
            if (getters.hasSelectedRateScore) {
                filterData = filterDataByRateScore(state.selectedFilter.rateScore, filterData)
            }
            
            commit('setFilterSearchTextData', filterData)
        },
        setFilterConfig({ commit }, { type, data }) {
            if (type === 'rateScore') {
                commit('setSelectedRateScore', { type, data })
            }
        },
    },
}

export default movie
