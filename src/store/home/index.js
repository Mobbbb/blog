import {
    othersCheckConfig,
    hideScoreConfig, 
    sortListConfig, 
    homeRateScoreConfig, 
    January, 
    dateType, 
    scoreType,
    terminationConfig,
    unratedConfig,
} from '@/config/constant.js'
import { 
    initHomeListData,
    sortDataByDateHandle,
    sortDataByScoreHandle,
    filterDataByText, 
    filterDataByLabel, 
    filterDataByRateScore,
    filterDataByHideScore,
    filterDataByOthersCheck,
    homeTotalScore,
} from '@/libs/data-processing'
import { deepClone, ascendingOrder } from '@/libs/util'
import { fetchHomeListData, fetchScoreMap } from '@/api/home.js'
import router from '@/router'

/**
 * @description 新增筛选项步骤
 * 1、增加渲染筛选面板的state.filterConfig配置
 * 2、popover-filter.vue增加对应渲染节点
 * 3、增加选中数据集合state.selectedFilter的字段配置
 * 4、更新是否已选中当前选项getters.filterSelectedStatusConfig
 * 5、在action/filterDataByConfig中增加数据过滤方法
 */
const initSelectedFilter = {
    label: [],
    rateScore: [0, homeTotalScore],
    hideScore: [],
    others: [],
}

const home = {
    namespaced: true,
    state() {
        return {
            selectedSortType: '',
            selectedYears: '',
            activeMonth: '',
            isLoading: false,
            animationList: [],
            filterSearchTextData: [], // nav高级筛选结果
            filterConfig: { // 首页高级筛选面板的配置
                allLabelArr: [],
                rateScore: homeRateScoreConfig,
                hideScore: hideScoreConfig,
                others: othersCheckConfig,
            },
            selectedFilter: deepClone(initSelectedFilter), // 首页高级筛选的选中项
            innerPageFilterConfig: [terminationConfig, unratedConfig], // 首页页脚筛选的配置
            innerPageSelectedFilter: [], // 页内筛选的选中项
        }
    },
    getters: {
        showAnimationList(state, getters, rootState) {
            if (rootState.app.searchFlag) {
                return state.filterSearchTextData
            } else {
                return getters.innerPageFilterData
            }
        },
        innerPageFilterData(state) { // 常规展示的年-月数据项
            const currentTimeData = state.animationList.filter((item) => {
                return item.years === state.selectedYears && item.month === state.activeMonth
            })

            // 过滤页脚的筛选项
            return filterDataByOthersCheck(state.innerPageSelectedFilter, currentTimeData)
        },
        filterSelectedStatusConfig(state) { // nav筛选面板选中情况
            const hasSelectedRateScore = state.selectedFilter.rateScore[0] !== 0 
            || state.selectedFilter.rateScore[1] !== homeTotalScore

            return {
                hasSelectedLabel: state.selectedFilter.label.length,
                hasSelectedRateScore,
                hasSelectedHideScore: state.selectedFilter.hideScore.length,
                hasSelectedOthers: state.selectedFilter.others.length,
            }
        },
        hasSelectedFilter(state, getters) { // nav筛选面板是否存在选中项
            return Object.keys(getters.filterSelectedStatusConfig)
                    .filter(key => getters.filterSelectedStatusConfig[key])
                    .length
        },
        availableYears(state) {
            const availableYears = []
            state.animationList.forEach(item => {
                if (!availableYears.includes(item.years)) {
                    availableYears.push(item.years)
                }
            })
            availableYears.sort(ascendingOrder())
            return availableYears
        },
    },
    mutations: {
        setFilterSearchTextData(state, list) {
            state.filterSearchTextData = list
        },
        setAnimationList(state, list) {
            state.animationList = list
        },
        setLoadingStatus(state, status) {
            state.isLoading = status
        },
        setInnerPageSelectedFilter(state, data) {
            state.innerPageSelectedFilter = data
        },
        resetSelectedFilter(state) {
            state.selectedFilter = deepClone(initSelectedFilter)
        },
        updateSelectedSortType(state, value) {
            state.selectedSortType = value
        },
        updateYears(state, value) {
            state.selectedYears = value
            localStorage.setItem('pick-years', value)
        },
        updateActiveMonth(state, value) {
            state.activeMonth = value
            localStorage.setItem('pick-month', value)
        },
        sortFilterDataByScore(state, data = []) {
            if (data.length) {
                state.filterSearchTextData = sortDataByScoreHandle(data)
            } else {
                sortDataByScoreHandle(state.filterSearchTextData)
            }
        },
        sortFilterDataByDate(state, data = []) {
            let sortData = data.length ? data : state.filterSearchTextData
            state.filterSearchTextData = sortDataByDateHandle(sortData)
        },
        setAllLabelArr(state, data) {
            state.filterConfig.allLabelArr = data
        },
        setSelectedLabel(state, data) {
            if (!state.selectedFilter.label.includes(data)) {
                state.selectedFilter.label.push(data)
            } else {
                state.selectedFilter.label.remove(data)
            }
        },
        setSelectedRateScore(state, data) {
            state.selectedFilter.rateScore = data
        },
        setSelectedHideScore(state, data) {
            state.selectedFilter.hideScore = data
        },
        setSelectedOthers(state, data) {
            state.selectedFilter.others = data
        },
    },
    actions: {
        initHomeHeader({ commit }) {
            const initYears = '2021'
            commit('updateSelectedSortType', sortListConfig[0].value)
            commit('updateYears', localStorage.getItem('pick-years') || initYears)
            commit('updateActiveMonth', localStorage.getItem('pick-month') || January.value)
        },
        changeYearsHandle({ state, getters, commit }, value) {
            let years = ''
            getters.availableYears.forEach((item, index) => {
                if (item === state.selectedYears) {
                    years = getters.availableYears[index + value]
                }
            })
            commit('updateYears', years)
        },
        async getAnimationHandle({ state, commit }) { // 数据获取
            if (state.animationList.length) return

            commit('setLoadingStatus', true)
            // 列表数据
            let { data: listData = [] } = await fetchHomeListData() || {}
            // 评分规则
            let { data: scoreMap = {} } = await fetchScoreMap() || {}
            commit('setLoadingStatus', false)

            const { data, allLabelArr } = initHomeListData(scoreMap, listData)
            
            commit('setAllLabelArr', allLabelArr)
            commit('setAnimationList', data)
        },
        /**
         * @description 按筛选条件过滤数据
         * @param {*} store 
         * @param {*} text 输入框内容
         */
        filterDataByConfig({ state, getters, commit, dispatch }, text) {
            let filterData = [], rawMaterial = []
            const { meta } = router.currentRoute.value
            const { navSearchMutualExclusion } = meta
            if (navSearchMutualExclusion) {
                rawMaterial = state.animationList
            } else {
                rawMaterial = getters.innerPageFilterData
            }

            // 按输入框内容进行数据筛选
            if (text !== '') {
                filterData = filterDataByText(text, rawMaterial)
            } else {
                filterData = rawMaterial
            }

            // 过滤勾选的label
            if (getters.filterSelectedStatusConfig.hasSelectedLabel) {
                filterData = filterDataByLabel(state.selectedFilter.label, filterData)
            }

            // 过滤评分
            if (getters.filterSelectedStatusConfig.hasSelectedRateScore) {
                filterData = filterDataByRateScore(state.selectedFilter.rateScore, filterData)
            }

            // 过滤隐藏分
            if (getters.filterSelectedStatusConfig.hasSelectedHideScore) {
                filterData = filterDataByHideScore(state.selectedFilter.hideScore, filterData)
            }

            // 过滤其他筛选项
            if (getters.filterSelectedStatusConfig.hasSelectedOthers) {
                filterData = filterDataByOthersCheck(state.selectedFilter.others, filterData)
            }

            if (filterData.length) {
                // 存在需要输出的数据
                // 将当前数据按当前排序方式输出
                dispatch('sortDataBySortType', filterData)
            } else {
                // 不存在需要输出的数据
                // 直接输出为空
                commit('setFilterSearchTextData', filterData)
            }
        },
        /**
         * @description 若入参不为空，则按入参数据排序输出，否则对当前正在展示的数据进行重新排序
         * @param {*} store
         * @param {*} filterData
         */
        sortDataBySortType({ state, commit }, filterData = []) {
            let sortData = filterData
            
            if (state.selectedSortType === dateType.value) {
                commit('sortFilterDataByDate', sortData)
            } else if (state.selectedSortType === scoreType.value) {
                commit('sortFilterDataByScore', sortData)
            }
        },
    },
}

export default home
