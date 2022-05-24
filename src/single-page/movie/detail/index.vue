<template>
    <div class="media-detail">
        <div class="media-header-wrap">
            <div class="navigation-btn" @click="backHandle"><i class="el-icon-arrow-left"></i>返回</div>
            <div class="blurbg-wrap">
                <div class="blurbg-image" :style="style"></div>
            </div>
            <div class="media-content-wrap">
                <img :src="imageUrl" class="content-image">
                <div class="media-content-right">
                    <div class="media-header-title-wrap">
                        <span class="media-header-title">{{movieInfo.name}}</span>
                        <DescLabel :name="item.name" v-for="item in descLabel" :key="item.name"></DescLabel>
                    </div>
                    <div class="media-info-count-wrap">
                        <div class="media-info-count-left">
                            <div class="media-info-count-item">
                                <div>开播日期</div>
                                <div>{{movieInfo.years}}年</div>
                            </div>
                            <div class="media-info-count-item">
                                <div>地区 / 国家</div>
                                <div>{{movieInfo.country}}</div>
                            </div>
                            <div class="media-info-count-item">
                                <div>媒体类型</div>
                                <div>{{mediaType}}</div>
                            </div>
                        </div>
                        <div class="media-info-count-right">
                            <span class="media-info-score">{{movieInfo.score}}</span>
                            <div class="media-info-score-wrap">
                                <el-rate :model-value="movieInfo.score" disabled text-color="#ff9900"></el-rate>
                                <div class="media-info-score-label">{{homeRateScoreConfig.formatTooltip(movieInfo.score, true)}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="actor-wrap">
                        演员：<span v-for="item in movieInfo.actors" :key="item" class="avtor-label">{{item}}</span>
                    </div>
                    <div>简介：{{movieInfo.description}}</div>
                </div>
            </div>
        </div>
        <div>
            <h4 class="comment-label">评论</h4>
            <div class="comment-content">{{movieInfo.comment || '暂无评论。'}}</div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import { homeRateScoreConfig, mediaTypeConfig } from '@/config/constant'
import DescLabel from '@/single-page/components/card-item/desc-label.vue'

export default {
    name: 'media-detail',
    components: {
        DescLabel,
    },
    data() {
        return {
            homeRateScoreConfig,
            mediaTypeConfig,
        }
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
        descLabel() {
            return this.movieInfo.label || []
        },
        imageUrl() {
            return this.movieInfo.cover || ''
        },
        mediaType() {
            let label = '动漫'
            this.mediaTypeConfig.forEach(item => {
                if (item.value === this.movieInfo.type) {
                    label = item.label
                }
            })
            return label
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
        backHandle() {
            history.back()
        },
    },
}
</script>

<style scoped>
.media-detail {
    height: 100%;
    overflow-y: auto;
}
.media-header-wrap {
    position: relative;
    overflow: hidden;
    padding: 0 12px 0 20px;
    color: white;
    font-size: 12px;
}
.navigation-btn {
    width: 50px;
    position: relative;
    z-index: 101;
    padding: 6px 0 8px 0;
    cursor: pointer;
    transition: .1s;
}
.navigation-btn:hover {
    color: #fc5531;
}
.blurbg-wrap {
    height: 430px;
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
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
    padding-bottom: 12px;
}
.content-image {
    border: 3px solid #efecef;
    width: 240px;
    height: 334px;
    display: block;
    margin-right: 24px;
    flex-shrink: 0;
}
.media-content-right {
    width: 100%;
}
.media-header-title-wrap {
    display: flex;
}
.media-header-title {
    font-size: 20px;
    line-height: 22px;
    font-weight: 700;
    color: #fff;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-right: 20px;
}
.media-header-title-wrap .desc-label {
    color: white;
    margin: 0 12px 0 0;
}
.media-info-count-wrap {
    display: flex;
    justify-content: space-between;
    padding-top: 30px;
}
.media-info-count-left {
    display: flex;
}
.media-info-count-item {
    width: 76px;
    height: 34px;
    border-right: 1px solid #fff;
    text-indent: 14px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.media-info-count-item:first-of-type {
    text-indent: 0;
}
.media-info-count-item:nth-of-type(2) {
    width: 96px;
}
.media-info-count-item:last-of-type {
    border-right: none;
}
.media-info-count-right {
    display: flex;
    flex-shrink: 0;
}
.media-info-score {
    margin: 0 8px 0 0;
    color: #ffa726;
    font-size: 36px;
    line-height: 36px;
}
.actor-wrap {
    margin: 28px 0 12px 0;
}
.avtor-label {
    line-height: 1;
    border: 1px solid white;
    border-radius: 2px;
    padding: 0 6px 1px 6px;
    margin-right: 6px;
    background-color: hsla(0, 0%, 100%, .12);
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
