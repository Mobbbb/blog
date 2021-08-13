import { fetchMovieListData } from '@/api/movie.js'
import { initSummaryListData } from '@/libs/data-processing'

const summary = {
    namespaced: true,
    state() {
        return {
            isLoading: false,
            articleList: [],
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
        filterSelectedStatusConfig(state) {
            const hasSelectedRateScore = state.selectedFilter.rateScore[0] !== 0 
            || state.selectedFilter.rateScore[1] !== movieTotalScore

            return {
                hasSelectedRateScore,
            }
        },
        hasSelectedFilter(state, getters) {
            return Object.keys(getters.filterSelectedStatusConfig)
                    .filter(key => getters.filterSelectedStatusConfig[key])
                    .length
        },
    },
    mutations: {
        setArticleList(state, value) {
            state.articleList = value
        },
        setLoadingStatus(state, status) {
            state.isLoading = status
        },
    },
    actions: {
        async getSummaryHandle({ state, commit }) {
            if (state.articleList.length) return 

            commit('setLoadingStatus', true)
            // const { data: listData } = await fetchMovieListData()
            let listData = [
                {
                    title: '这里是写总结的地方',
                    label: ['HTML'],
                    content: [
                        {
                            type: 'text',
                            value: '如有侵权或错误处，可在github.com/Mobbbb联系我。If there is any infringement or error, please contact me at github.com/mobbbb.                            ',
                        },
                        {
                            type: 'img',
                            value: '',
                        },
                        {
                            type: 'code',
                            value: '',
                        },
                    ],
                    date: '2021-06-06',
                }
            ]
            initSummaryListData(listData)
            commit('setLoadingStatus', false)

            commit('setArticleList', listData)
        },
    },
}

export default summary
