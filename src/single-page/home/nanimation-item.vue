<template>
    <div class="animation-item">
        <div class="image-wrap">
            <img :src="data.cover.default">
            <div class="image-label image-left-label" v-if="searchFlag">{{data.years}}</div>
            <div class="image-label image-right-label" v-if="searchFlag">{{data.month}}月</div>
        </div>
        <div class="animation-item-right">
            <el-tooltip :disabled="data.tooltipDisabled" :content="data.showName" placement="top">
                <h4 class="animation-item-title paddingLeft4" ref="titleRef">{{data.showName}}</h4>
            </el-tooltip>
            <!--<div class="animation-item-desc paddingLeft4">{{}}</div>-->
            <div class="desc-label-wrap" ref="labelWrapRef">
                <template v-for="cell in data.label" :key="cell.name">
                    <el-popover
                        ref="popover"
                        placement="top"
                        :width="200"
                        trigger="hover" 
                        v-if="cell.type === 'more'">
                        <DescLabel  v-for="label in data.hoverShowLabel" 
                                    :marginRight="descLabelMarginRight" 
                                    :name="label"
                                    :key="label">
                        </DescLabel>
                        <template #reference>
                            <div class="more-label" :style="{ width: `${moreLabelWidth}px` }">
                                <i class="el-icon-more"></i>
                            </div>
                        </template>
                    </el-popover>

                    <DescLabel v-else :marginRight="descLabelMarginRight" :name="cell.name"></DescLabel>
                </template>
            </div>
            <div class="animation-item-state paddingLeft4">
                <span v-if="data.endProgress === data.episodes">已看完</span>
                <span v-else>终止于{{data.endProgress}}话</span>
                <i></i>
                <span>共{{data.episodes}}话</span>
            </div>
            <div v-if="data.waitToScore" class="animation-item-tips paddingLeft4">待评分</div>
            <el-rate v-else :model-value="data.score" disabled show-score text-color="#ff9900"></el-rate>
        </div>
    </div>
</template>

<script>
import { scoreMap } from './data.js'
import { ref } from 'vue'
import DescLabel from './desc-label.vue'

const descLabelMarginRight = 4
const moreLabelWidth = 20
const totalScore = 5

export default {
    name: 'animation-item',
    props: ['data', 'searchFlag', 'listData'],
    components: {
        DescLabel,
    },
    data() {
        return {
            moreLabelWidth,
            descLabelMarginRight,
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.setCurrentShowListTooltipPrototype()
            this.computedCurrentShowListScore()
            this.computedCurrentShowListLabelConfig()
        })
    },
    methods: {
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
            if (typeof this.data.tooltipDisabled === 'undefined') {
                const { clientWidth = 0, scrollWidth = 0 } = this.$refs.titleRef
                const tooltipDisabled = clientWidth >= scrollWidth

                this.listData[this.data._index].tooltipDisabled = ref(tooltipDisabled)
            }
        },
        /**
         * @description 1.获取每个label的位置信息、2.根据位置信息在第二行末尾插入"更多"label
         */
        computedCurrentShowListLabelConfig() {
            this.getCurrentShowListLabelPos()
            this.insertNumberInLabelLineEnd(1)
        },
        getCurrentShowListLabelPos() {
            const wrapWidth = this.$refs.labelWrapRef && this.$refs.labelWrapRef.clientWidth
            
            if (typeof this.data.gotLabelStatus === 'undefined') {
                let tempWidth = 0, line = 0

                Array.prototype.forEach.call(this.$refs.labelWrapRef.children, (el, labelIndex) => {
                    tempWidth += el.offsetWidth
                    if (tempWidth > wrapWidth) { // 一行放不下
                        line ++ // 换行
                        tempWidth = el.offsetWidth // 重置当前行宽度
                    }
                    this.listData[this.data._index].label[labelIndex].line = ref(line)
                    this.listData[this.data._index].label[labelIndex].restSpace = ref(wrapWidth - tempWidth)

                    // 处理margin穿透的情况
                    tempWidth += descLabelMarginRight
                    if (tempWidth >= wrapWidth) {
                        this.listData[this.data._index].label[labelIndex].restSpace = ref(0)
                        line ++
                        tempWidth = 0
                    }
                })

                this.listData[this.data._index].gotLabelStatus = true // 表示当前label的获取工作已完成
            }
        },
        insertNumberInLabelLineEnd(lineNum = 1) {
            if (typeof this.data.insertLabelStatus === 'undefined') {
                const labelArr = this.listData[this.data._index].label
                for (let i = 0; i < labelArr.length - 1; i ++) {
                    let nextLabel = labelArr[i + 1]
                    // 寻找第二行末尾元素
                    if (labelArr[i].line === lineNum && nextLabel.line === lineNum + 1) {
                        // 判断末尾是否还有足够的空间
                        if (labelArr[i].restSpace - descLabelMarginRight < moreLabelWidth) {
                            // 剩余空间不足
                            this.listData[this.data._index].label = labelArr.slice(0, i).concat({
                                name: labelArr.length,
                                type: 'more',
                                line: lineNum,
                            })
                        } else {
                            this.listData[this.data._index].label = labelArr.splice(0, i + 1).concat({
                                name: labelArr.length,
                                type: 'more',
                                line: lineNum,
                            })
                        }
                        break
                    }
                }
                
                this.listData[this.data._index].insertLabelStatus = true // 表示当前label的插入加工已处理完毕
            }
        },
        /**
         * @description 最终分数计算
         */
        computedCurrentShowListScore() {
            // 待评分
            if (this.data.waitToScore) {
                this.listData[this.data._index].score = 0
                return
            }

            // 根据label、scoreLabel计算分数
            if (typeof this.data.score === 'undefined') {
                let initScore = totalScore
                
                initScore = initScore.addScore(- this.computedScore(this.data.hoverShowLabel))
                initScore = initScore.addScore(- this.computedScore(this.data.scoreLabel))

                this.listData[this.data._index].score = ref(initScore)
            }
        },
    }
}
</script>

<style scoped>
.animation-item {
    display: flex;
    width: 33%;
    min-width: 280px;
    padding-right: 8px;
    margin-bottom: 20px;
    box-sizing: border-box;
    float: left;
    height: 140px;
}
.image-wrap {
    position: relative;
    margin-right: 16px;
}
.image-label {
    position: absolute;
    top: 0;
    font-size: 12px;
    height: 20px;
    line-height: 20px;
    padding: 0 6px;
    color: #fff;
}
.image-left-label {
    left: 0;
    background: rgb(251, 114, 153);
    border-radius: 4px 0 4px 0;
}
.image-right-label {
    right: 0;
    background: rgb(0, 192, 255);
    border-radius: 0 4px 0 4px;
}
.image-wrap img {
    display: block;
    width: 109px;
    height: 140px;
    overflow: hidden;
    text-decoration: none;
    border-radius: 4px;
    box-shadow: 0 0 2px 0 rgb(0 0 0 / 10%);
    flex-shrink: 0;
}
.animation-item-right {
    overflow: hidden;
    position: relative
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
.more-label {
    height: 16px;
    line-height: 16px;
    font-size: 12px;
    display: inline-block;
    color: #c0c0c0;
    text-align: center;
    margin-bottom: 2px;
    overflow: hidden;
    transform: scale(1, 0.5);
}
.more-label:hover {
    cursor: pointer;
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
.animation-item-state span:first-of-type {
    margin-right: 6px;
}
.animation-item-tips {
    font-size: 12px;
    color: #999;
}
.paddingLeft4 {
    padding-left: 4px;
}
</style>
