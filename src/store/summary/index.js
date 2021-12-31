import { fetchSummaryListData } from '@/api/summary.js'
import { initSummaryListData, filterDataByText, filterDataByOthersCheck } from '@/libs/data-processing'
import { defaultHideConfig } from '@/config/constant'
import router from '@/router'

const summary = {
    namespaced: true,
    state() {
        return {
            isLoading: false,
            articleList: [],
            filterSearchTextData: [],
            innerPageFilterConfig: [defaultHideConfig], // 页脚筛选的配置
            innerPageSelectedFilter: [defaultHideConfig.value], // 页内筛选的选中项
        }
    },
    getters: {
        showArticleList(state, getters, rootState) {
            if (rootState.app.searchFlag) {
                return state.filterSearchTextData
            } else {
                return getters.innerPageFilterData
            }
        },
        innerPageFilterData(state) {
            // 过滤页脚的筛选项
            return filterDataByOthersCheck(state.innerPageSelectedFilter, state.articleList)
        },
        filterSelectedStatusConfig(state) { // nav筛选面板选中情况
            return {}
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
        setArticleList(state, value) {
            state.articleList = value
        },
        setLoadingStatus(state, status) {
            state.isLoading = status
        },
        setInnerPageSelectedFilter(state, data) {
            state.innerPageSelectedFilter = data
        },
    },
    actions: {
        async getSummaryHandle({ state, commit }) { // 数据获取
            if (state.articleList.length) return 

            commit('setLoadingStatus', true)
            const { data: listData = [] } = await fetchSummaryListData() || {}
            commit('setLoadingStatus', false)

            initSummaryListData(listData)
            commit('setArticleList', listData)
        },
        /**
         * @description 按筛选条件过滤数据
         * @param {*} store 
         * @param {*} text 输入框内容
         */
        filterDataByConfig({ state, getters, commit }, text) {
            let filterData = [], rawMaterial = []
            const { meta } = router.currentRoute.value
            const { navSearchMutualExclusion } = meta
            if (navSearchMutualExclusion) {
                rawMaterial = state.articleList
            } else {
                rawMaterial = getters.innerPageFilterData
            }

            // 按输入框内容进行数据筛选
            if (text !== '') {
                filterData = filterDataByText(text, rawMaterial, 'title')
            } else {
                filterData = rawMaterial
            }
            
            commit('setFilterSearchTextData', filterData)
        },
    },
}

export default summary
