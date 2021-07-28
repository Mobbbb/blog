<template>
    <div class="popover-content">
        <div class="label-wrap" v-if="popoverFilterConfig.allLabelArr">
            <div class="filter-title"># 标签</div>
            <DescLabel  v-for="label in popoverFilterConfig.allLabelArr" 
                        :marginRight="4" 
                        :name="label"
                        :key="label" 
                        @click="clickLabel(label)"
                        :class="popoverSelectedFilter.label.includes(label) ? 'active-label' : ''">
            </DescLabel>
        </div>
        <div class="rate-wrap" v-if="popoverFilterConfig.rateScore">
            <div class="filter-title paddingBottom0"># 评分</div>
            <div class="slider-bar-wrap">
                <el-slider  range
                            v-model="rateScore" 
                            :max="popoverFilterConfig.rateScore.max"
                            :step="popoverFilterConfig.rateScore.step" 
                            :format-tooltip="popoverFilterConfig.rateScore.formatTooltip">
                </el-slider>
            </div>
        </div>
        <div class="popover-footer-wrap">
            <el-button size="mini" icon="el-icon-refresh-left" @click="clickResetBtn">重置</el-button>
            <el-button size="mini" type="primary" icon="el-icon-search" @click="clickSearchBtn">搜索</el-button>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import DescLabel from '@/single-page/home/desc-label.vue'

export default {
  	name: 'popover-filter',
    components: {
        DescLabel,
    },
    data() {
        return {
            value1: 0,
        }
    },
    computed: {
        ...mapGetters('app', [
            'popoverFilterConfig',
            'popoverSelectedFilter',
        ]),
        rateScore: {
            get() {
                return this.popoverSelectedFilter.rateScore
            },
            set(value) {
                this.setFilterHandle({
                    type: 'rateScore',
                    data: value,
                })
            },
        },
    },
	methods: {
        ...mapActions('app', [
            'setFilterHandle',
        ]),
        clickResetBtn() {
            this.$emit('on-reset')
        },
        clickSearchBtn() {
            this.$emit('on-search')
        },
        clickLabel(name) {
            this.setFilterHandle({
                type: 'label',
                data: name,
            })
        },
	}
}
</script>

<style scoped>
.label-wrap {
    max-height: 160px;
    overflow: scroll;
    padding-left: 12px;
}
.label-wrap .desc-label:hover {
    cursor: pointer;
    color: #409EFF;
    border-color: #c6e2ff;
    background-color: #ecf5ff
}
.label-wrap .active-label {
    background: #409EFF;
    border-color: #409EFF;
    color: #fff;
}
.label-wrap .active-label:hover {
    background: #66b1ff;
    border-color: #66b1ff;
    color: #fff;
}
.filter-title {
    font-size: 12px;
    font-weight: 700;
    padding: 0 0 8px 2px;
}
.rate-wrap {
    padding: 0 12px;
}
.slider-bar-wrap {
    padding: 0 4px;
}
.popover-footer-wrap {
    text-align: right;
    padding: 0 12px;
}
.paddingBottom0 {
    padding-bottom: 0;
}
</style>
