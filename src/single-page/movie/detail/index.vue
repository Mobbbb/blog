<template>
    <div class="movie-detail">
        <MediaDetail :params="movieInfo"></MediaDetail>
        <h4 class="comment-label">评论</h4>
        <div class="comment-content">{{movieInfo.comment || '暂无评论。'}}</div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import MediaDetail from '@/single-page/components/media-detail.vue'

export default {
    name: 'movie-detail',
    components: {
        MediaDetail,
    },
    computed: {
        ...mapState('movie', [
            'movieList',
        ]),
        movieInfo() {
            let info = {}
            let name = this.$route.params.name
            this.movieList.forEach(item => {
                if (name === item.name) {
                    info = item
                }
            })
            return info
        },
    },
    mounted() {
        this.getMovieListHandle()
    },
    methods: {
        ...mapActions('movie', [
            'getMovieListHandle',
        ]),
    },
}
</script>

<style scoped>
.movie-detail {
    height: 100%;
    overflow-y: auto;
}
.comment-label {
    font-size: 18px;
    font-weight: 700;
    margin: 12px 20px;
}
.comment-content {
    margin: 12px 20px;
    border-radius: 4px;
    background-color: #f4f5f7;
    padding: 10px 8px;
    overflow: hidden;
    color: #6d757a;
    font-size: 12px;
}
</style>
