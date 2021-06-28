<template>
    <div class="nav-wrap">
        <el-menu    background-color="transparent" 
                    class="el-menu-nav" 
                    mode="horizontal" 
                    :default-active="activeIndex" 
                    @select="handleSelect" 
                    router>
            <el-menu-item index="home">首页</el-menu-item>
            <el-menu-item index="movie">电影评价</el-menu-item>
            <el-menu-item index="summary">总结</el-menu-item>
        </el-menu>
    </div>
</template>

<script>
export default {
  	name: 'nav-menu',
    data() {
        return {
            activeIndex: '',
        }
    },
    mounted() {
        this.activeIndex = localStorage.getItem('active-nav-index') || 'home'
    },
	methods: {
		handleSelect(activeIndex) {
            this.activeIndex = activeIndex
		}
	}
}
</script>

<style>
.nav-wrap{
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	z-index: 100;
	background: linear-gradient(to right, #3c384bda, #d7c8cbe5 9%, #e9dfd8dc 15%, #fbfbfb 30%, #fbfbfb 70%, #e9dfd8dc 85%, #d7c8cbe5 91.5%, #3c384baf);
    border-bottom: 1px solid #e6e6e6;
    height: 61px;
    box-sizing: border-box;
}
.el-menu{
	width: 62%;
	margin: 0 auto;
}
.el-menu-nav > .is-active{
    border-color: #a5d1ff !important;
    background-color: transparent !important;
}
.el-menu-nav > .el-menu-item:hover{
    background-color: transparent !important;
}
</style>
