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
          <el-form-item label="账户ID：">
            <el-input
              style="width: 203px"
              v-model="listQuery.id"
              placeholder="账户ID"
            ></el-input>
          </el-form-item>
          <el-form-item label="用户名：">
            <el-input
              style="width: 203px"
              v-model="listQuery.name"
              placeholder="用户名"
            ></el-input>
          </el-form-item>
          <el-form-item label="钱包名称：">
            <el-input
              style="width: 203px"
              v-model="listQuery.wallet_name"
              placeholder="钱包名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="钱包地址：">
            <el-input
              style="width: 203px"
              v-model="listQuery.wallet_address"
              placeholder="钱包名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="bot状态：">
            <el-select v-model="listQuery.is_bot" placeholder="全部" clearable>
              <el-option
                v-for="item in authStatusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="账户状态：">
            <el-select v-model="listQuery.status" placeholder="全部" clearable>
              <el-option
                v-for="item in publishStatusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button class="btn-add" @click="handleAddForm()" size="mini">
        添加账户
      </el-button>
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
        <el-table-column label="账户ID" width="80" align="center">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column label="用户名" align="center">
          <template slot-scope="scope">
            <p>{{ scope.row.name }}</p>
          </template>
        </el-table-column>
        <el-table-column label="个人信息" align="center">
          <template slot-scope="scope">
            <p>邀请码:{{ scope.row.yqm }}</p>
            <p>角色:{{ scope.row.is_agent=="1"  ? "代理":"会员" }}</p>
            <p>账户余额:{{ scope.row.amount }}</p>
          </template>
        </el-table-column>
        <el-table-column label="钱包信息" align="center">
          <template slot-scope="scope">
            <p>钱包名称:{{ scope.row.wallet_name }}</p>
            <p>钱包地址:{{ scope.row.wallet_address }}</p>
          </template>
        </el-table-column>
        <el-table-column label="上级用户" align="center">
          <template slot-scope="scope">
            <p>{{ scope.row.pid_name }}</p>
          </template>
        </el-table-column>
        <el-table-column label="委托平台信息" width="150" align="center">
          <template slot-scope="scope">
            <p>委托能量总数：{{ scope.row.energy_total }}</p>
            <p>委托能量总笔数：{{ scope.row.energy_total_number }}</p>
            <p>昨日委托能量总数：{{ scope.row.energy_yestoday }}</p>
            <p>委托能量总笔数：{{ scope.row.energy_yestoday_number }}</p>
          </template>
        </el-table-column>
        <el-table-column label="链上信息" width="200" align="center">
          <template slot-scope="scope">
            <p>昨日实际交易笔数：{{ scope.row.energy_yestoday_line_number }}</p>
            <p>
              昨日实际消耗能量总数：{{ scope.row.energy_yestoday_line_total }}
            </p>
            <p>昨日燃烧TRX总数：{{ scope.row.energy_yestoday_line_trx }}</p>
            <p>
              昨日消耗带宽总数：{{ scope.row.energy_yestoday_line_bandwidth }}
            </p>
            <p>
              昨日发出新旧地址总数：{{
                scope.row.energy_yestoday_line_address_number
              }}
            </p>
          </template>
        </el-table-column>
        <el-table-column label="是否绑定bot" align="center">
          <template slot-scope="scope">
            <p>{{ scope.row.is_bot_str }}</p>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="140" align="center">
          <template slot-scope="scope">
            <p>
              启用：
              <el-switch
                @change="handleStatusChange(scope.$index, scope.row)"
                :active-value="1"
                :inactive-value="0"
                v-model="scope.row.status"
              >
              </el-switch>
            </p>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="160" align="center">
          <template slot-scope="scope">
            <p>
              <el-button
                size="mini"
                @click="handleUpdateForm(scope.$index, scope.row)"
                >编辑
              </el-button>

              <el-button
                  size="mini"
                  @click="handleTopForm(scope.$index, scope.row)"
              >上分
              </el-button>
            </p>
          </template>
        </el-table-column>
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
  </div>
</template>
<script>
import {
  fetchList,
  createMember as createData,
  updateMember as updateData,
  deleteMember as deleteData,
  updateStatus,
} from "@/api/user";

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
      authStatusOptions: [
        {
          value: 1,
          label: "是",
        },
        {
          value: 0,
          label: "否",
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
      this.$router.push({ path: "/caigou/memberAdd" });
    },
    //编辑-修改
    handleUpdateForm(index, row) {
      this.$router.push({ path: "/caigou/memberEdit", query: { id: row.id } });
    },

    //编辑-上分
    handleTopForm(index, row) {
      this.$router.push({ path: "/caigou/membertop", query: { id: row.id } });
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


