<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button
          style="float: right"
          @click="handleSearchList()"
          type="primary"
          size="small"
        >
          查询结果
        </el-button>
        <el-button
          style="float: right; margin-right: 15px"
          @click="handleResetSearch()"
          size="small"
        >
          重置
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form
          :inline="true"
          :model="listQuery"
          size="small"
          label-width="140px"
        >
          <el-form-item label="订单号：">
            <el-input
              style="width: 203px"
              v-model="listQuery.order_no"
              placeholder="订单号"
            ></el-input>
          </el-form-item>
          <el-form-item label="采购方ID：">
            <el-input
              style="width: 203px"
              v-model="listQuery.uid"
              placeholder="采购方ID"
            ></el-input>
          </el-form-item>
          <el-form-item label="手机号码：">
            <el-input
              style="width: 203px"
              v-model="listQuery.phone"
              placeholder="手机号码"
            ></el-input>
          </el-form-item>
          <el-form-item label="订单状态：">
            <el-select v-model="listQuery.status" placeholder="全部" clearable>
              <el-option
                v-for="item in orderStatusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="下单时间：">
            <el-date-picker
              v-model="listQuery.create_at"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
    </el-card>
    <div class="table-container">
      <el-table
        ref="formTable"
        :data="list"
        style="width: 100%"
        v-loading="listLoading"
        border
      >
        <el-table-column
          type="selection"
          width="60"
          align="center"
        ></el-table-column>
        <el-table-column label="ID" width="80" align="center">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column label="订单号" align="center">
          <template slot-scope="scope">
            <p>{{ scope.row.order_no }}</p>
          </template>
        </el-table-column>
        <el-table-column label="区块ID" align="center">
          <template slot-scope="scope">
            <p>{{ scope.row.block_id }}</p>
          </template>
        </el-table-column>
        <el-table-column label="哈希" align="center">
          <template slot-scope="scope">
            <p>{{ scope.row.hashid }}</p>
          </template>
        </el-table-column>
        <el-table-column label="交易类型" align="center">
          <template slot-scope="scope">
            <p>{{ scope.row.transaction_type_str }}</p>
          </template>
        </el-table-column>
        <el-table-column label="订单地址" align="center">
          <template slot-scope="scope">
            <p>{{ scope.row.order_address }}</p>
          </template>
        </el-table-column>
        <el-table-column label="资源发起地址" align="center">
          <template slot-scope="scope">
            <p>{{ scope.row.payment_address }}</p>
          </template>
        </el-table-column>
        <el-table-column label="资源接收地址" align="center">
          <template slot-scope="scope">
            <p>{{ scope.row.energy_address }}</p>
          </template>
        </el-table-column>
        <el-table-column label="出售周期" align="center">
          <template slot-scope="scope">
            <p>{{ scope.row.sales_cycle }}</p>
          </template>
        </el-table-column>
        <el-table-column label="出售数量" align="center">
          <template slot-scope="scope">
            <p>{{ scope.row.sales_num }}</p>
          </template>
        </el-table-column>
        <el-table-column label="订单金额" align="center">
          <template slot-scope="scope">
            <p>{{ scope.row.money }}</p>
          </template>
        </el-table-column>
        <el-table-column label="资源单价" align="center">
          <template slot-scope="scope">
            <p>{{ scope.row.resource_price }}</p>
          </template>
        </el-table-column>
        <el-table-column label="到账状态" align="center">
          <template slot-scope="scope">
            <p>{{ scope.row.result_status_str }}</p>
          </template>
        </el-table-column>
        <el-table-column label="购买能量数量" align="center">
          <template slot-scope="scope">
            <p>{{ scope.row.number }}</p>
          </template>
        </el-table-column>
<!--        <el-table-column label="费用" align="center">-->
<!--          <template slot-scope="scope">-->
<!--            <p>{{ scope.row.money }}</p>-->
<!--          </template>-->
<!--        </el-table-column>-->
        <el-table-column label="消息通知信息" align="center">
          <template slot-scope="scope">
            <p>TgID：{{ scope.row.chat_id }}</p>
            <p>Tg姓名：{{ scope.row.chat_first }}</p>
          </template>
        </el-table-column>
        <el-table-column label="消息是否通知" align="center">
          <template slot-scope="scope">
            <p>{{ scope.row.chat_first_str }}</p>
          </template>
        </el-table-column>
<!--        <el-table-column label="状态" width="140" align="center">-->
<!--          <template slot-scope="scope">-->
<!--            <p>{{ scope.row.status_str }}</p>-->
<!--          </template>-->
<!--        </el-table-column>-->
        <el-table-column label="下单时间" align="center">
          <template slot-scope="scope">
            <p>{{ scope.row.create_at }}</p>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total,sizes,prev,pager,next,jumper"
        :current-page.sync="listQuery.page"
        :page-size="listQuery.limit"
        :page-sizes="[10, 15, 20]"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { fetchList } from "@/api/order";

const defaultListQuery = {
  keyword: null,
  page: 1,
  limit: 10,
};
const defaultEditPromotion = {
  type: null,
  id: null,
  title: null,
  link: null,
  status: 1,
};
export default {
  name: "formList",
  data() {
    return {
      orderStatusOptions: [
        {
          value: 1,
          label: "待确认",
        },
        {
          value: 2,
          label: "已确认",
        },
        {
          value: 3,
          label: "异常",
        },
      ],
      editInfo: {
        dialogVisible: false,
      },
      operateType: null,
      listQuery: Object.assign({}, defaultListQuery),
      list: null,
      categoryList: null,
      total: null,
      listLoading: true,
      editPromotion: Object.assign({}, defaultEditPromotion),
      isEdit: false,
    };
  },
  created() {
    this.getList();
  },
  watch: {},
  methods: {
    //列表
    getList() {
      this.listLoading = true;
      fetchList(this.listQuery).then((response) => {
        this.listLoading = false;
        if (response.code == 1) {
          const data = response.data;
          this.list = data.list;
          this.categoryList = data.cateList;
          this.total = data.page.total;
        } else {
          this.$message({
            message: response.info,
            type: "error",
            duration: 3000,
          });
        }
      });
    },
    //搜索
    handleSearchList() {
      this.listQuery.page = 1;
      this.getList();
    },
    //重置搜索
    handleResetSearch() {
      this.selectFormCateValue = [];
      this.listQuery = Object.assign({}, defaultListQuery);
    },
    //分页操作
    handleSizeChange(val) {
      this.listQuery.page = 1;
      this.listQuery.limit = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getList();
    },
    //编辑-新增
    handleAddForm() {
      this.editInfo.dialogVisible = true;
      this.isEdit = false;
      this.editPromotion = Object.assign({}, defaultEditPromotion);
    },
    //编辑-修改
    handleUpdateForm(index, row) {
      this.editInfo.dialogVisible = true;
      this.isEdit = true;
      this.editPromotion = Object.assign({}, row);
    },
    //保存表单提交数据
    handleDialogConfirm() {
      if (this.isEdit) {
        updateData(this.editPromotion).then((response) => {
          if (response.code == 1) {
            this.$message({
              message: "修改成功！",
              type: "success",
            });
            this.editInfo.dialogVisible = false;
            this.getList();
          } else {
            this.$message({
              message: response.info,
              type: "error",
            });
          }
        });
      } else {
        createData(this.editPromotion).then((response) => {
          if (response.code == 1) {
            this.$message({
              message: "添加成功！",
              type: "success",
            });
            this.editInfo.dialogVisible = false;
            this.getList();
          } else {
            this.$message({
              message: response.info,
              type: "error",
            });
          }
        });
      }
    },

    //修改状态
    handleStatusChange(index, row) {
      this.$confirm("是否要修改该状态?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let params = { id: row.id, status: row.status };
          updateStatus(params).then((response) => {
            if (response.code == 1) {
              this.$message({
                message: "修改成功！",
                type: "success",
              });
            } else {
              this.$message({
                message: response.info,
                type: "error",
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消修改",
          });
        });
    },

    //删除
    handleDelete(index, row) {
      this.$confirm("是否要进行删除操作?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let ids = [];
        ids.push(row.id);
        this.updateDeleteStatus(ids);
      });
    },

    //执行删除
    updateDeleteStatus(ids) {
      let params = new URLSearchParams();
      params.append("ids", ids);
      deleteData(params).then((response) => {
        if (response.code == 1) {
          this.$message({
            message: "删除成功！",
            type: "success",
          });
        } else {
          this.$message({
            message: response.info,
            type: "error",
          });
        }
      });
      this.getList();
    },

    handleShowForm(index, row) {
      console.log("handleShowForm", row);
    },
    handleShowVerifyDetail(index, row) {
      console.log("handleShowVerifyDetail", row);
    },
    handleShowLog(index, row) {
      console.log("handleShowLog", row);
    },
    updatePublishStatus(publishStatus, ids) {
      let params = new URLSearchParams();
      params.append("ids", ids);
      params.append("publishStatus", publishStatus);
      updatePublishStatus(params).then((response) => {
        this.$message({
          message: "修改成功",
          type: "success",
          duration: 1000,
        });
      });
    },
    updateNewStatus(newStatus, ids) {
      let params = new URLSearchParams();
      params.append("ids", ids);
      params.append("newStatus", newStatus);
      updateNewStatus(params).then((response) => {
        this.$message({
          message: "修改成功",
          type: "success",
          duration: 1000,
        });
      });
    },
    updateRecommendStatus(recommendStatus, ids) {
      let params = new URLSearchParams();
      params.append("ids", ids);
      params.append("recommendStatus", recommendStatus);
      updateRecommendStatus(params).then((response) => {
        this.$message({
          message: "修改成功",
          type: "success",
          duration: 1000,
        });
      });
    },
  },
};
</script>
<style></style>


