<template>
    <div class="article-item-wrap mobile-wrap" @click="jumpToDetail">
        <div class="article-title" ref="titleWrap">
            <span :style="titleStyle" ref="titleText">{{params.title}}</span>
            <div class="article-type-wrap">
                <span class="article-type-label" 
                      :ref="setItemRef" 
                      :style="showLabelItems.length !== index + 1 ? labelStyle : {}"
                      v-for="(item, index) in showLabelItems"
                      :key="item">
                    {{item}}
                </span>
            </div>
        </div>
        <p class="ellipsis-content">{{params.ellipsisContent}}</p>
        <div class="article-info-wrap">{{params.date}}</div>
    </div>
</template>

<script>
import { summaryDetailRoute } from '@/router'

const titleStyleConfig = {
    minWidth: 0.4,
    marginRight: 8,
}
const labelMarginRight = 4

export default {
    name: 'article-item',
    props: ['params'],
    data() {
        return {
            labelItems: [],
            labelShowNum: 0,
            titleWrapWidth: 0,
            titleTextWidth: 0,
            titleStyle: {},
        }
    },
    computed: {
        showLabelItems() {
            if (this.labelShowNum) {
                return this.params.label.slice(0, this.labelShowNum)
            }
            return this.params.label
        },
        labelStyle() {
            return {
                marginRight: `${labelMarginRight}px`,
            }
        },
    },
    mounted() {
        this.titleWrapWidth = this.$refs.titleWrap.clientWidth
        this.titleTextWidth = this.$refs.titleText.clientWidth
        this.genTitleTextStyle()
        this.genLabelShowNum()
    },
    methods: {
        setItemRef(el) {
            if (el) {
                this.labelItems.push(el)
            }
        },
        genTitleTextStyle() {
            if (this.titleTextWidth < this.titleWrapWidth * 0.4) {
                this.titleStyle = {
                    marginRight: `${titleStyleConfig.marginRight}px`,
                }
            } else {
                this.titleStyle = {
                    flexShrink: 1,
                    minWidth: `${titleStyleConfig.minWidth * 100}%`,
                    marginRight: `${titleStyleConfig.marginRight}px`,
                }
            }
        },
        genLabelShowNum() {
            let restWidth = 0
            if (this.titleStyle.minWidth) {
                restWidth = this.titleWrapWidth * (1 - titleStyleConfig.minWidth) - titleStyleConfig.marginRight
            } else {
                restWidth = this.titleWrapWidth - this.titleTextWidth - titleStyleConfig.marginRight
            }

            for (let index = 0; index < this.labelItems.length; index++) {
                restWidth -= this.labelItems[index].clientWidth
                if (restWidth < 0 && index !== 0) {
                    this.labelShowNum = index
                    break
                } else {
                    this.labelShowNum = index + 1
                }
                restWidth -= labelMarginRight
            }
        },
        jumpToDetail() {
            this.$router.push({
                name: summaryDetailRoute.name,
                query: {
                    index: this.params._index,
                }
            })
        },
    },
    beforeUpdate() {
        this.labelItems = []
    },
}
</script>

<style scoped>
.article-item-wrap {
    padding: 16px 24px 12px 24px;
    border-bottom: 1px solid #f0f2f5;
    background: #fff;
    transition: all .15s linear;
}
.article-item-wrap:hover {
    background: #f9fafc;
    cursor: pointer;
}
.article-item-wrap:hover .article-title {
    color: #fc5531;
}
.article-title {
    display: flex;
    word-break: break-all;
    color: #555666;
    font-size: 18px;
    font-weight: 500;
    transition: all .15s linear;
}
.article-title > span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex-shrink: 0;
}
.article-type-wrap {
    display: flex;
    align-items: center;
}
.article-type-label {
    color: #fc5531;
    background-color: #fff5f2;
    padding: 2px 8px;
    font-size: 12px;
    border-radius: 2px;
    display: inline-block;
    white-space: nowrap;
}
.ellipsis-content {
    margin-top: 6px;
    line-height: 22px;
    white-space: normal;
    color: #999aaa;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
.article-info-wrap {
    color: #5f6471;
    margin-top: 2px;
    height: 24px;
    line-height: 24px;
}
</style>
