<template>
	<div class="app-main" :style="appMainStyle" @click="handleSelect" @touchmove.self.prevent>
		<NavMenu></NavMenu>
		<div class="main-wrap" :style="mainWrapStyle">
			<router-view></router-view>
			
			<FooterTools v-if="showFooterTools"></FooterTools>
			<Install v-if="showInstall"></Install>
		</div>
		<Debugger v-if="showDebugger"></Debugger>
	</div>
</template>

<script>
import NavMenu from '@/single-page/components/nav-menu.vue'
import FooterTools from '@/single-page/components/footer-tools.vue'
import { computed, defineAsyncComponent, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

export default {
  	name: 'App',
	components: {
		NavMenu,
        FooterTools,
		Debugger: defineAsyncComponent(() => import('./components/debugger.vue')),
		Install: defineAsyncComponent(() => import('./components/install.vue')),
	},
	setup() {
		const route = useRoute()
		const store = new useStore()
		const registerServiceWorker = () => store.dispatch('app/registerServiceWorker')

		onMounted(() => {
			registerServiceWorker()
		})
		
		return {
			showFooterTools: computed(() => store.getters['app/showFooterTools']),
			showInstall: computed(() => store.state.app.installConfig.showBtn),
			showDebugger: computed(() => store.state.app.showDebugger),
			mainWrapStyle: computed(() => store.getters['app/mainStyle']),
			appMainStyle: computed(() => {
				return { 
					paddingTop: `${store.state.app.navHeight}px`,
					backgroundImage: `url('${process.env.VUE_APP_HOST}/resource/home-assets/images/bg.jpg')`,
					backgroundPosition: `0 ${store.state.app.navHeight}px`,
				}
			}),
		}
	},
}
</script>

<style scoped>
.app-main{
	background-size: 100% auto;
	background-repeat: no-repeat;
	box-sizing: border-box;
	height: 100%;
	width: 100%;
}
.main-wrap{
	height: calc(100% - 40px);
	margin: 0 auto;
	box-sizing: border-box;
	background: #fff;
	box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
	border-radius: 2px;
	position: relative;
}
</style>
