<template>
  <div class="app-container">
    <!-- <el-card class="filter-container" shadow="never">
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
          <el-form-item label="输入搜索：">
            <el-input
              style="width: 203px"
              v-model="listQuery.country"
              placeholder="国家名称"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card> -->
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button class="btn-add" @click="handleAddForm()" size="mini">
        添加
      </el-button>
    </el-card>
    <el-dialog
      title="收款设置"
      :visible.sync="editInfo.dialogVisible"
      width="45%"
    >
      <el-form
        :model="editPromotion"
        ref="editPromotionForm"
        label-width="150px"
        size="small"
      >
        <el-form-item label="收款地址：">
          <el-input
            v-model="editPromotion.address"
            style="width: 300px"
          ></el-input>
        </el-form-item>
        <el-form-item label="运营归属：">
          <el-select v-model="editPromotion.mid"  placeholder="请选择运营前端账号" size="small" style="width: 300px;" >
            <el-option
                v-for="item in midUserNameList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="收款二维码：" prop="image">
          <single-upload v-model="editPromotion.image"></single-upload>
        </el-form-item>
<!--        <el-form-item label="谷歌密钥：" v-if="!isEdit">-->
<!--          <el-input-->
<!--            v-model="editPromotion.secret"-->
<!--            style="width: 300px"-->
<!--          ></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="谷歌验证器二维码：" v-if="!isEdit">-->
<!--          <img :src="editPromotion.qrcodeImage" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="谷歌验证器验证码：">-->
<!--          <el-input-->
<!--            v-model="editPromotion.code"-->
<!--            style="width: 300px"-->
<!--          ></el-input>-->
<!--        </el-form-item>-->
        <el-form-item label="备注：">
          <el-input
            class="input-width"
            type="textarea"
            :rows="5"
            placeholder="请输入内容"
            v-model="editPromotion.remark"
          >
          </el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleDialogConfirm()" size="small"
          >确 定</el-button
        >
      </span>
    </el-dialog>
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
        <el-table-column label="收款地址" align="center">
          <template slot-scope="scope">
            <p>{{ scope.row.address }}</p>
          </template>
        </el-table-column>
        <el-table-column label="收款二维码" align="center">
          <template slot-scope="scope">
            <p>{{ scope.row.address }}</p>
          </template>
        </el-table-column>
        <el-table-column label="开关" width="140" align="center">
          <template slot-scope="scope">
            <p v-if="scope.row.midName==null">
              默认：
              <el-switch
                @change="handleDefaultChange(scope.$index, scope.row)"
                :active-value="1"
                :inactive-value="0"
                v-model="scope.row.is_default"
              >
              </el-switch>
            </p>
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
        <el-table-column label="运营归属" align="center">
          <template slot-scope="scope">
            <p>{{ scope.row.midName}}</p>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" align="center">
          <template slot-scope="scope">
            <p>{{ scope.row.create_at }}</p>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="160" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleUpdateForm(scope.$index, scope.row)"
              >编辑
            </el-button>
            <p>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                >删除
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
  createAddress as createData,
  updateAddress as updateData,
  deleteAddress as deleteData,
  updateStatus,
  updateDefault,
  getGoogle,
} from "@/api/address";
import SingleUpload from "@/components/Upload/singleUpload";
import {fetchAllRoleList} from "@/api/role";

const defaultListQuery = {
  keyword: null,
  page: 1,
  limit: 10,
};
const defaultEditPromotion = {
  id: null,
  address: null,
  type: "",
  image: null,
  secret: null,
  qrcodeImage: "",
  code: null,
  status: 1,
  mid: null,
};
export default {
  name: "formList",
  components: { SingleUpload },
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
      qrcodeData: null,
      listLoading: true,
      editPromotion: Object.assign({}, defaultEditPromotion),
      isEdit: false,
      midUserNameList:null,
    };
  },
  created() {
    this.getList();
    this.getAllRoleList();
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
    getAllRoleList() {
      fetchAllRoleList().then(response => {
        this.midUserNameList = response.data.mid;
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
      getGoogle().then((response) => {
        if (response.code == 1) {
          const data = response.data;
          this.editPromotion.qrcodeImage = data.qrcodeImage;
          this.editPromotion.secret = data.secret;
        }
      });
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

    //修改默认状态
    handleDefaultChange(index, row) {
      this.$confirm("是否要修改?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let params = { id: row.id, is_default: row.is_default };
          updateDefault(params).then((response) => {
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
          this.getList();
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
  },
};
</script>
<style></style>


