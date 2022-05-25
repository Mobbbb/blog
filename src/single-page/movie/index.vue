<template>
    <div class="movie-wrap mobile-wrap">
        <MovieHeader></MovieHeader>
        <div class="movie-content" v-loading="isLoading">
            <template v-if="showMovieList.length">
                <AnimationItem  type="movie"
                                :data="item" 
                                :key="item._index"
                                :searchFlag="searchFlag"
                                :listData="movieList" 
                                v-for="item in showMovieList"
                                @click="clickHandle(item.name)">
                </AnimationItem>
            </template>
            <el-empty :description="isLoading ? ' ' : '暂无数据'" v-else></el-empty>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import MovieHeader from './movie-header.vue'
import AnimationItem from '@/single-page/components/card-item/index.vue'

export default {
    name: 'movie',
    components: {
        MovieHeader,
        AnimationItem,
    },
    computed: {
        ...mapState('movie', [
            'movieList',
            'isLoading',
        ]),
        ...mapState('app', [
            'searchFlag',
        ]),
        ...mapGetters('movie', [
            'showMovieList',
        ]),
    },
    mounted() {
        this.getMovieListHandle()
    },
    methods: {
        ...mapActions('movie', [
            'getMovieListHandle',
        ]),
        clickHandle(name) {
            this.$router.push({
                name: 'movieDetail',
                params: {
                    name,
                },
            })
        },
    },
}
</script>

<style scoped>
.movie-wrap {
    background: #fff;
    padding: 0 20px;
    position: relative;
    border-top: 8px solid #fff;
    height: 100%;
    box-sizing: border-box;
    overflow-y: auto;
}
.movie-content {
    padding: 20px 0 0 20px;
    position: relative;
}
.movie-content::after {
    content: '';
    display: block;
    width: 0;
    height: 0;
    clear: both;
}
</style>
