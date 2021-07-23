import { defineComponent } from 'vue'
import { useStore } from 'vuex'
import data from './data.js'
import './movie-page.css'

export default defineComponent({
	name: 'movie-page',
	props: {
		msg: String,
	},
	setup() {
		const store = new useStore()
		return {
			tableData: data,
			store,
		}
	},
	render() {
		const outsideHeight = 61 + this.store.state.app.mainTopGap
		const paddingTopAndBottom = 32
		return (
			<div class="table-head-class">
				<el-table   border
							header-cell-style={ {background: '#eef1f6'} }
							height={ document.documentElement.clientHeight - outsideHeight - paddingTopAndBottom }
							data={ this.tableData }
    						default-sort={ {prop: 'star', order: 'descending'} }>
					<el-table-column fixed type="index"width="50" align="center"></el-table-column>
					<el-table-column fixed prop="name" label="名称" width="180"></el-table-column>
					<el-table-column prop="description" label="描述" min-width="620"></el-table-column>
					<el-table-column prop="star" label="评分" width="80" sortable align="center"></el-table-column>
					<el-table-column prop="years" label="年份" width="80"></el-table-column>
					<el-table-column prop="country" label="国家" width="80"></el-table-column>
					<el-table-column prop="comment" label="评论" width="180"></el-table-column>
				</el-table>
			</div>
		)
	}
})