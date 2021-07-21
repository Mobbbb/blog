<template>
    <div class="home-wrap">
        <div class="home-header-wrap">
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
                            class="change-date-icon" 
                            @click="changeYears(-1)" :disabled="prevYearBtnDisabled">
                </el-button>
                <el-date-picker v-model="years" 
                                type="year" 
                                size="mini" 
                                style="width: 100px;" 
                                :clearable="false" 
                                :disabled-date="disabledDate"
                                @change="onYearsPick">
                </el-date-picker>
                <el-button  type="text" 
                            icon="el-icon-d-arrow-right" 
                            class="change-date-icon" 
                            @click="changeYears(1)" :disabled="nextYearBtnDisabled">
                </el-button>
            </div>
        </div>
    
        <div class="home-content">
            <AnimationItem :data="item" :listData="listData" v-for="item in showListData" :key="item._index"></AnimationItem>
        </div>
    </div>
</template>

<script>
import listData, { months } from './data.js'
import { deepClone } from '@/libs/util'
import { ref } from 'vue'
import AnimationItem from './nanimation-item.vue'

export default {
    name: 'home',
    components: {
        AnimationItem,
    },
    data() {
        const existDataYears = []
        const _listData = deepClone(listData)
        _listData.forEach((item, index) => {
            let labelArr = [], hoverShowLabel = []
            item.label.forEach(name => {
                labelArr.push({ name })
                hoverShowLabel.push(name)
            })

            if (!existDataYears.includes(item.years)) {
                existDataYears.push(item.years)
            }

            item.showName = item.name
            if (item.season) {
                item.showName += ' ' + item.season
            }
            item.label = labelArr
            item.hoverShowLabel = ref(hoverShowLabel)
            item._index = index
        })
        existDataYears.sort((a, b) => a - b)

        return {
            years: '',
            activeMonth: '',
            disabledDate(time) {
                return !existDataYears.includes(time.getFullYear().toString())
            },

            months,
            listData: _listData,
            existDataYears,
        }
    },
    computed: {
        showListData() {
            return this.listData.filter((item) => {
                return item.years === this.years && item.month === this.activeMonth
            })
        },
        prevYearBtnDisabled() {
            return this.existDataYears[0] === this.years
        },
        nextYearBtnDisabled() {
            return this.existDataYears[this.existDataYears.length - 1] === this.years
        },
    },
    mounted() {
        this.initDate()
    },
    methods: {
        initDate() {
            const years = (new Date()).getFullYear().toString()
            this.years = localStorage.getItem('pick-years') || years

            this.activeMonth = localStorage.getItem('pick-month') || months[0].value
        },
        onYearsPick(years) {
            this.years = years.getFullYear().toString()
            localStorage.setItem('pick-years', this.years)
        },
        changeYears(value) {
            this.recursionYears(value)
            localStorage.setItem('pick-years', this.years)
        },
        recursionYears(value) {
            this.years = (Number(this.years) + value).toString()
            if (!this.existDataYears.includes(this.years)) {
                this.recursionYears(value)
            }
        },
        selectedMonth(index) {
            this.activeMonth = index
            localStorage.setItem('pick-month', index)
        },
    },
}
</script>

<style scoped>
.home-wrap {
    background: #fff;
    padding: 20px;
}
.home-header-wrap {
    display: flex;
    justify-content: space-between;
}
.home-header span{
    font-size: 20px;
    color: #222;
    line-height: 26px;
    margin-right: 20px;
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
