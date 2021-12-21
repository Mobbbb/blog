<template>
    <div v-for="(line, index) in params" :key="index" class="line-wrap">
        <div v-if="line.type.split('-')[0] === summaryTypeMap.TITLE" 
            :class="`detail-sub-title detail-title-${line.type.split('-')[1]}`"
            :style="titleStyle(index)">
            {{line.value}}
        </div>
        <div v-if="line.type === summaryTypeMap.TEXT">{{line.value}}</div>
        <div v-if="line.type === summaryTypeMap.MIXED">
            <template v-for="(mixedItem, mixedIndex) in line.value">
                <span v-if="mixedItem.type === summaryTypeMap.TEXT" 
                      :key="`${index}-${mixedIndex}`">
                      {{mixedItem.value}}
                </span>
                <code v-if="mixedItem.type === summaryTypeMap.CODE" 
                      :key="`${index}-${mixedIndex}`" 
                      :class="`language-${mixedItem.language}`">
                    {{mixedItem.value}}
                </code>
                <span v-if="mixedItem.type === summaryTypeMap.LINK" 
                      :key="`${index}-${mixedIndex}`" 
                      class="link-href" 
                      @click="linkJumpHandle(mixedItem.value)">
                    {{mixedItem.value}}
                </span>
            </template>
        </div>
        <pre v-if="line.type === summaryTypeMap.CODE && line.value" class="code-wrap"><code :class="`language-${line.language}`">{{line.value}}</code></pre>
    </div>
</template>

<script>
import { summaryTypeMap } from '@/config/constant'

export default {
    name: 'summary-detail-content',
    props: ['params'],
    data() {
        return {
            summaryTypeMap,
        }
    },
    computed: {
        titleStyle() {
            return (index) => {
                let style = {}
                const prevLine = this.params[index - 1]
                if (prevLine) {
                    style = prevLine.type.split('-')[0] === this.summaryTypeMap.TITLE ? { marginTop: 0 } : {}
                }
                return style
            }
        }
    },
    methods: {
        linkJumpHandle(href) {
            window.open(href)
        },
    },
}
</script>

<style scoped>
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
.link-href {
    word-wrap: break-word;
    color: #4ea1db;
}
.link-href:hover {
    cursor: pointer;
    color: #ca0c16;
}
</style>
