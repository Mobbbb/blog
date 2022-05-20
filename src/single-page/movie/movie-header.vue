<template>
    <div class="movie-header-wrap">
        <div class="movie-header" v-if="searchFlag">
            <span>搜索结果</span>
            <div class="search-tips">共找到<span>{{showMovieList.length}}</span>条记录</div>
        </div>
        <div class="movie-header" v-else>
            <span class="movie-header-title">电影 / 电视剧</span>
        </div>
        <el-popover v-model:visible="showPopoverStatus"
                    popper-class="header-sort-popover"
                    placement="left-start"
                    trigger="click"
                    :width="100"
                    :offset="2"
                    :show-arrow="false">
            <template #reference>
                <el-button class="header-icon-btn" icon="el-icon-sort" type="text"></el-button>
            </template>
            <div v-for="item in sortListConfig" 
                :class="selectedSortType === item.value ? 'active-sort-item' : ''"
                :key="item.value" 
                class="sort-selection-item"
                @click="selectSortType(item.value)">
                {{item.label}}
            </div>
        </el-popover>
    </div>
</template>

<script>
import { months, sortListConfig } from '@/config/constant.js'
import { mapGetters, mapMutations, mapState } from 'vuex'

export default {
    name: 'movie-header',
    data() {
        return {
            months,
            sortListConfig,
            showPopoverStatus: false,
        }
    },
    computed: {
        ...mapState('app', [
            'searchFlag',
        ]),
        ...mapState('movie', [
            'selectedSortType',
        ]),
        ...mapGetters('movie', [
            'showMovieList',
        ]),
    },
    mounted() {
        this.updateSelectedSortType(sortListConfig[0].value)
    },
    methods: {
        ...mapMutations('movie', [
            'updateSelectedSortType',
        ]),
        selectSortType(value) {
            this.showPopoverStatus = false
            this.updateSelectedSortType(value)
        },
    },
}
</script>

<style scoped>
.movie-header-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
}
.movie-header > span{
    font-size: 20px;
    color: #222;
    line-height: 26px;
    margin-right: 20px;
}
.movie-header .search-tips {
    display: inline-block;
    color: #909399;
    font-size: 12px;
    margin-left: -8px;
}
.movie-header .search-tips span {
    color: #4c8fe8;
    margin: 0 4px;
    font-weight: 700;
}
.movie-header a {
    font-size: 12px;
    margin-right: 24px;
    line-height: 20px;
    cursor: pointer;
    position: relative;
    vertical-align: top;
    display: inline-block;
}
.movie-header a:last-of-type {
    margin-right: 0;
}
.movie-header a:hover {
    color: #00a1d6;
}
.header-icon-btn {
    font-size: 16px;
    cursor: pointer;
    transition: color .2s ease,background-color .2s ease;
    height: 16px;
}
.sort-selection-item {
    font-size: 14px;
    padding: 6px 12px;
}
.sort-selection-item:hover {
    cursor: pointer;
    background-color: #ecf5ff;
    color: #66b1ff;
}
</style>

<style>
.header-sort-popover {
    min-width: 10px!important;
    padding: 6px 0!important;
}
</style>
