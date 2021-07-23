<template>
    <div class="home-wrap">
        <div class="home-header-wrap">
            <div class="home-header" v-if="searchFlag">
                <span>搜索结果</span>
                <div class="search-tips">共找到<span>{{showAnimationList.length}}</span>条记录</div>
            </div>
            <div class="home-header" v-else>
                <span>番剧评价</span>
                <a  v-for="item in months"
                    :key="item.value" 
                    :class="activeMonth === item.value ? 'link-active' : ''" 
                    @click="selectedMonth(item.value)">{{item.name}}</a>
            </div>
            <div class="date-picker-wrap" v-if="!searchFlag">
                <el-button  type="text" 
                            icon="el-icon-d-arrow-left" 
                            class="change-date-icon" 
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
                            class="change-date-icon" 
                            @click="changeYears(1)" :disabled="nextYearBtnDisabled">
                </el-button>
            </div>
        </div>
    
        <div class="home-content">
            <template v-if="showAnimationList.length">
                <AnimationItem  :data="item" 
                                :key="item._index"
                                :searchFlag="searchFlag"
                                :listData="animationList" 
                                v-for="item in showAnimationList">
                </AnimationItem>
            </template>
            <el-empty description="暂无数据" v-else></el-empty>
        </div>
    </div>
</template>

<script>
import { months } from './data.js'
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
import AnimationItem from './nanimation-item.vue'

export default {
    name: 'home',
    components: {
        AnimationItem,
    },
    data() {
        return {
            months,
        }
    },
    computed: {
        ...mapState('home', [
            'activeMonth',
            'animationList',
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
        this.initDate()
        this.getAnimationHandle()
    },
    methods: {
        ...mapMutations('home', [
            'updateActiveMonth',
            'updateYears',
        ]),
        ...mapActions('home', [
            'initDate', 
            'getAnimationHandle',
            'changeYearsHandle',
        ]),
        changeYears(value) {
            this.changeYearsHandle(value)
        },
        selectedMonth(index) {
            this.updateActiveMonth(index)
        },
    },
}
</script>

<style scoped>
.home-wrap {
    background: #fff;
    padding: 20px;
    position: relative;
}
.home-header-wrap {
    display: flex;
    justify-content: space-between;
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
.change-date-icon {
    font-size: 16px;
    color: #DCDFE6;
    cursor: pointer;
    transition: color .2s ease,background-color .2s ease;
    height: 16px;
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

.home-content {
    padding: 20px 0 20px 20px;
}
.home-content::after {
    content: '';
    display: block;
    width: 0;
    height: 0;
    clear: both;
}
</style>
