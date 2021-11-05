<template>
    <div class="nav-wrap">
        <div class="page-nav-wrap" :style="pageNavWrapStyle">
            <el-menu    background-color="transparent" 
                        class="el-menu-nav" 
                        mode="horizontal" 
                        :default-active="activeNavIndex" 
                        router>
                <template v-for="item in routes">
                    <el-menu-item :index="item.path" v-if="item.meta.level === 0" :key="item.path">
                        {{item.meta.name}}
                    </el-menu-item>
                </template>
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
import { routes } from '@/router'
import config, { PC } from '@/config'
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
            routes,
            showFilterContent: false,
            popoverEl: null, // 高级筛选面板
            inputEl: null, // 搜索框
        }
    },
    computed: {
        ...mapState('app', [
            'activeNavIndex',
            'mainWidth',
            'navHeight',
        ]),
        ...mapGetters('app', [
            'popoverFilterConfig',
        ]),
        pageNavWrapStyle() {
            return { 
                width: `${this.mainWidth.width * 100}%`,
                height: `${this.navHeight}px`
            }
        },
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
        this.popoverEl = this.$refs.popoverRef.$refs.popperRef
        this.inputEl = this.$refs.searchInput
    },
	methods: {
        ...mapMutations('app', [
            'updateInputValue',
        ]),
        ...mapActions('app', [
            'searchHandle',
            'resetFilterHandle',
        ]),
        onEnter() {
            this.inputEl.blur()
            this.searchHandle()
            this.hidePopoverAction()
        },
        onFocus() {
            if (Object.keys(this.popoverFilterConfig).length) {
                this.showFilterContent = true
                // 添加隐藏高级筛选的监听器
                // click事件会出现误触现象——在弹框内长按，并在弹框外mouseup，点击区域会被判定为在弹框之外
                this.eventListenerHandle('addEventListener')
            }
        },
        hidePopoverAction() {
            this.showFilterContent = false
            // 移除监听器
            this.eventListenerHandle('removeEventListener')
        },
        clickResetBtn() {
            this.updateInputValue('')
            this.resetFilterHandle()
            this.searchHandle()
            this.hidePopoverAction()
        },
        clickSearchBtn() {
            this.searchHandle()
            this.hidePopoverAction()
        },
        hidePopoverByEl(e) {
            if (!e.path.includes(this.popoverEl) && !e.path.includes(this.inputEl)) {
                this.hidePopoverAction()
            }
        },
        eventListenerHandle(type) {
            if (config.device === PC) {
                document[type]('mousedown', this.hidePopoverByEl)
            } else {
                document[type]('touchstart', this.hidePopoverByEl)
            }
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
    box-sizing: border-box;
}
.page-nav-wrap {
    position: relative;
    overflow: hidden;
	margin: 0 auto;
}
@media screen and (max-width: 530px) {
    .page-nav-wrap {
        width: 100%!important;
    }
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
