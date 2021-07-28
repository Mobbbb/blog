<template>
    <div class="home-wrap">
        <HomeHeader></HomeHeader>
        <div class="home-content">
            <template v-if="showAnimationList.length">
                <AnimationItem  :data="item" 
                                :key="item._index"
                                :searchFlag="searchFlag"
                                :listData="animationList" 
                                v-for="item in showAnimationList">
                </AnimationItem>
            </template>
            <el-empty description="暂无数据" v-else></el-empty>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import AnimationItem from './nanimation-item.vue'
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
    },
}
</script>

<style scoped>
.home-wrap {
    background: #fff;
    padding: 20px;
    position: relative;
}
.home-content {
    padding: 20px 0 20px 20px;
}
.home-content::after {
    content: '';
    display: block;
    width: 0;
    height: 0;
    clear: both;
}
</style>
