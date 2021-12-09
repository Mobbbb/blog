<template>
    <transition-group name="staggered-fade"
                      class="extra-chapter-wrap"
                      tag="div"
                      :css="false"
                      :style="groupStyle"
                      @before-enter="beforeEnter"
                      @enter="enter"
                      @leave="leave">
        <div class="extra-chapter-item" 
             v-for="(item, index) in list" 
             :key="index" 
             :data-index="index"
             :style="{ width: `${imgConfig.width}px`, zIndex: list.length - index }" >
            <img class="extra-chapter-img" :style="imgStyle" :src="item.cover" alt="item.name">
            <div class="image-label image-right-label">{{item.years}}</div>
            <div class="image-label image-bottom-label">{{item.month}}月</div>
            <el-tooltip :content="item.name" placement="top">
                <div class="extra-chapter-title">{{item.name}}</div>
            </el-tooltip>
        </div>
    </transition-group>
</template>

<script>
import { gsap } from 'gsap'
import { imgConfig } from '@/libs/data-processing'

const transMode = {
    left: 'right',
    right: 'left',
}

export default {
    name: 'extra-chapter',
    props: ['list', 'mode'],
    data() {
        return {
            imgConfig,
        }
    },
    computed: {
        imgStyle() {
            return {
                width: `${this.imgConfig.width}px`,
                height: `${this.imgConfig.height}px`,
            }
        },
        isLR() {
            return this.mode === 'right' || this.mode === 'left'
        },
        extraChapterWidth() {
            return this.imgConfig.width + this.imgConfig.gap
        },
        extraChapterHeight() {
            return this.imgConfig.rectItemHeight + this.imgConfig.gap
        },
        groupStyle() {
            const style = {
                zIndex: this.list.length ? 11 : 9
            }

            if (this.isLR) {
                style.top = 0
                style[transMode[this.mode]] = `${this.extraChapterWidth}px`
            } else {
                style.left = 0
                style[this.mode] = 0
            }
            
            return style
        },
    },
    methods: {
        beforeEnter(el) {
            el.style.height = 0
            el.style.opacity = 0
        },
        enter(el, done) {
            this.showListByMode(el, done)
        },
        showListByMode(el, done) {
            if (this.isLR) {
                gsap.to(el, {
                    height: this.imgConfig.rectItemHeight,
                    opacity: 1,
                    duration: 0.2,
                    onComplete: () => {
                        const config = { onComplete: done }
                        config[transMode[this.mode]] = `${el.dataset.index * (this.extraChapterWidth)}px`,
                        gsap.to(el, config)
                    }
                })
            } else {
                const config = {
                    height: this.imgConfig.rectItemHeight,
                    opacity: 1,
                    onComplete: done,
                }
                config[this.mode] = `-${(parseInt(el.dataset.index) + 1) * (this.extraChapterHeight)}px`
                gsap.to(el, config)
            }
        },
        leave(el, done) {
            gsap.to(el, {
                opacity: 0,
                height: 0,
                top: 0,
                delay: 0,
                onComplete: done
            })
        },
    }
}
</script>

<style scoped>
.extra-chapter-wrap {
    position: absolute;
    width: 100%;
    height: 1px;
}
.extra-chapter-item {
    background: #f8f8f8;
    border-radius: 4px;
    overflow: hidden;
    box-sizing: border-box;
    box-shadow: 3px 3px 8px #c8c8c8;
    position: absolute;
}
.extra-chapter-item:hover {
    cursor: auto;
}
.extra-chapter-title {
    font-weight: 700;
    color: #222;
    line-height: 24px;
    font-size: 12px;
    padding: 0 4px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: center;
}
.extra-chapter-img {
    display: block;
    overflow: hidden;
    text-decoration: none;
    border-bottom: 1px solid rgb(0 0 0 / 10%);
    flex-shrink: 0;
}
.image-label {
    position: absolute;
    font-size: 12px;
    height: 20px;
    line-height: 20px;
    padding: 0 6px;
    color: #fff;
}
.image-bottom-label {
    bottom: 24px;
    right: 0;
    background: rgb(0, 192, 255);
    border-radius: 0 4px 0 4px;
}
.image-right-label {
    right: 0;
    top: 0;
    background: rgb(251, 114, 153);
    border-radius: 0 4px 0 4px;
}
</style>
