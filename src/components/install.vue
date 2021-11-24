<template>
    <div class="install-wrap" @click="clickHandle">
        <i class="el-icon-plus install-plus"></i>
    </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
    
export default {
    name: 'install-wrap',
    setup() {
        const store = new useStore()
        
        const appPromptEvent = computed(() => store.state.app.installConfig.appPromptEvent)
        const setAppPromptEvent = (event) => store.commit('app/setAppPromptEvent', event)
        
        return {
            store,
            appPromptEvent,
            setAppPromptEvent,
        }
	},
    methods: {
        clickHandle() {
            if (this.appPromptEvent !== null) {
                this.appPromptEvent.prompt()
                this.appPromptEvent.userChoice.then((result) => {
                    if (result.outcome === 'accepted') {
                        console.log('同意安装应用')
                    }
                    this.setAppPromptEvent(null)
                })
            }
        },
    },
}
</script>

<style scoped>
.install-wrap {
    position: absolute;
    bottom: 60px;
    right: -70px;
    z-index: 100;
    border-radius: 50%;
    background: #dadada;
    padding: 14px;
    box-shadow: 0 4px 10px rgb(0 0 0 / 15%);
}
.install-wrap:hover {
    cursor: pointer;
}
.install-plus {
    font-weight: 800;
    font-size: 16px;
    color: #fff;
}
</style>
