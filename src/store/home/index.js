import listData from '@/single-page/home/data.js'
import { months, sortListConfig } from '@/config/constant.js'
import { 
    initHomListData,
    sortDataByDate,
    sortFilterDataByScore,
    filterDataByText, 
    filterDataByLabel, 
    filterDataByRateScore,
    homeRateScoreConfig,
    homeTotalScore,
} from '@/libs/data-processing'
import { deepClone } from '@/libs/util'

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
            availableYears.sort((a, b) => a - b)
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
        hasSelectedFilter(state) {
            return state.selectedFilter.label.length 
                || (state.selectedFilter.rateScore[0] !== 0 || state.selectedFilter.rateScore[1] !== homeTotalScore)
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
        sortFilterDataByScore(state) {
            state.filterSearchTextData.sort((a, b) => b.score - a.score)
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
            commit('updateActiveMonth', localStorage.getItem('pick-month') || months[0].value)
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
        filterDataByConfig({ state, commit }, text) {
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
            if (state.selectedFilter.rateScore[0] !== 0 || state.selectedFilter.rateScore[1] !== homeTotalScore) {
                filterData = filterDataByRateScore(state.selectedFilter.rateScore, filterData)
            }

            // 按日期排序输出
            if (state.selectedSortType === sortListConfig[0].value) {
                filterData = sortDataByDate(filterData)
            } else if (state.selectedSortType === sortListConfig[1].value) {
                sortFilterDataByScore(filterData)
            }
            commit('setFilterSearchTextData', filterData)
        },
        setFilterConfig({ commit }, { type, data }) {
            if (type === 'label') {
                commit('setSelectedLabel', { type, data })
            } else if (type === 'rateScore') {
                commit('setSelectedRateScore', { type, data })
            }
        },
        sortDataBySortType({ state, commit }) {
            let sortData = []
            if (state.selectedSortType === sortListConfig[0].value) {
                sortData = sortDataByDate(state.filterSearchTextData)
                commit('setFilterSearchTextData', sortData)
            } else if (state.selectedSortType === sortListConfig[1].value) {
                commit('sortFilterDataByScore')
            }
        },
    },
}

export default home
