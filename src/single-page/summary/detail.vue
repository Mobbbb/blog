<template>
    <div class="summary-detail-wrap">
        <div v-for="(line, index) in formatData" :key="index" class="line-wrap">
            <div v-if="line.type.split('-')[0] === 'title'" 
                :class="`detail-title detail-title-${line.type.split('-')[1]}`"
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
            return this.articleList[parseInt(this.$route.query.index)] || {}
        },
        formatData() {
            const formatDataList = []
            const { content = [] } = this.detailData
            content.forEach(item => {
                if (item.type === 'text') {
                    item.value.forEach(lineContent => {
                        if (lineContent.indexOf('{js}') > -1) {
                            let lineList = []
                            let reg = new RegExp(/\{js}.+?\{\/js}/g) // /\{js}.*?\{\/js}/g
                            let splitLineOfContent = lineContent.split(reg)
                            let splitLineOfCode = lineContent.match(reg)
                            splitLineOfContent.forEach((splitText, index) => {
                                if (index) {
                                    lineList.push({
                                        value: splitLineOfCode[index - 1].slice(4, -5),
                                        type: 'code',
                                        language: 'js',
                                    })
                                }
                                lineList.push({
                                    value: splitText,
                                    type: 'text'
                                })
                            })
                            formatDataList.push({
                                value: lineList,
                                type: 'mixed'
                            })
                        } else {
                            formatDataList.push({
                                value: lineContent,
                                type: 'text'
                            })
                        }
                    })
                } else {
                    formatDataList.push(item)
                }
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
