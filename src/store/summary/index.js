import { fetchSummaryListData } from '@/api/summary.js'
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
            const { data: listData = [] } = await fetchSummaryListData()
            commit('setLoadingStatus', false)

            initSummaryListData(listData)
            commit('setArticleList', listData)
        },
    },
}

export default summary
