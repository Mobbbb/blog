<template>
    <div class="home-wrap">
        <div class="home-header-wrap">
            <div class="home-header">
                <span>番剧评价</span>
                <a   v-for="(item, index) in months" 
                    :key="item" 
                    :class="activeIndex === index ? 'link-active' : ''" @click="selectedMonth(index)">{{item}}</a>
            </div>
            <el-date-picker v-model="years" 
                            type="year" 
                            size="mini" 
                            :clearable="false" 
                            style="width: 100px;" 
                            @change="onYearsPick">
            </el-date-picker>
        </div>

        <div class="home-content">
            <div class="animation-item" v-for="(item, index) in showListData" :key="item.name + index">
                <img :src="item.cover.default"> 
                <div class="animation-item-right">
                    <el-tooltip :disabled="item.tooltipDisabled" :content="item.name" placement="top">
                        <h4 class="animation-item-title paddingLeft4" :ref="setTitleRef">{{item.name}}</h4>
                    </el-tooltip>
                    <!--<div class="animation-item-desc paddingLeft4">{{}}</div>-->
                    <div class="desc-label-wrap" :ref="setLabelWrapRef">
                        <template v-for="cell in item.label" :key="cell.name">
                            <div v-if="cell.type === 'more'" class="more-label" :style="{ width: `${moreLabelWidth}px` }">
                                {{cell.name}}
                            </div>
                            <div v-else class="desc-label" :style="{ marginRight: `${descLabelMarginRight}px` }">
                                {{cell.name}}
                            </div>
                        </template>
                    </div>
                    <div class="animation-item-state paddingLeft4">
                        <span v-if="item.endProgress === item.episodes">已看完</span>
                        <span v-else>终止于{{item.endProgress}}话</span>
                        <i></i>
                        <span>共{{item.episodes}}话</span>
                    </div>
                    <el-rate :model-value="item.score" disabled show-score text-color="#ff9900"></el-rate>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import data, { scoreMap } from './data.js'
import { ref } from 'vue'

const descLabelMarginRight = 4
const moreLabelWidth = 20
const years = (new Date()).getFullYear().toString()
const months = ['一月', '四月', '七月', '十月']

export default {
    name: 'home',
    data() {
        data.forEach((item, index) => {
            let labelArr = [], hoverShowLabel = []
            item.label.forEach(name => {
                labelArr.push({ name })
                hoverShowLabel.push(name)
            })

            item.label = labelArr
            item.hoverShowLabel = ref(hoverShowLabel)
            item._index = index
        })
        return {
            descLabelMarginRight,
            moreLabelWidth,
            years,
            months,

            activeIndex: 1,
            listData: data,
            titleRefs: [],
            labelWrapRefs: [],
        }
    },
    computed: {
        showListData() {
            return this.listData.filter((item) => {
                return item.years === this.years
            })
        },
    },
    mounted() {
        this.setCurrentShowListTooltipPrototype()
        this.computedCurrentShowListScore()
        this.computedCurrentShowListLabelConfig()
    },
    methods: {
        onYearsPick(years) {
            this.years = years.getFullYear().toString()
        },
        selectedMonth(index) {
            this.activeIndex = index
        },
        setTitleRef(el) {
            this.titleRefs.push(el)
        },
        setLabelWrapRef(el) {
            this.labelWrapRefs.push(el)
        },
        computedScore(labelArr) {
            let score = 0

            labelArr.forEach(cell => {
                let itemScore = scoreMap[cell] || 0
                score = (score).addScore(itemScore)
            })

            return score
        },
        /**
         * @description 标题悬浮是否出现tooltip
         */
        setCurrentShowListTooltipPrototype() {
            this.showListData.forEach((item, index) => {
                if (typeof item.tooltipDisabled === 'undefined') {
                    const { clientWidth = 0, scrollWidth = 0 } = this.titleRefs[index]
                    const tooltipDisabled = clientWidth >= scrollWidth

                    this.listData[item._index].tooltipDisabled = ref(tooltipDisabled)
                }
            })
        },
        /**
         * @description 1.获取每个label的位置信息、2.根据位置信息在第二行末尾插入"更多"label
         */
        computedCurrentShowListLabelConfig() {
            this.getCurrentShowListLabelPos()
            this.insertNumberInLabelLineEnd(1)
        },
        getCurrentShowListLabelPos() {
            const wrapWidth = this.labelWrapRefs[0].clientWidth
            
            this.showListData.forEach((item, index) => {
                if (typeof item.gotLabelStatus === 'undefined') {
                    let tempWidth = 0, line = 0

                    Array.prototype.forEach.call(this.labelWrapRefs[index].children, (el, labelIndex) => {
                        tempWidth += el.offsetWidth
                        if (tempWidth > wrapWidth) { // 一行放不下
                            line ++ // 换行
                            tempWidth = el.offsetWidth // 重置当前行宽度
                        }
                        this.listData[item._index].label[labelIndex].line = ref(line)
                        this.listData[item._index].label[labelIndex].restSpace = ref(wrapWidth - tempWidth)

                        // 处理margin穿透的情况
                        tempWidth += descLabelMarginRight
                        if (tempWidth >= wrapWidth) {
                            this.listData[item._index].label[labelIndex].restSpace = ref(0)
                            line ++
                            tempWidth = 0
                        }
                    })

                    this.listData[item._index].gotLabelStatus = true // 表示当前label的获取工作已完成
                }
            })
        },
        insertNumberInLabelLineEnd(lineNum = 1) {
            this.showListData.forEach(item => {
                if (typeof item.insertLabelStatus === 'undefined') {
                    const labelArr = this.listData[item._index].label
                    for (let i = 0; i < labelArr.length - 1; i ++) {
                        let nextLabel = labelArr[i + 1]
                        // 寻找第二行末尾元素
                        if (labelArr[i].line === lineNum && nextLabel.line === lineNum + 1) {
                            // 判断末尾是否还有足够的空间
                            if (labelArr[i].restSpace - descLabelMarginRight < moreLabelWidth) {
                                // 剩余空间不足
                                this.listData[item._index].label = labelArr.slice(0, i).concat({
                                    name: labelArr.length,
                                    type: 'more',
                                    line: lineNum,
                                })
                            } else {
                                this.listData[item._index].label = labelArr.splice(0, i + 1).concat({
                                    name: labelArr.length,
                                    type: 'more',
                                    line: lineNum,
                                })
                            }
                            break
                        }
                    }
                    
                    this.listData[item._index].insertLabelStatus = true // 表示当前label的插入加工已处理完毕
                }
            })
        },
        /**
         * @description 最终分数计算
         */
        computedCurrentShowListScore() {
            this.showListData.forEach(item => {
                if (typeof item.score === 'undefined') {
                    let initScore = 5
                    
                    initScore = initScore.addScore(- this.computedScore(item.label))
                    initScore = initScore.addScore(- this.computedScore(item.scoreLabel))

                    this.listData[item._index].score = ref(initScore)
                }
            })
        },
    },
    beforeUpdate() {
        this.titleRefs = []
        this.labelWrapRefs = []
    },
    updated() {
        this.setCurrentShowListTooltipPrototype()
        this.computedCurrentShowListScore()
        this.computedCurrentShowListLabelConfig()
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
.animation-item {
    display: flex;
    width: 33%;
    min-width: 280px;
    padding-right: 12px;
    margin-bottom: 20px;
    box-sizing: border-box;
    float: left;
    height: 140px;
}
.animation-item img {
    display: block;
    width: 110px;
    height: 140px;
    overflow: hidden;
    text-decoration: none;
    border-radius: 4px;
    box-shadow: 0 0 2px 0 rgb(0 0 0 / 10%);
    flex-shrink: 0;
    margin-right: 16px;
}
.animation-item-right {
    overflow: hidden;
}
.animation-item-title {
    font-weight: 400;
    color: #222;
    line-height: 24px;
    font-size: 18px;
    padding: 0 10px 0 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin: 0 0 8px 0;
}
.desc-label-wrap {
    margin-bottom: 4px;
    max-height: 50px;
    font-size: 12px;
    overflow: hidden;
}
.desc-label {
    min-width: 46px;
    max-width: 100%;
    height: 22px;
    line-height: 22px;
    font-size: 12px;
    padding: 0 8px;
    border: 1px solid #f0f0f0;
    display: inline-block;
    color: #595959;
    text-align: center;
    border-radius: 3px;
    margin: 0 0 4px 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    box-sizing: border-box;
}
.more-label {
    height: 22px;
    line-height: 22px;
    font-size: 12px;
    display: inline-block;
    color: #595959;
    text-align: center;
    margin: 0 0 4px 0;
    overflow: hidden;
}
.animation-item-desc {
    display: -webkit-box;
    font-weight: 400;
    color: #222;
    line-height: 20px;
    max-height: 60px;
    font-size: 12px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin: 0 0 8px 0;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    white-space: normal;
}
.animation-item-state {
    font-size: 12px;
    color: #999;
    margin-bottom: 6px;
}
.animation-item-state i {
    display: inline-block;
    vertical-align: top;
    margin-top: 3px;
    margin-right: 6px;
    width: 1px;
    height: 10px;
    background-color: #b7c0cc;
}
.animation-item-state span:first-of-type{
    margin-right: 6px;
}
.paddingLeft4 {
    padding-left: 4px;
}
</style>
