<template>
    <div v-for="(line, index) in params" :key="index" class="line-wrap">
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
</template>

<script>
export default {
    name: 'summary-detail-content',
    props: ['params'],
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
</style>
