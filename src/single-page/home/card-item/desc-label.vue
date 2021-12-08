<template>
    <div class="desc-label" :style="{ marginRight: `${marginRight}px` }">
        {{name}}
    </div>
</template>

<script>

export default {
    name: 'animation-item',
    props: ['marginRight', 'name'],
}
</script>

<style scoped>
.desc-label {
    height: 22px;
    line-height: normal;
    min-width: 46px;
    max-width: 100%;
    font-size: 12px;
    padding: 2px 8px;
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
    transition: .1s;
}
</style>
