<template>
    <div class="home-header-wrap">
        <template v-if="searchFlag">
            <div class="home-header">
                <span>搜索结果</span>
                <div class="search-tips">共找到<span>{{showAnimationList.length}}</span>条记录</div>
            </div>
            <div class="date-picker-wrap">
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
        <template v-else>
            <div class="home-header">
                <span>番剧评价</span>
                <a  v-for="item in months"
                    :key="item.value" 
                    :class="activeMonth === item.value ? 'link-active' : ''" 
                    @click="selectedMonth(item.value)">{{item.name}}</a>
            </div>
            <div class="date-picker-wrap">
                <el-button  type="text" 
                            icon="el-icon-d-arrow-left" 
                            class="header-icon-btn change-date-icon" 
                            @click="changeYears(-1)" :disabled="prevYearBtnDisabled">
                </el-button>
                <el-date-picker v-model="selectedYears" 
                                type="year" 
                                size="mini" 
                                style="width: 100px;" 
                                :clearable="false" 
                                :disabled-date="disabledDate"
                                value-format="YYYY">
                </el-date-picker>
                <el-button  type="text" 
                            icon="el-icon-d-arrow-right" 
                            class="header-icon-btn change-date-icon" 
                            @click="changeYears(1)" :disabled="nextYearBtnDisabled">
                </el-button>
            </div>
        </template>
    </div>
</template>

<script>
import { months, sortListConfig } from '@/config/constant.js'
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'

export default {
    name: 'home-header',
    data() {
        return {
            months,
            sortListConfig,
            showPopoverStatus: false,
        }
    },
    computed: {
        ...mapState('home', [
            'activeMonth',
            'selectedSortType',
        ]),
        ...mapState('app', [
            'searchFlag',
        ]),
        ...mapGetters('home', [
            'availableYears',
            'showAnimationList',
        ]),
        selectedYears: {
            get() {
                return this.$store.state.home.selectedYears
            },
            set(value) {
                this.updateYears(value)
            },
        },
        disabledDate() {
            return (time) => {
                return !this.availableYears.includes(time.getFullYear().toString())
            }
        },
        prevYearBtnDisabled() {
            return this.availableYears[0] === this.selectedYears
        },
        nextYearBtnDisabled() {
            return this.availableYears[this.availableYears.length - 1] === this.selectedYears
        },
    },
    mounted() {
        this.initHomeHeader()
    },
    methods: {
        ...mapMutations('home', [
            'updateActiveMonth',
            'updateYears',
            'updateSelectedSortType',
        ]),
        ...mapActions('home', [
            'initHomeHeader', 
            'changeYearsHandle',
            'sortDataBySortType',
        ]),
        changeYears(value) {
            this.changeYearsHandle(value)
        },
        selectedMonth(index) {
            this.updateActiveMonth(index)
        },
        selectSortType(value) {
            this.showPopoverStatus = false
            this.updateSelectedSortType(value)
            this.sortDataBySortType()
        },
    },
}
</script>

<style scoped>
.home-header-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
}
.home-header > span{
    font-size: 20px;
    color: #222;
    line-height: 26px;
    margin-right: 20px;
}
.home-header .search-back {
    position: absolute;
    left: 0;
}
.home-header .search-tips {
    display: inline-block;
    color: #909399;
    font-size: 12px;
    margin-left: -8px;
}
.home-header .search-tips span {
    color: #4c8fe8;
    margin: 0 4px;
    font-weight: 700;
}
.home-header a {
    font-size: 12px;
    margin-right: 24px;
    line-height: 20px;
    cursor: pointer;
    position: relative;
    vertical-align: top;
    display: inline-block;
}
.home-header a:hover {
    color: #00a1d6;
}
.home-header .link-active {
    color: #00a1d6;
    border-bottom: 1px solid #00a1d6;
}
.home-header .link-active::before {
    content: "";
    display: block;
    position: absolute;
    left: 50%;
    margin-left: -4px;
    bottom: -1px;
    width: 0;
    height: 0;
    border-bottom: 4px solid #00a1d6;
    border-top: 0;
    border-left: 4px dashed transparent;
    border-right: 4px dashed transparent;
}

.date-picker-wrap {
    display: flex;
    align-items: center;
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
.active-sort-item {
    color: #409eff;
}
.change-date-icon {
    color: #DCDFE6;
}
.change-date-icon:hover {
    color: #C0C4CC;
}
.change-date-icon:first-of-type {
    margin-right: 6px;
}
.change-date-icon:last-of-type {
    margin-left: 6px;
}
</style>

<style>
.header-sort-popover {
    min-width: 10px!important;
    padding: 6px 0!important;
}
</style>
