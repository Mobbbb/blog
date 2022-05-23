<template>
    <div>
        <div class="media-header-wrap">
            <div class="blurbg-wrap">
                <div class="blurbg-image" :style="style"></div>
            </div>
            <div>
                header
            </div>
            <div class="media-content-wrap">
                <img :src="imageUrl" class="content-image" v-if="imageUrl">
                <div>
                    <div class="media-header-title-wrap">
                        <span class="media-header-title">title</span>
                        <DescLabel name="name"></DescLabel>
                    </div>
                    <div>
                        开播:2020
                    </div>
                    <div>
                        地区
                    </div>
                    <div>
                        演员
                    </div>
                    <div>
                        简介：xxxxxxxxxxxxxxxxxxxxxxxx
                    </div>
                </div>
            </div>
            <div>
                footer
            </div>
        </div>
        <div>
            评价：
            <div>暂无评论。</div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import DescLabel from '@/single-page/components/card-item/desc-label.vue'

export default {
    name: 'detail',
    components: {
        DescLabel,
    },
    computed: {
        ...mapState('movie', [
            'movieList',
        ]),
        movieInfo() {
            let info = {}
            let name = this.$route.query.name
            this.movieList.forEach(item => {
                if (name === item.name) {
                    info = item
                }
            })
            return info
        },
        imageUrl() {
            return this.movieInfo.cover || ''
        },
        style() {
            if (this.imageUrl) {
                return {
                    backgroundImage: `url(${this.imageUrl})`
                }
            }
            return {}
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
.media-header-wrap {
    position: relative;
    overflow: hidden;
    padding: 0 24px;
}
.blurbg-wrap {
    height: 430px;
    width: 100%;
    position: absolute;
    left: 0;
}
.blurbg-wrap::before {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.3);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
}
.blurbg-image {
    position: absolute;
    background-size: cover;
    background-position: 50%;
    width: 110%;
    min-width: 1120px;
    height: 430px;
    top: 50%;
    left: 50%;
    margin: -215px -55%;
    z-index: 10;
    background-repeat: no-repeat;
    filter: blur(40px);
}
.media-content-wrap {
    position: relative;
    display: flex;
    z-index: 101;
}
.content-image {
    border: 3px solid #efecef;
    width: 240px;
    height: 334px;
    display: block;
    margin-right: 24px;
}
</style>
