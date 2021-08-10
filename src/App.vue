<template>
	<div class="app-main" @click="handleSelect">
		<NavMenu></NavMenu>
		<div class="main-wrap" :style="store.getters['app/mainTopStyle']">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
import NavMenu from '@/single-page/componnets/nav-menu.vue'
import { useStore } from 'vuex'

export default {
  	name: 'App',
	components: {
		NavMenu,
	},
	setup() {
		const store = new useStore()
		return {
			store
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
	background-position: 0 61px;
	padding: 61px 12px 12px 12px;
	box-sizing: border-box;
	height: 100%;
	width: 100%;
}
.main-wrap{
	width: 62%;
	height: calc(100% - 24px);
	min-width: 660px;
	margin: 0 auto;
	background: #fff;
	box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
	overflow: scroll;
}
</style>
