<template>
    <div class="summary-detail-wrap">
        <div class="detail-title">{{detailData.title}}</div>
        <div class="summary-info-wrap">
            <div class="summary-bar-top">
                <span class="summary-top-text">- Mobbbb</span>
                <span class="summary-top-text">{{detailData.date}}</span>
            </div>
            <div class="summary-bar-bottom">
                分类： <span class="summary-tag">{{detailData.type}}</span>
                标签： <span class="summary-tag" v-for="item in detailData.label" :key="item">{{item}}</span>
            </div>
            <div class="back-btn" @click="backAction">返回</div>
        </div>
        <div v-for="(line, index) in formatData" :key="index" class="line-wrap">
            <div v-if="line.type.split('-')[0] === 'title'" 
                :class="`detail-sub-title detail-title-${line.type.split('-')[1]}`">
                {{line.value}}
            </div>
            <div v-if="line.type === 'text'">{{line.value}}</div>
            <div v-if="line.type === 'mixed'">
                <template v-for="(mixedItem, mixedIndex) in line.value">
                    <span v-if="mixedItem.type === 'text'" :key="`${index}-${mixedIndex}`">{{mixedItem.value}}</span>
                    <code v-if="mixedItem.type === 'code'" 
                        :key="`${index}-${mixedIndex}`" 
                        :class="`language-${mixedItem.language}`">
                        {{mixedItem.value}}
                    </code>
                </template>
            </div>
            <pre v-if="line.type === 'code' && line.value" class="code-wrap"><code :class="`language-${line.language}`">{{line.value}}</code></pre>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { formatSummaryContent } from '@/libs/data-processing'
import { summaryRoute } from '@/router'
import Prism from 'prismjs'

export default {
    name: 'summary-detail',
    data() {
        return {
            
        }
    },
    computed: {
        ...mapState('summary', [
            'articleList',
        ]),
        detailData() {
           for (let i = 0; i < this.articleList.length; i++) {
                if (this.articleList[i]._index === parseInt(this.$route.query.index)) {
                    return this.articleList[i]
                }
            }
            return {}
        },
        formatData() {
            let formatDataList = []
            const { content = [] } = this.detailData
            const splitLanguageList = ['{js}', '{css}', '{html}']

            content.forEach(item => {
                formatDataList = [...formatDataList, ...formatSummaryContent(item, splitLanguageList)]
            })
            return formatDataList
        },
        backAction() {
            this.$router.push({
                name: summaryRoute.name,
            })
        },
    },
    async mounted() {
        await this.getSummaryHandle()
        Prism.highlightAll()
    },
    methods: {
        ...mapActions('summary', [
            'getSummaryHandle',
        ]),
    },
}
</script>

<style scoped>
.summary-detail-wrap {
    padding: 12px 24px;
    font-size: 14px;
    line-height: 1.6;
    color: #404040;
}
.summary-info-wrap {
    color: #999aaa;
    background: #f8f8f8;
    border-radius: 4px;
    padding: 0 12px;
    margin-bottom: 12px;
    position: relative;
}
.summary-bar-top {
    line-height: 32px;
}
.summary-top-text {
    margin-right: 16px;
}
.summary-bar-bottom {
    line-height: 24px;
    padding-bottom: 6px;
}
.summary-tag {
    box-sizing: border-box;
    margin-right: 8px;
    padding: 3px 6px;
    font-size: 12px;
    background-color: #fff;
    color: #5094d5;
    border: 1px solid #eaeaef;
    height: 24px;
    line-height: 17px;
    border-radius: 2px;
    display: inline-block;
}
.back-btn {
    color: #8fb0c9;
    padding: 0 4px;
    font-size: 12px;
    line-height: 32px;
    position: absolute;
    right: 8px;
    top: 0;
    cursor: pointer;
}
.back-btn:hover {
    color: #fc5531;
}
.detail-title {
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 12px;
    line-height: 1.4;
}
.detail-sub-title {
    font-weight: 600;
    text-rendering: optimizelegibility;
}
.detail-title-1 {
    margin-top: 12px;
    font-size: 20px;
}
.detail-title-2 {
    margin-top: 10px;
    font-size: 18px;
}
.detail-title-3 {
    margin-top: 8px;
    font-size: 16px;
}
.detail-title-4 {
    margin-top: 6px;
    font-size: 14px;
}
.detail-title-5 {
    margin-top: 4px;
    font-size: 12px;
}
.code-wrap {
    margin: 0;
}
</style>
