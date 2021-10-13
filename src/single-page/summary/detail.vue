<template>
    <div>detail{{detailData}}</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    name: 'detail',
    data() {
        return {

        }
    },
    computed: {
        ...mapState('summary', [
            'articleList',
        ]),
        detailData() {
            return this.articleList[parseInt(this.$route.query.index)]
        },
    },
    mounted() {
        this.getSummaryHandle()
    },
    methods: {
        ...mapActions('summary', [
            'getSummaryHandle',
        ]),
    },
}
</script>
