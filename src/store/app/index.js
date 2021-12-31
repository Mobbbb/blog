import router, { homeRoute, movieRoute, summaryRoute } from '@/router'

const app = {
    namespaced: true,
    state() {
        return {
            navHeight: 60,
            mainGap: [32, 0, 8, 0],
            mainWidth: {
                width: 0.62,
                minWidth: 332,
            },

            installConfig: {
                appPromptEvent: null,
                showBtn: false,
            },

            searchText: '',
            searchFlag: false,
            activeNavIndex: '',

            debuggerText: '',
            showDebugger: false,
        }
    },
    getters: {
        mainStyle(state) {
            return {
                marginTop: `${state.mainGap[0]}px`,
                width: `${state.mainWidth.width * 100}%`,
                minWidth: `${state.mainWidth.minWidth}px`,
                height: `calc(100% - ${state.mainGap[0] + state.mainGap[2]}px)`,
            }
        },
        showFooterTools(state) {
            const { meta } = router.currentRoute.value
            const { navSearchMutualExclusion } = meta
            let flag = navSearchMutualExclusion === false

            if (navSearchMutualExclusion) {
                flag = !state.searchFlag
            }
            return flag
        },
        popoverFilterConfig(state, getters, rootState) { // 高级筛选面板的选项配置
            const { name } = router.currentRoute.value
            return rootState[name] && rootState[name].filterConfig || {}
        },
        popoverSelectedFilter(state, getters, rootState) { // 选中的高级筛选集合
            const { name } = router.currentRoute.value
            return rootState[name] && rootState[name].selectedFilter || {}
        },
        innerPageFilterConfig(state, getters, rootState) { // 页脚筛选面板的选项配置
            const { name } = router.currentRoute.value
            return rootState[name] && rootState[name].innerPageFilterConfig || {}
        },
        innerPageSelectedFilter(state, getters, rootState) { // 选中的页脚筛选集合
            const { name } = router.currentRoute.value
            return rootState[name] && rootState[name].innerPageSelectedFilter || []
        },
    },
    mutations: {
        updateInputValue(state, value) {
            state.searchText = value
        },
        updateSearchFlag(state, value) {
            state.searchFlag = value
        },
        updateActiveNavIndex(state, value) {
            state.activeNavIndex = value
        },
        updateDebuggerText(state, value) {
            state.debuggerText = value
        },
        updateDebuggerShowStatus(state, value) {
            state.showDebugger = value
        },
        setAppPromptEvent(state, event) {
            state.installConfig.appPromptEvent = event
        },
        setInstallBtnShowStatus(state, status) {
            state.installConfig.showBtn = status
        },
    },
    actions: {
        searchHandle({ state, rootGetters, commit, dispatch }) {
            const { name } = router.currentRoute.value
            const searchRouteList = [homeRoute.name, movieRoute.name, summaryRoute.name]

            if (!searchRouteList.includes(name)) return

            if (state.searchText === 'MOBBBB') {
                commit('updateDebuggerShowStatus', true)
            } else if (state.searchText.trim() === '' && !rootGetters[`${name}/hasSelectedFilter`]) {
                commit('updateSearchFlag', false)
            } else {
                commit('updateSearchFlag', true)
                dispatch(`${name}/filterDataByConfig`, state.searchText, { root: true })
            }
        },
        dispatchCommit({ commit }, { commitName, data = {} }) {
            const { name } = router.currentRoute.value
            commit(`${name}/${commitName}`, data, { root: true })
        },
        registerServiceWorker({ commit }) {
            window.addEventListener('load', function() {
				if ('serviceWorker' in navigator) {
					navigator.serviceWorker.register('/sw.js')
				}
				window.addEventListener('beforeinstallprompt', (event) => { // 若当前未安装
					event.preventDefault()
					commit('setAppPromptEvent', event)
					commit('setInstallBtnShowStatus', true)
				})
				window.addEventListener('appinstalled', () => { // 已安装
					commit('setInstallBtnShowStatus', false)
				})
			})
        },
    },
}

export default app
