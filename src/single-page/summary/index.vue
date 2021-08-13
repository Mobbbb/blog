<template>
    <div class="summary-wrap">
        <div class="summary-content" v-loading="isLoading">
            <template v-if="articleList.length">
                <ArticleItem    :params="item" 
                                :key="item._index"
                                v-for="item in articleList">
                </ArticleItem>
            </template>
            <el-empty :description="isLoading ? ' ' : '暂无数据'" v-else></el-empty>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ArticleItem from './article-item.vue'

export default {
    name: 'summary-content',
    components: {
        ArticleItem,
    },
    data() {
        return {
            
        }
    },
    computed: {
        ...mapState('summary', [
            'isLoading',
            'articleList',
        ]),
    },
    mounted() {
        this.getSummaryHandle()
    },
    methods: {
        ...mapActions('summary', [
            'getSummaryHandle',
        ]),
    },
}
</script>

<style scoped>
.summary-wrap {
    background: #fff;
    position: relative;
    border-top: 8px solid #fff;
    height: 100%;
    box-sizing: border-box;
    overflow-y: auto;
}
</style>
