<template>
    <div class="summary-detail-wrap mobile-wrap">
        <div class="detail-title">{{detailData.title}}</div>
        <BannerTag :params="detailData"></BannerTag>
        <Content :params="formatData"></Content>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { formatSummaryContent } from '@/libs/data-processing'
import { prismMap } from '@/config/constant.js'
import BannerTag from './banner-tag.vue'
import Content from './content.vue'
import Prism from 'prismjs'
import BabelConfig from 'babel'

export default {
    name: 'summary-detail',
    components: {
        BannerTag,
        Content,
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
        splitLanguageList() {
            let languages = [], languageTypes = []
            BabelConfig.plugins.forEach(item => {
                if (Array.isArray(item) && item[0] === 'prismjs') {
                    languageTypes = item[1].languages
                }
            })
            languageTypes.forEach(item => {
                if (prismMap[item]) {
                    languages = [...languages, ...prismMap[item]]
                } else {
                    languages.push(`{${item}}`)
                }
            })
            return languages
        },
        formatData() {
            let formatDataList = []
            const { content = [] } = this.detailData

            content.forEach(item => {
                formatDataList = [...formatDataList, ...formatSummaryContent(item, this.splitLanguageList)]
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
    height: 100%;
    box-sizing: border-box;
    overflow-y: auto;
}
.detail-title {
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 12px;
    line-height: 1.4;
}
</style>
