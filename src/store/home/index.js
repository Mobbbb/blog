import listData, { months } from '@/single-page/home/data.js'
import { sortDataByDate, filterDataByText, filterDataByLabel } from '@/libs/data-processing'
import { deepClone } from '@/libs/util'
import { ref } from 'vue'

const home = {
    namespaced: true,
    state() {
        return {
            selectedYears: '',
            activeMonth: '',
            animationList: [],
            filterSearchTextData: [],
            filterConfig: {
                allLabelArr: [],
            },
            selectedFilter: {
                label: [],
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
            let flag = false
            Object.keys(state.selectedFilter).forEach(key => {
                if (Array.isArray(state.selectedFilter[key]) && state.selectedFilter[key].length) {
                    flag = true
                }
            })

            return flag
        },
    },
    mutations: {
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
        setAllLabelArr(state, data) {
            state.filterConfig.allLabelArr = data
        },
        resetSelectedFilter(state) {
            state.selectedFilter = {
                label: [],
            }
        },
        setSelectedLabel(state, { type, data }) {
            if (!state.selectedFilter[type].includes(data)) {
                state.selectedFilter[type].push(data)
            } else {
                state.selectedFilter[type].remove(data)
            }
        },
    },
    actions: {
        initDate({ commit }) {
            const years = (new Date()).getFullYear().toString()
            commit('updateYears', localStorage.getItem('pick-years') || years)
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
            const allLabelArr = []
            const _listData = deepClone(listData)
            _listData.forEach((item, index) => {
                let labelArr = [], hoverShowLabel = []
                item.label.forEach(name => {
                    if (!allLabelArr.includes(name)) {
                        allLabelArr.push(name)
                    }
                    labelArr.push({ name })
                    hoverShowLabel.push(name)
                })

                item.showName = item.name
                if (item.season) {
                    item.showName += ' ' + item.season
                }
                item.label = labelArr
                item.hoverShowLabel = ref(hoverShowLabel)

                item._index = index
            })
            allLabelArr.sort((a, b) => a.length - b.length)
            commit('setAllLabelArr', allLabelArr)
            commit('setAnimationList', _listData)
        },
        filterDataByConfig({ state, commit }, text) {
            let filterData = []

            // 按输入框内容进行数据筛选
            if (text !== '') {
                filterData = filterDataByText(text, state.animationList)
            } else if (state.selectedFilter.label.length) {
                filterData = state.animationList
            }

            // 过滤勾选的label
            if (state.selectedFilter.label.length) {
                filterData = filterDataByLabel(state.selectedFilter.label, filterData)
            }

            // 排序输出
            filterData = sortDataByDate(filterData)
            commit('setFilterSearchTextData', filterData)
        },
        setFilterConfig({ commit }, { type, data }) {
            if (type === 'label') {
                commit('setSelectedLabel', { type, data })
            }
        },
    },
}

export default home
