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
          <el-form-item label="用户ID：">
            <el-input
              style="width: 203px"
              v-model="listQuery.uid"
              placeholder="用户ID"
            ></el-input>
          </el-form-item>
          <el-form-item label="用户名：">
            <el-input
              style="width: 203px"
              v-model="listQuery.name"
              placeholder="用户名"
            ></el-input>
          </el-form-item>
          <el-form-item label="提款单号：">
            <el-input
              style="width: 203px"
              v-model="listQuery.trade_no"
              placeholder="提款单号"
            ></el-input>
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
        <el-table-column label="用户名" width="200" align="center">
          <template slot-scope="scope">
            <p>用户名：{{ scope.row.name }}</p>
          </template>
        </el-table-column>
        <el-table-column label="提款单号" align="center">
          <template slot-scope="scope">
            <p>{{ scope.row.trade_no }}</p>
          </template>
        </el-table-column>

        <el-table-column label="提款地址" width="250" align="center">
          <template slot-scope="scope">
            <p>{{ scope.row.address }}</p>
          </template>
        </el-table-column>
        <el-table-column label="申请金额" align="center">
          <template slot-scope="scope">
            <p>{{ scope.row.amount }}</p>
          </template>
        </el-table-column>
        <el-table-column label="打款金额"  align="center">
          <template slot-scope="scope">
            <p>{{ scope.row.money }}</p>
          </template>
        </el-table-column>
        <el-table-column label="手续费"  align="center">
          <template slot-scope="scope">
            <p>{{ scope.row.charge_amount }}</p>
          </template>
        </el-table-column>
        <el-table-column label="提款状态" align="center">
          <template slot-scope="scope">
            <p>{{ scope.row.status_str }}</p>
          </template>
        </el-table-column>
        <el-table-column label="操作信息" align="center">
          <template slot-scope="scope">
<!--            <p>创建时间：{{ scope.row.create_at }}</p>-->
<!--            <p>提款时间：{{ scope.row.trade_time_str }}</p>-->
            <el-button v-if="scope.row.status==2" type="text" size="small" @click="handlePassForm(scope.$index,scope.row)">确定</el-button>
            <el-button v-if="scope.row.status==1" type="text" size="small" @click="handlePassForm(scope.$index,scope.row)">审核通过</el-button>
            <el-button v-if="scope.row.status==1" type="text" size="small" @click="handleUnPassForm(scope.$index,scope.row)">审核拒绝</el-button>
          </template>
        </el-table-column>
        <!-- <el-table-column label="操作" width="160" align="center">
          <template slot-scope="scope">
            <p>
              <el-button
                size="mini"
                @click="handleUpdateForm(scope.$index, scope.row)"
                >编辑
              </el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                >删除
              </el-button>
            </p>
          </template>
        </el-table-column> -->
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :page-size="listQuery.limit"
        :page-sizes="[10, 15, 20]"
        :current-page.sync="listQuery.page"
        :total="total"
      >
      </el-pagination>
    </div>
    <el-dialog
        title="提示"
        :visible.sync="editInfo.dialogVisible"
        width="30%"
        :before-close="handleClose">
      <span v-if="isPass">確定要审核通过吗</span>
      <span v-else>確定要审核拒绝吗</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="editInfo.dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="handleConfirmForm">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  fetchList,confirmWithdraw,unPass
} from "@/api/withdraw";
import {pass, unpass} from "@/api/recharge";

const defaultListQuery = {
  keyword: null,
  page: 1,
  limit: 10,
};
const defaultEditPromotion = {
  id: null,
  title: null,
  secret_key: null,
  link: null,
  remark: null,
  status: 1,
};
export default {
  name: "formList",
  data() {
    return {
      publishStatusOptions: [
        {
          value: 1,
          label: "启用",
        },
        {
          value: 0,
          label: "禁用",
        },
      ],
      editInfo: {
        dialogVisible: false,
      },
      operateType: null,
      listQuery: Object.assign({}, defaultListQuery),
      list: null,
      total: null,
      listLoading: true,
      editPromotion: Object.assign({}, defaultEditPromotion),
      isEdit: false,
      isPass: false,
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

    //通过审核
    handlePassForm(index, row) {
      this.editInfo.dialogVisible = true;
      this.isPass=true;
      this.editPromotion = Object.assign({}, row);
    },
    handleUnPassForm(index, row) {
      this.editInfo.dialogVisible = true;
      this.isPass=false;
      this.editPromotion = Object.assign({}, row);
    },

    //通过审核
    handleConfirmForm() {

      let params ={
        trade_no: this.editPromotion.trade_no,
      };
      if(this.isPass){
        confirmWithdraw(params).then((response) => {
          if (response.code == 1) {
            this.$message({
              message: "审核成功！",
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

      }else{
        unPass(params).then((response) => {
          if (response.code == 1) {
            this.$message({
              message: "审核拒绝成功！",
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


