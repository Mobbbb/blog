<template>
    <div class="animation-item" ref="animationItem">
        <div class="image-wrap">
            <img :src="data.cover" :style="imgStyle" :alt="data.showName">
            <div class="movie-versions-icon" @click.stop="clickExtraChapter" v-if="data.movieVersions">番外</div>
            <template v-if="data.type === movieConfig.value || data.type === tvPlayConfig.value">
                <div class="image-label image-right-label">{{data.years}}</div>
                <div class="image-label image-bottom-label">{{data.country}}</div>
            </template>
            <template v-else>
                <div class="image-label image-right-label" v-if="searchFlag">{{data.years}}</div>
                <div class="image-label image-bottom-label" v-if="searchFlag">{{data.month}}月</div>
            </template>
            <ExtraChapter :list="extraChapterList" 
                          :mode="extraChapterShowMode"
                          v-if="data.movieVersions" 
                          @click.stop>
            </ExtraChapter>
        </div>
        <div class="animation-item-right">
            <el-tooltip :disabled="data.titleTooltipDisabled" :content="data.showName" placement="top">
                <h4 class="animation-item-title paddingLeft4" ref="titleRef">{{data.showName}}</h4>
            </el-tooltip>
            <div class="desc-label-wrap" ref="labelWrapRef">
                <template v-for="cell in data.label" :key="cell.name">
                    <MoreLabel v-if="cell.type === 'more'" :data="data" :style="labelStyle"></MoreLabel>
                    <DescLabel v-else :marginRight="descLabelMarginRight" :name="cell.name"></DescLabel>
                </template>
            </div>
            <div class="animation-item-state paddingLeft4" v-if="data.type === movieConfig.value">
                <span>主演</span>
                <i></i>
                <el-tooltip :disabled="data.actorTooltipDisabled" 
                            :content="data.actors.join(' / ')" 
                            placement="top" 
                            popper-class="actor-tooltips-content">
                    <span ref="actorNames">{{data.actors.join(' / ')}}</span>
                </el-tooltip>
            </div>
            <div class="animation-item-state paddingLeft4" v-else>
                <span v-if="data.endProgress === data.episodes">已看完</span>
                <span v-else-if="data.waitToScore || data.watching">观看至{{data.endProgress}}话</span>
                <span v-else>终止于{{data.endProgress}}话</span>
                <i></i>
                <span>{{episodes}}</span>
            </div>
            <div v-if="data.waitToScore" class="animation-item-tips paddingLeft4">待评分</div>
            <el-rate v-else :model-value="data.score" disabled show-score text-color="#ff9900"></el-rate>
        </div>
    </div>
</template>

<script>
import { ref, defineAsyncComponent } from 'vue'
import { genExtraChapterShowMode, imgConfig } from '@/libs/data-processing'
import { tvPlayConfig, movieConfig } from '@/config/constant'
import DescLabel from './desc-label.vue'
import MoreLabel from './more-label.vue'

const descLabelMarginRight = 4
const moreLabelWidth = 20
const labelStyle = {
    moreLabelWidth,
    descLabelMarginRight,
}

export default {
    name: 'animation-item',
    props: ['data', 'searchFlag', 'listData', 'type'],
    components: {
        DescLabel,
        MoreLabel,
		ExtraChapter: defineAsyncComponent(() => import('./extra-chapter.vue')),
    },
    data() {
        return {
            tvPlayConfig,
            movieConfig,
            descLabelMarginRight,
            labelStyle,
            extraChapterList: [],
            extraChapterShowMode: '',
        }
    },
    computed: {
        episodes() {
            return Number.isFinite(Number(this.data.episodes)) ? `共${this.data.episodes}话` : '连载中'
        },
        imgStyle() {
            return {
                width: `${imgConfig.width}px`,
                height: `${imgConfig.height}px`,
            }
        },
    },
    mounted() {
        this.$nextTick(() => {
            this.setCurrentShowListTooltipPrototype()
            this.computedCurrentShowListLabelConfig()
        })
    },
    methods: {
        hideExtraChapter() {
            this.extraChapterList = []
            document.removeEventListener('click', this.hideExtraChapter)
        },
        clickExtraChapter() { // 显示番外列表
            if (!this.extraChapterList.length) {
                this.setExtraChapterShowMode()
                this.extraChapterList = this.data.movieVersions
                document.addEventListener('click', this.hideExtraChapter)
            }
        },
        setExtraChapterShowMode() {
            const showNum = this.data.movieVersions.length
            const CardItemNode = this.$refs.animationItem
            const homeNode = this.$refs.animationItem.parentNode
            
            this.extraChapterShowMode = genExtraChapterShowMode(homeNode, CardItemNode, showNum)
        },
        /**
         * @description 标题悬浮是否出现tooltip
         */
        setCurrentShowListTooltipPrototype() {
            if (typeof this.data.titleTooltipDisabled === 'undefined') {
                const { clientWidth = 0, scrollWidth = 0 } = this.$refs.titleRef

                this.listData[this.data._index].titleTooltipDisabled = ref(clientWidth >= scrollWidth)
            }
            if (typeof this.data.actorTooltipDisabled === 'undefined' && this.data.type === movieConfig.value) {
                const { clientWidth = 0, scrollWidth = 0 } = this.$refs.actorNames

                this.listData[this.data._index].actorTooltipDisabled = ref(clientWidth >= scrollWidth)
            }
        },
        /**
         * @description 1.获取每个label的位置信息、2.根据位置信息在第二行末尾插入"更多"label
         */
        computedCurrentShowListLabelConfig() {
            this.getCurrentShowListLabelPos()
            this.insertNumberInLabelLineEnd()
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
    }
}
</script>

<style scoped>
.animation-item {
    display: flex;
    width: 33%;
    min-width: 285px;
    padding-right: 8px;
    margin-bottom: 20px;
    box-sizing: border-box;
    float: left;
    cursor: pointer;
}
.image-wrap {
    position: relative;
    margin-right: 16px;
}
.image-label {
    position: absolute;
    font-size: 12px;
    height: 20px;
    line-height: 20px;
    padding: 0 6px;
    color: #fff;
}
.image-right-label {
    right: 0;
    top: 0;
    background: rgb(251, 114, 153);
    border-radius: 0 4px 0 4px;
}
.image-bottom-label {
    bottom: 0;
    right: 0;
    background: rgb(0, 192, 255);
    border-radius: 0 4px 0 4px;
}
.movie-versions-icon {
    width: 50px;
    height: 36px;
    line-height: 42px;
    top: -17px;
    left: -10px;
    position: absolute;
    background: url("//mobbbb.top/resource/home-assets/images/movie-versions-icon.png");
    background-size: 100% 100%;
    font-weight: 700;
    padding-left: 6px;
    box-sizing: border-box;
    font-size: 12px;
    letter-spacing: 1px;
    z-index: 10;
}
.movie-versions-icon:hover {
    cursor: pointer;
}
.card-animation {
    position: absolute;
    top: 0;
    left: 0;
}
.card-animation div {
    position: absolute;
    top: 0;
    left: 0;
    width: 50px;
    height: 50px;
}
.image-wrap img {
    display: block;
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
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 4px;
    max-height: 52px;
    font-size: 12px;
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
    display: flex;
    align-items: center;
}
.animation-item-state i {
    display: inline-block;
    vertical-align: top;
    margin-right: 6px;
    width: 1px;
    height: 10px;
    background-color: #b7c0cc;
    flex-shrink: 0;
}
.animation-item-state span {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.animation-item-state span:first-of-type {
    margin-right: 6px;
    flex-shrink: 0;
}
.animation-item-tips {
    font-size: 12px;
    color: #999;
}
.paddingLeft4 {
    padding-left: 4px;
}
</style>

<style>
.actor-tooltips-content {
    max-width: 160px;
}
</style>
