import { defineComponent } from 'vue'
import data from '.';

export default defineComponent({
	name: 'movie-page',
	props: {
		msg: String,
	},
	setup() {
		return {
			tableData: data,
		}
	},
	render() {
		const paddingTopAndBottom = 24
		return (
			<div class="table-head-class">
				<el-table   border
							header-cell-style={ {background: '#eef1f6'} }
							height={ document.documentElement.clientHeight - paddingTopAndBottom - 1 }
							data={ this.tableData }
    						default-sort={ {prop: 'star', order: 'descending'} }>
					<el-table-column type="index"width="50"></el-table-column>
					<el-table-column prop="name" label="名称" width="180"></el-table-column>
					<el-table-column prop="description" label="描述"></el-table-column>
					<el-table-column prop="star" label="评分" width="180" sortable align="center"></el-table-column>
					<el-table-column prop="years" label="年份" width="180"></el-table-column>
					<el-table-column prop="country" label="国家" width="180"></el-table-column>
					<el-table-column prop="comment" label="评论" width="180"></el-table-column>
				</el-table>
			</div>
		)
	}
})