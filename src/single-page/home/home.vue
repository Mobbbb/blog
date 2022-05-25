<template>
    <div class="home-wrap mobile-wrap">
        <HomeHeader></HomeHeader>
        <div class="home-content" v-loading="isLoading">
            <template v-if="showAnimationList.length">
                <AnimationItem  :data="item" 
                                :key="item._index"
                                :searchFlag="searchFlag"
                                :listData="animationList" 
                                v-for="item in showAnimationList"
                                @click="clickHandle(item.name, item.season)">
                </AnimationItem>
            </template>
            <el-empty :description="isLoading ? ' ' : '暂无数据'" v-else></el-empty>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import AnimationItem from '@/single-page/components/card-item/index.vue'
import HomeHeader from './home-header.vue'

export default {
    name: 'home',
    components: {
        AnimationItem,
        HomeHeader,
    },
    computed: {
        ...mapState('home', [
            'animationList',
            'isLoading',
        ]),
        ...mapState('app', [
            'searchFlag',
        ]),
        ...mapGetters('home', [
            'showAnimationList',
        ]),
    },
    mounted() {
        this.getAnimationHandle()
    },
    methods: {
        ...mapActions('home', [
            'getAnimationHandle',
        ]),
        clickHandle(name, season) {
            this.$router.push({
                name: 'homeDetail',
                params: {
                    name,
                },
                query: {
                    season,
                },
            })
        },
    },
}
</script>

<style scoped>
.home-wrap {
    background: #fff;
    padding: 0 20px;
    position: relative;
    border-top: 8px solid #fff;
    height: 100%;
    box-sizing: border-box;
    overflow-y: auto;
}
.home-content {
    padding: 20px 0 0 20px;
    position: relative;
}
.home-content::after {
    content: '';
    display: block;
    width: 0;
    height: 0;
    clear: both;
}
</style>
