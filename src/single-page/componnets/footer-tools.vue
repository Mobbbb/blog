<template>
    <div class="footer-tools-wrap">
        <el-popover trigger="click" placement="left-end" :width="110" popper-class="footer-filter-popover-wrap">
            <el-checkbox-group v-model="selectedCurrentMonthFilter">
                <div v-for="item in filterConfig" :key="item" class="filter-item">
                    <el-checkbox :label="item.value">
                        <span class="filter-item-label">{{item.label}}</span>
                    </el-checkbox>
                </div>
            </el-checkbox-group>
            <template #reference>
                <Triangle :active="selectedCurrentMonthFilter.length"></Triangle>
            </template>
        </el-popover>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { terminationConfig, unratedConfig } from '@/config/constant.js'
import Triangle from '@/components/triangle.vue'

export default {
    name: 'footer-tools',
    components: {
        Triangle,
    },
    data() {
        return {
            filterConfig: [terminationConfig, unratedConfig],
        }
    },
    computed: {
        selectedCurrentMonthFilter: {
            get() {
                return this.$store.state.home.selectedCurrentMonthFilter
            },
            set(value) {
                this.setCurrentMonthFilter(value)
            },
        },
    },
    methods: {
        ...mapMutations('home', [
            'setCurrentMonthFilter',
        ]),
    },
}
</script>

<style scoped>
.footer-tools-wrap {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 16px;
    width: 100%;
    text-align: right;
    overflow: hidden;
}
.filter-item-label {
    font-size: 12px;
    line-height: 22px;
}
</style>

<style>
.footer-filter-popover-wrap {
    padding: 4px 8px!important;
    min-width: 50px!important;
}
</style>
