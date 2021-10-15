<template>
    <div class="summary-detail-wrap">
        <div class="detail-title">{{detailData.title}}</div>
        <div v-for="(line, index) in formatData" :key="index" class="line-wrap">
            <div v-if="line.type.split('-')[0] === 'title'" 
                :class="`detail-sub-title detail-title-${line.type.split('-')[1]}`"
                :style="!index ? { marginTop: 0 } : {}">
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
.detail-title {
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 12px;
    line-height: 1.4;
}
.detail-sub-title {
    margin-top: 12px;
    font-weight: 600;
    text-rendering: optimizelegibility;
}
.detail-title-1 {
    font-size: 20px;
}
.detail-title-2 {
    font-size: 18px;
}
.detail-title-3 {
    font-size: 16px;
}
.detail-title-4 {
    font-size: 14px;
}
.detail-title-5 {
    font-size: 12px;
}
.code-wrap {
    margin: 0;
}
</style>
