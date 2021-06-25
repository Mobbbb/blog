import { defineComponent } from 'vue'

export default defineComponent({
	name: 'movie-page',
	props: {
		msg: String,
	},
	setup() {
		return {
			tableData: [],
		}
	},
	render() {
		return (
			<div>
				<el-table 	style="width: 100%"
							data={ this.tableData }
    						default-sort={ {prop: 'date', order: 'descending'} }>
					<el-table-column prop="date" label="日期" width="180" sortable></el-table-column>
					<el-table-column prop="name" label="姓名" width="180"></el-table-column>
					<el-table-column prop="address" label="地址" width="180"></el-table-column>
				</el-table>
			</div>
		)
	}
})