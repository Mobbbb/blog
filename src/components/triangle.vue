<template>
    <div class="triangle-icon" :class="active ? 'active-triangle' : ''"></div>
</template>

<script>

export default {
    name: 'triangle-icon',
    props: ['active'],
}
</script>

<style scoped>
.triangle-icon {
    border: 5px solid #c5c8cf;
    border-top-color: transparent;
    border-left-color: transparent;
    border-bottom-color: transparent;
    display: inline-block;
    transform: rotate(-135deg);
    position: absolute;
    bottom: 0;
    right: 0;
    margin: 0 -5px -5px 0;
    cursor: pointer;
}
.active-triangle {
    border-right-color: #00a1d6;
}
</style>
