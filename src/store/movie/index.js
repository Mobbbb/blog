import { filterDataByRateScore, filterDataByText, movieTotalScore } from '@/libs/data-processing'
import { movieRateScoreConfig } from '@/config/constant.js'
import { fetchMovieListData } from '@/api/movie.js'
import { deepClone } from '@/libs/util'

const initSelectedFilter = {
    rateScore: [0, movieTotalScore],
}

const movie = {
    namespaced: true,
    state() {
        return {
            isLoading: false,
            movieList: [],
            filterSearchTextData: [],
            filterConfig: {
                rateScore: movieRateScoreConfig,
            },
            selectedFilter: deepClone(initSelectedFilter),
        }
    },
    getters: {
        showMovieList(state, getters, rootState) {
            if (rootState.app.searchFlag) {
                return state.filterSearchTextData
            } else {
                return state.innerPageFilterData
            }
        },
        innerPageFilterData(state) {
            return state.movieList
        },
        filterSelectedStatusConfig(state) { // nav筛选面板选中情况
            const hasSelectedRateScore = state.selectedFilter.rateScore[0] !== 0 
            || state.selectedFilter.rateScore[1] !== movieTotalScore

            return {
                hasSelectedRateScore,
            }
        },
        hasSelectedFilter(state, getters) { // nav筛选面板是否存在选中项
            return Object.keys(getters.filterSelectedStatusConfig)
                    .filter(key => getters.filterSelectedStatusConfig[key])
                    .length
        },
    },
    mutations: {
        setFilterSearchTextData(state, value) {
            state.filterSearchTextData = value
        },
        setMovieList(state, value) {
            state.movieList = value
        },
        setLoadingStatus(state, status) {
            state.isLoading = status
        },
        resetSelectedFilter(state) {
            state.selectedFilter = deepClone(initSelectedFilter)
        },
        setSelectedRateScore(state, data) {
            state.selectedFilter.rateScore = data
        },
    },
    actions: {
        async getMovieListHandle({ state, commit }) { // 数据获取
            if (state.movieList.length) return 

            commit('setLoadingStatus', true)
            const { data: listData = [] } = await fetchMovieListData() || {}
            commit('setLoadingStatus', false)

            commit('setMovieList', listData)
        },
        /**
         * @description 按筛选条件过滤数据
         * @param {*} store 
         * @param {*} text 输入框内容
         */
        filterDataByConfig({ state, getters, commit }, text) {
            let filterData = []

            // 按输入框内容进行数据筛选
            if (text !== '') {
                filterData = filterDataByText(text, state.movieList)
            } else {
                filterData = state.movieList
            }

            // 过滤评分
            if (getters.filterSelectedStatusConfig.hasSelectedRateScore) {
                filterData = filterDataByRateScore(state.selectedFilter.rateScore, filterData)
            }
            
            commit('setFilterSearchTextData', filterData)
        },
    },
}

export default movie
