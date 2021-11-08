<template>
	<div class="app-main" :style="appMainStyle" @click="handleSelect">
		<NavMenu></NavMenu>
		<div class="main-wrap" :style="store.getters['app/mainStyle']">
			<router-view></router-view>
		</div>
		<Debugger v-if="store.state.app.showDebugger"></Debugger>
	</div>
</template>

<script>
import NavMenu from '@/single-page/componnets/nav-menu.vue'
import { computed, defineAsyncComponent } from 'vue'
import { useStore } from 'vuex'

export default {
  	name: 'App',
	components: {
		NavMenu,
		Debugger: defineAsyncComponent(() => import('./components/debugger.vue')),
	},
	setup() {
		const store = new useStore()
		return {
			store,
			appMainStyle: computed(() => {
				return { 
					paddingTop: `${store.state.app.navHeight}px`,
					backgroundPosition: `0 ${store.state.app.navHeight}px`,
				}
			}),
		}
	},
	methods: {
		
	}
}
</script>

<style scoped>
.app-main{
	background: url('//mobbbb.top/resource/home-assets/images/bg.jpg');
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
	overflow-y: auto;
	border-radius: 2px;
}
</style>
