<template>
    <div class="media-header-wrap">
        <div class="navigation-btn" @click="backHandle"><i class="el-icon-arrow-left"></i>返回</div>
        <div class="blurbg-wrap"><div class="blurbg-image" :style="style"></div></div>
        <div class="media-content-wrap">
            <img :src="imageUrl" class="content-image">
            <div class="media-content-right">
                <div class="media-header-title-wrap">
                    <span class="media-header-title">{{params.name}} <span v-if="params.season">{{params.season}}</span></span>
                    <div v-if="!showDescLine"><DescLabel :name="item.name" v-for="item in descLabel" :key="item.name"></DescLabel></div>
                </div>
                <div v-if="showDescLine" class="desc-line-wrap">
                    <DescLabel :name="item.name" v-for="item in descLabel" :key="item.name"></DescLabel>
                </div>
                <div class="media-info-count-wrap">
                    <div class="media-info-count-left">
                        <div class="media-info-count-item">
                            <div>开播日期</div>
                            <div>{{params.years}}年<span v-if="params.month">{{params.month}}月</span></div>
                        </div>
                        <div class="media-info-count-item">
                            <div>地区 / 国家</div>
                            <div>{{params.country}}</div>
                        </div>
                        <div class="media-info-count-item">
                            <div>媒体类型</div>
                            <div>{{mediaType}}</div>
                        </div>
                    </div>
                    <div class="media-info-count-right">
                        <div class="wait-to-score" v-if="params.waitToScore">观看中</div>
                        <template v-else>
                            <span class="media-info-score">{{params.score}}</span>
                            <div class="media-info-score-wrap">
                                <el-rate :model-value="params.score" disabled text-color="#ff9900"></el-rate>
                                <div class="media-info-score-label">{{homeRateScoreConfig.formatTooltip(params.score, true)}}</div>
                            </div>
                        </template>
                    </div>
                </div>
                <div class="actor-wrap" v-if="params.actors">
                    演员：<span v-for="item in params.actors" :key="item" class="avtor-label">{{item}}</span>
                </div>
                <div class="progress-wrap" v-if="isAnimation">
                    <span>{{progressLabel}}</span><i></i><span>{{episodes}}</span>
                </div>
                <div class="score-wrap" v-if="isAnimation">
                    扣分项：
                    <span v-for="item in scoreLabel" :key="item" class="avtor-label">{{item}}</span>
                    <span v-if="!scoreLabel.length">无</span>
                </div>
                <div class="description-wrap" v-if="!isAnimation">简介：{{params.description || '暂无'}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import { homeRateScoreConfig, mediaTypeConfig, animationConfig } from '@/config/constant'
import DescLabel from '@/single-page/components/card-item/desc-label.vue'

export default {
    name: 'media-detail',
    props: {
        params: {
            default: () => {
                return {}
            },
            type: Object,
        },
        showDescLine: {
            default: false,
            type: Boolean,
        },
    },
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
        descLabel() {
            return this.params.label || []
        },
        scoreLabel() {
            return this.params.scoreLabel || []
        },
        imageUrl() {
            return this.params.cover || ''
        },
        mediaType() {
            let label = ''
            this.mediaTypeConfig.forEach(item => {
                if (item.value === this.params.type) {
                    label = item.label
                }
            })
            return label
        },
        isAnimation() {
            return this.params.type === animationConfig.value
        },
        progressLabel() {
            let label = ''
            if (this.params.endProgress === this.params.episodes) {
                label = '已看完'
            } else if (this.params.waitToScore || this.params.watching) {
                label = `观看至${this.params.endProgress}话`
            } else {
                label = `终止于${this.params.endProgress}话`
            }
            
            return label
        },
        episodes() {
            return Number.isFinite(Number(this.params.episodes)) ? `共${this.params.episodes}话` : '连载中'
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
    methods: {
        backHandle() {
            history.back()
        },
    },
}
</script>

<style scoped>
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
.media-content-right .desc-label {
    color: white;
    margin: 0 12px 0 0;
}
.desc-line-wrap {
    margin-top: 8px;
}
.media-info-count-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 30px;
}
.media-info-count-left {
    display: flex;
}
.media-info-count-item {
    width: 82px;
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
.wait-to-score {
    line-height: 1;
    padding: 3px 8px;
    border-radius: 6px;
    background-color: hsla(0, 0%, 100%, .12);
    border: 1px solid hsla(0, 0%, 100%, .5);
    text-shadow: 0 0 4px rgb(0 0 0 / 60%);
    margin-right: 6px;
}
.media-info-score {
    margin: 0 8px 0 0;
    color: #ffa726;
    font-size: 36px;
    line-height: 36px;
}
.actor-wrap {
    margin: 28px 0 12px 0;
    line-height: 1;
}
.progress-wrap {
    margin: 28px 0 12px 0;
    display: flex;
    align-items: center;
    line-height: 1;
}
.progress-wrap i {
    display: inline-block;
    vertical-align: top;
    margin: 0 6px;
    width: 1px;
    height: 10px;
    background-color: #b7c0cc;
    flex-shrink: 0;
}
.description-wrap {
    margin-top: 28px;
}
.score-wrap {
    margin-top: 22px;
}
.avtor-label {
    display: inline-block;
    white-space: nowrap;
    line-height: 1;
    border: 1px solid white;
    border-radius: 2px;
    padding: 0 6px 1px 6px;
    margin: 6px 6px 0 0;
    background-color: hsla(0, 0%, 100%, .12);
}
</style>
