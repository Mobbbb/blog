import listData from '@/single-page/home/data.js'
import { sortListConfig, homeRateScoreConfig, January, dateType, scoreType } from '@/config/constant.js'
import { 
    initHomListData,
    sortDataByDateHandle,
    sortDataByScoreHandle,
    filterDataByText, 
    filterDataByLabel, 
    filterDataByRateScore,
    homeTotalScore,
} from '@/libs/data-processing'
import { deepClone, ascendingOrder } from '@/libs/util'

const home = {
    namespaced: true,
    state() {
        return {
            selectedSortType: '',
            selectedYears: '',
            activeMonth: '',
            animationList: [],
            filterSearchTextData: [],
            filterConfig: { // 首页高级筛选面板的配置
                allLabelArr: [],
                rateScore: homeRateScoreConfig,
            },
            selectedFilter: { // 首页高级筛选的选中项
                label: [],
                rateScore: [0, homeTotalScore],
            },
        }
    },
    getters: {
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
        showAnimationList(state, getters, rootState) {
            if (rootState.app.searchFlag) {
                return state.filterSearchTextData
            } else {
                return getters.filterDateData
            }
        },
        filterDateData(state) {
            return state.animationList.filter((item) => {
                return item.years === state.selectedYears && item.month === state.activeMonth
            })
        },
        hasSelectedRateScore(state) {
            return state.selectedFilter.rateScore[0] !== 0 || state.selectedFilter.rateScore[1] !== homeTotalScore
        },
        hasSelectedFilter(state, getters) {
            return state.selectedFilter.label.length || getters.hasSelectedRateScore
        },
    },
    mutations: {
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
        setAnimationList(state, list) {
            state.animationList = list
        },
        setFilterSearchTextData(state, list) {
            state.filterSearchTextData = list
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
        resetSelectedFilter(state) {
            state.selectedFilter = {
                label: [],
                rateScore: [0, homeTotalScore],
            }
        },
        setSelectedLabel(state, { type, data }) {
            if (!state.selectedFilter[type].includes(data)) {
                state.selectedFilter[type].push(data)
            } else {
                state.selectedFilter[type].remove(data)
            }
        },
        setSelectedRateScore(state, { type, data }) {
            state.selectedFilter[type] = data
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
        getAnimationHandle({ commit }) {
            const { data, allLabelArr } = initHomListData(deepClone(listData))
            
            commit('setAllLabelArr', allLabelArr)
            commit('setAnimationList', data)
        },
        filterDataByConfig({ state, getters, dispatch }, text) {
            let filterData = []

            // 按输入框内容进行数据筛选
            if (text !== '') {
                filterData = filterDataByText(text, state.animationList)
            } else {
                filterData = state.animationList
            }

            // 过滤勾选的label
            if (state.selectedFilter.label.length) {
                filterData = filterDataByLabel(state.selectedFilter.label, filterData)
            }

            // 过滤评分
            if (getters.hasSelectedRateScore) {
                filterData = filterDataByRateScore(state.selectedFilter.rateScore, filterData)
            }

            // 按默认排序方式输出
            dispatch('sortDataBySortType', filterData)
        },
        setFilterConfig({ commit }, { type, data }) {
            if (type === 'label') {
                commit('setSelectedLabel', { type, data })
            } else if (type === 'rateScore') {
                commit('setSelectedRateScore', { type, data })
            }
        },
        /**
         * @description 若入参filterData不为空，则按filterData排序，否则对state原始数据进行排序
         * @param {'*'} param store
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
