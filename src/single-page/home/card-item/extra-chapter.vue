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
             :style="{ width: `${imgWidth}px`, zIndex: list.length - index }" >
            <img class="extra-chapter-img" :style="imgStyle" :src="item.cover" alt="item.name">
            <div class="image-label image-right-label">{{item.years}}</div>
            <div class="image-label image-bottom-label">{{item.month}}月</div>
            <div class="extra-chapter-title">{{item.name}}</div>
        </div>
    </transition-group>
</template>

<script>
import { gsap } from 'gsap'

const rectItemHeight = 165
const imgGap = 8

export default {
    name: 'extra-chapter',
    props: ['list', 'imgWidth', 'mode'],
    data() {
        return {
            rectItemHeight,
        }
    },
    computed: {
        imgStyle() {
            return {
                width: `${this.imgWidth}px`,
            }
        },
        groupStyle() {
            return {
                zIndex: this.list.length ? 11 : 9,
                left: `${this.imgWidth + imgGap}px`,
            }
        },
    },
    mounted() {

    },
    methods: {
        beforeEnter(el) {
            el.style.left = 0
            el.style.height = 0
            el.style.opacity = 0
        },
        enter(el, done) {
            gsap.to(el, {
                height: this.rectItemHeight,
                opacity: 1,
                delay: 0,
                duration: 0.2,
                onComplete: () => {
                    gsap.to(el, {
                        left: el.dataset.index * (this.imgWidth + imgGap) + 'px',
                        delay: 0,
                        onComplete: done
                    })
                }
            })
        },
        leave(el, done) {
            gsap.to(el, {
                opacity: 0,
                height: 0,
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
    height: 100%;
    top: 0;
}
.extra-chapter-item {
    background: #f8f8f8;
    border-radius: 4px;
    overflow: hidden;
    box-sizing: border-box;
    box-shadow: 3px 3px 8px #c8c8c8;
    position: absolute;
    top: 0;
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
    height: 140px;
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
