import listData, { months } from '@/single-page/home/data.js'
import { sortDataByDate } from '@/libs/data-processing'
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
            allLabelArr: [],
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
            state.allLabelArr = data
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
            commit('setAllLabelArr', allLabelArr)
            commit('setAnimationList', _listData)
        },
        filterDataBySearchText({ state, commit }, text) {
            let regStr = ['', ...text.trim().toLowerCase(), ''].join('.*')
            let reg = new RegExp(regStr)
            let filterData = state.animationList.filter(item => {
                for (let i = 0; i < item.alias.length; i++) {
                    if (reg.test(item.alias[i])) {
                        return reg.test(item.alias[i].toLowerCase())
                    }
                }
                return reg.test(item.name.toLowerCase())
            })
            filterData = sortDataByDate(filterData)
            commit('setFilterSearchTextData', filterData)
        },
    },
}

export default home
