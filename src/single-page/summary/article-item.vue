<template>
    <div class="article-item-wrap">
        <div class="article-title">
            <span @click="jumpToDetail">{{params.title}}</span>
            <div class="article-type-wrap">
                <span class="article-type-label" v-for="item in params.label" :key="item">{{item}}</span>
            </div>
        </div>
        <p class="ellipsis-content">{{params.ellipsisContent}}</p>
        <div class="article-info-wrap">{{params.date}}</div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { summaryDetailRoute } from '@/router'

export default {
    name: 'article-item',
    props: ['params'],
    data() {
        return {
            
        }
    },
    methods: {
        ...mapMutations('app', [
            'updateActiveNavIndex',
        ]),
        jumpToDetail() {
            this.updateActiveNavIndex(summaryDetailRoute.path)
            this.$router.push({
                name: summaryDetailRoute.name,
                query: {
                    index: this.params._index,
                }
            })
        },
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
    margin-right: 8px;
}
.article-title > span:hover {
    cursor: pointer;
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
    margin-right: 4px;
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
