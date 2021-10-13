<template>
    <div class="nav-wrap">
        <div class="page-nav-wrap">
            <el-menu    background-color="transparent" 
                        class="el-menu-nav" 
                        mode="horizontal" 
                        :default-active="activeNavIndex" 
                        @select="handleSelect" 
                        router>
                <el-menu-item index="/home">首页</el-menu-item>
                <el-menu-item index="/movie">电影评价</el-menu-item>
                <el-menu-item index="/summary">总结</el-menu-item>
            </el-menu>
        
            <el-popover placement="bottom-end"
                        title="高级筛选"
                        :width="320"
                        :show-arrow="false"
                        :offset="5"
                        ref="popoverRef"
                        trigger="manual"
                        popper-class="search-input-popover"
                        v-model:visible="showFilterContent">
                <template #reference>
                    <div class="search-input-wrap">
                        <i class="el-icon-search search-icon"></i>
                        <input  placeholder="请输入剧名" 
                                @keydown.enter="onEnter"
                                @focus="onFocus"
                                type="text"
                                ref="searchInput"
                                class="search-input" 
                                v-model="searchText">
                    </div>
                </template>
                <PopoverFilter @on-reset="clickResetBtn" @on-search="clickSearchBtn"></PopoverFilter>
            </el-popover>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import DescLabel from '@/single-page/home/desc-label.vue'
import PopoverFilter from './popover-filter.vue'

export default {
  	name: 'nav-menu',
    components: {
        DescLabel,
        PopoverFilter,
    },
    data() {
        return {
            showFilterContent: false,
            popoverEl: null, // 高级筛选面板
            inputEl: null, // 搜索框
        }
    },
    computed: {
        ...mapState('app', [
            'activeNavIndex',
        ]),
        ...mapGetters('app', [
            'popoverFilterConfig',
        ]),
        searchText: {
            get() {
                return this.$store.state.app.searchText
            },
            set(value) {
                this.updateInputValue(value)
            },
        },
    },
    mounted() {
        this.initActiveNavIndex()
        this.popoverEl = this.$refs.popoverRef.$refs.popperRef
        this.inputEl = this.$refs.searchInput
    },
	methods: {
        ...mapMutations('app', [
            'updateInputValue',
            'updateActiveNavIndex',
        ]),
        ...mapActions('app', [
            'searchHandle',
            'initActiveNavIndex',
            'resetFilterHandle',
        ]),
		handleSelect(activeIndex) {
            this.updateActiveNavIndex(activeIndex)
		},
        onEnter() {
            this.inputEl.blur()
            this.searchHandle()
            this.hidePopover()
        },
        onFocus() {
            if (Object.keys(this.popoverFilterConfig).length) {
                this.showFilterContent = true
                // 添加隐藏高级筛选的监听器
                // click事件会出现误触现象——在弹框内mousedown，并在弹框外mouseup，点击区域会被判定为在弹框之外
                document.addEventListener('mousedown', this.hidePopoverByEl)
            }
        },
        hidePopoverByEl(e) {
            if (!e.path.includes(this.popoverEl) && !e.path.includes(this.inputEl)) {
                this.hidePopover()
            }
        },
        hidePopover() {
            this.showFilterContent = false
            // 移除监听器
            document.removeEventListener('mousedown', this.hidePopoverByEl)
        },
        clickResetBtn() {
            this.updateInputValue('')
            this.resetFilterHandle()
            this.searchHandle()
            this.hidePopover()
        },
        clickSearchBtn() {
            this.searchHandle()
            this.hidePopover()
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
.search-input-wrap {
    position: absolute;
    display: inline-block;
    width: 120px;
    height: 28px;
    line-height: 28px;
    right: 16px;
    top: 16px;
}
.search-input-wrap input {
    background: rgba(256, 256, 256, 0.3);
    border-radius: 20px;
    border: 1px solid #DCDFE6;
    box-sizing: border-box;
    display: inline-block;
    height: 28px;
    line-height: 28px;
    outline: 0;
    padding: 0 30px 0 15px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 100%;
    font-size: 12px;
    color: #606266;
}
.search-input-wrap input:focus {
    border-color: #409EFF;
    outline: 0;
}
.search-input-wrap .search-icon {
    position: absolute;
    right: 12px;
    top: 8px;
    color: #C0C4CC;
    font-size: 12px;
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
.search-input-popover {
    padding: 12px 0!important;
}
.search-input-popover > .el-popover__title {
    padding: 0 12px;
}
</style>
