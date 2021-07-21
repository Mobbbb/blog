<template>
    <div class="nav-wrap">
        <div class="page-nav-wrap">
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
        
            <el-input
                placeholder="请输入番名"
                suffix-icon="el-icon-search"
                class="search-input"
                size="mini"
                v-model="searchText">
            </el-input>
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  	name: 'nav-menu',
    data() {
        return {
            activeIndex: '',
        }
    },
    computed: {
        searchText: {
            get() {
                return this.$store.state.searchText
            },
            set(value) {
                this.updateInputValue(value)
            },
        },
    },
    mounted() {
        this.activeIndex = localStorage.getItem('active-nav-index') || 'home'
    },
	methods: {
        ...mapMutations([
            'updateInputValue',
        ]),
		handleSelect(activeIndex) {
            this.activeIndex = activeIndex
		},
	}
}
</script>

<style scoped>
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
.page-nav-wrap {
    position: relative;
	width: 62%;
	margin: 0 auto;
}
.search-input {
    display: inline-block;
    width: 120px;
    position: absolute;
    top: 16px;
    right: 0;
}
</style>

<style>
.el-menu-nav > .is-active{
    border-color: #a5d1ff !important;
    background-color: transparent !important;
}
.el-menu-nav > .el-menu-item:hover{
    background-color: transparent !important;
}
.search-input .el-input__inner {
    background: rgba(256, 256, 256, 0.3);
    border-radius: 20px;
}
</style>
