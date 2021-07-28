import { defineComponent, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import './movie-page.css'

export default defineComponent({
	name: 'movie-page',
	setup() {
		const store = new useStore()

		const getMovieListHandle = () => store.dispatch('movie/getMovieListHandle')
		onMounted(() => {
			getMovieListHandle()
		})

		return {
			mainTopGap: computed(() => store.state.app.mainTopGap),
			showMovieList: computed(() => store.getters['movie/showMovieList']),
		}
	},
	render() {
		const outsideHeight = 61 + this.mainTopGap
		const paddingTopAndBottom = 32
		return (
			<div class="table-head-class">
				<el-table   border
							empty-text={ '暂无数据' }
							header-cell-style={ {background: '#eef1f6'} }
							height={ document.documentElement.clientHeight - outsideHeight - paddingTopAndBottom }
							data={ this.showMovieList }
    						default-sort={ {prop: 'score', order: 'descending'} }>
					<el-table-column fixed type="index"width="50" align="center"></el-table-column>
					<el-table-column fixed prop="name" label="名称" width="180"></el-table-column>
					<el-table-column prop="description" label="描述" min-width="620"></el-table-column>
					<el-table-column prop="score" label="评分" width="80" sortable align="center"></el-table-column>
					<el-table-column prop="years" label="年份" width="80"></el-table-column>
					<el-table-column prop="country" label="国家" width="80"></el-table-column>
					<el-table-column prop="comment" label="评论" width="180"></el-table-column>
				</el-table>
			</div>
		)
	}
})