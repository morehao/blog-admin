<style lang="less">
@import "../../styles/common.less";
@import "./components/table.less";
</style>

<template>
	<div>
		<Row>
			<Col span="24" class="padding-left-10">
				<Card>
					<div class="edittable-table-height-con">
						<Row class="margin-bottom-10" type="flex" align="middle">
							<Col span="3">
                <Button type="primary">
                  <Icon type="plus-round" @click="openModal"></Icon>
                  新增
                </Button>
							</Col>
							<Col span="1" offset="7">筛选</Col>
							<Col span="5">
								<Select clearable v-model="school">
									<Option v-for="item in schoolList" :key="item.name" :value="item.name">
										{{item.name}}
									</Option>
								</Select>
							</Col>
							<Col span="5" offset="1">
								<Input></Input>
							</Col>
							<Col span="2">
								<Button type="primary" icon="ios-search" class="margin-left-16">搜索</Button>
							</Col>
						</Row>
						<div class="edittable-con-1">
							<can-edit-table refs="table1" @on-delete="handleDel" v-model="tableData" :columns-list="columnsList"></can-edit-table>
						</div>
					<div class="page-containner">
              <Page
                  :total="dataCount"
                  :page-size="pagesize"
                  @on-change="changePage"
                  show-total
                  show-elevator
                  show-sizer
                  placement="top">
              </Page>
          </div>
        </div>
				</Card>
			</Col>
		</Row>
	</div>
</template>

<script>
import { userApi } from "@/api/api";
import canEditTable from "./components/canEditTable.vue";

import tableData from "./components/table_data.js";
export default {
  name: "editable-table",
  components: {
    canEditTable
  },
  data() {
    return {
      columnsList: [],
      tableData: [],
      dataCount: 0
    };
  },
  methods: {
    getData() {
      this.columnsList = tableData.tableUsers;
      // this.tableData = tableData.table1Data;
    },
    getUser: async function(params) {
      const newParams = params || {};
      const { errorCode, data } = await userApi.list(newParams);
      this.tableData = data.list || [];
      this.dataCount = data.dataCount || 0;
    },
    handleNetConnect(state) {
      this.breakConnect = state;
    },
    handleLowSpeed(state) {
      this.lowNetSpeed = state;
    },
    getCurrentData() {
      this.showCurrentTableData = true;
    },
    handleDel(val, index) {
      this.$Message.success("删除了第" + (index + 1) + "行数据");
    },
    handleCellChange(val, index, key) {
      this.$Message.success(
        "修改了第 " + (index + 1) + " 行列名为 " + key + " 的数据"
      );
    },
    handleChange(val, index) {
      this.$Message.success("修改了第" + (index + 1) + "行数据");
    },
    openModal() {
      this.add = true;
      this.title = "学生管理/添加学生";
      this.role = "添加";
    },
  },
  created() {
    this.getData();
    this.getUser();
  }
};
</script>
