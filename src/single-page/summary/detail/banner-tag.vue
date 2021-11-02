<template>
    <div class="summary-info-wrap">
        <div class="ladder-shaped"><div class="ladder-shaped-text">{{channel}}</div></div>
        <div class="summary-bar-top">
            <span class="summary-top-text">- Mobbbb</span>
            <span class="summary-top-text">{{params.date}}</span>
        </div>
        <div class="summary-bar-bottom">
            文章类别： <span class="summary-tag">{{params.type}}</span>
            文章标签： <span class="summary-tag" v-for="item in params.label" :key="item">{{item}}</span>
        </div>
        <div class="back-btn" @click="backAction">返回</div>
    </div>
</template>

<script>
import { summaryRoute } from '@/router'

export default {
    name: 'summary-banner-tag',
    props: ['params'],
    computed: {
        channel() {
            return this.params.channel === 0 ? '原创' : '转载'
        },
    },
    methods: {
        backAction() {
            this.$router.push({
                name: summaryRoute.name,
            })
        },
    },
}
</script>

<style scoped>
.summary-info-wrap {
    color: #999aaa;
    background: #f8f8f8;
    border-radius: 4px;
    padding: 0 12px;
    margin-bottom: 12px;
    position: relative;
    padding: 0 48px;
}
.summary-bar-top {
    line-height: 32px;
    position: relative;
    z-index: 10;
}
.summary-top-text {
    margin-right: 16px;
}
.summary-bar-bottom {
    line-height: 24px;
    padding-bottom: 6px;
    position: relative;
    z-index: 10;
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
.ladder-shaped {
    position: absolute;
    display: inline-block;
    width: 80px;
    height: 80px;
    text-align: center;
    left: -17px;
    top: -24px;
    z-index: 1;
}
.ladder-shaped-text {
    height: 100%;
    width: 100%;
    color: white;
    position: absolute;
    text-align: center;
    line-height: 80px;
    left: 0;
    top: 0;
    box-sizing: border-box;
    padding-right: 6px;
    z-index: 3;
}
.ladder-shaped::before { 
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #f4b2ad;
    border-radius: 8px;
    transform: perspective(150px) scale(0.68, 0.32) rotateY(50deg);
    transform-origin: center;
    z-index: 2;
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
</style>
