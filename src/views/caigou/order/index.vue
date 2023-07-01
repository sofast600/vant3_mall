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
          <el-form-item label="采购方名称：">
            <el-input
              style="width: 203px"
              v-model="listQuery.name"
              placeholder="采购方名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="资源发起地址：">
            <el-input
              style="width: 203px"
              v-model="listQuery.payment_address"
              placeholder="资源发起地址"
            ></el-input>
          </el-form-item>
          <el-form-item label="资源接收地址：">
            <el-input
                style="width: 203px"
                v-model="listQuery.energy_address"
                placeholder="资源接收地址"
            ></el-input>
          </el-form-item>
          <el-form-item label="订单状态：">
            <el-select v-model="listQuery.result_status" placeholder="全部" clearable>
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
      <el-button class="btn-add"  size="mini">
        一键回收
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
        <el-table-column label="ID" width="80" align="center">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column label="用户信息" width="150" align="center">
          <template slot-scope="scope">
            <p>{{ scope.row.name }}</p>
          </template>
        </el-table-column>
        <el-table-column label="上级用户" align="center">
          <template slot-scope="scope">
            <p>{{ scope.row.agent_name}}</p>
          </template>
        </el-table-column>
        <el-table-column label="订单号" width="180"  align="center">
          <template slot-scope="scope">
            <p>{{ scope.row.order_no }}</p>
          </template>
        </el-table-column>
        <el-table-column label="哈希ID" width="500"   align="center">
          <template slot-scope="scope">
            <p>{{ scope.row.hashid }}</p>
<!--            <p>哈希:{{ scope.row.hashid }}</p>-->
          </template>
        </el-table-column>

        <el-table-column label="采购类型"    align="center">
          <template slot-scope="scope">
<!--            <p>交易类型:{{ scope.row.transaction_type_str }}</p>-->
            <p>{{ scope.row.purchase_type_str }}</p>
          </template>
        </el-table-column>
        <el-table-column label="计算类型"    align="center">
          <template slot-scope="scope">
            <p>{{ scope.row.type_str }}</p>
          </template>
        </el-table-column>
        <el-table-column label="交易类型" align="center">
          <template slot-scope="scope">
            <p>{{ scope.row.transaction_type_str }}</p>
          </template>
        </el-table-column>
        <el-table-column label="发起地址" width="180" align="center">
          <template slot-scope="scope">
            <p>{{ scope.row.payment_address }}</p>
          </template>
        </el-table-column>
        <el-table-column label="接收地址" width="180" align="center">
          <template slot-scope="scope">
            <p>{{ scope.row.energy_address }}</p>
          </template>
        </el-table-column>
<!--        <el-table-column label="出售周期" align="center">-->
<!--          <template slot-scope="scope">-->
<!--            <p>{{ scope.row.sales_cycle }}</p>-->
<!--          </template>-->
<!--        </el-table-column>-->
<!--        <el-table-column label="出售数量" align="center">-->
<!--          <template slot-scope="scope">-->
<!--            <p>{{ scope.row.sales_num }}</p>-->
<!--          </template>-->
<!--        </el-table-column>-->
<!--        <el-table-column label="订单数量" align="center">-->
<!--          <template slot-scope="scope">-->
<!--            <p>{{ scope.row.money }}</p>-->
<!--          </template>-->
<!--        </el-table-column>-->
<!--        <el-table-column label="资源单价" align="center">-->
<!--          <template slot-scope="scope">-->
<!--            <p>{{ scope.row.resource_price }}</p>-->
<!--          </template>-->
<!--        </el-table-column>-->
        <el-table-column label="到账状态" align="center">
          <template slot-scope="scope">
            <p>{{scope.row.result_status_str }}</p>
          </template>
        </el-table-column>
        <el-table-column label="资源状态" align="center">
          <template slot-scope="scope">
            <p>{{scope.row.resource_status==1 ? "已回收":"未回收" }}</p>
          </template>
        </el-table-column>
        <el-table-column label="扣款金额" align="center">
          <template slot-scope="scope">
            <p>{{ scope.row.money}}</p>
          </template>
        </el-table-column>
        <el-table-column label="占用TRX" align="center">
          <template slot-scope="scope">
            <p>{{ scope.row.pr_trx}}</p>
          </template>
        </el-table-column>
        <el-table-column label="购买能量" align="center">
          <template slot-scope="scope">
            <p>{{ scope.row.number }}</p>
          </template>
        </el-table-column>
        <el-table-column label="交易笔数" align="center">
          <template slot-scope="scope">
            <p>{{ scope.row.sales_num }}</p>
          </template>
        </el-table-column>
<!--        <el-table-column label="消息通知信息" align="center">-->
<!--          <template slot-scope="scope">-->
<!--            <p>TgID：{{ scope.row.chat_id }}</p>-->
<!--            <p>Tg姓名：{{ scope.row.chat_first }}</p>-->
<!--          </template>-->
<!--        </el-table-column>-->
<!--        <el-table-column label="消息是否通知" align="center">-->
<!--          <template slot-scope="scope">-->
<!--            <p>{{ scope.row.chat_first_str }}</p>-->
<!--          </template>-->
<!--        </el-table-column>-->
<!--        <el-table-column label="状态" width="140" align="center">-->
<!--          <template slot-scope="scope">-->
<!--            <p>{{ scope.row.status_str }}</p>-->
<!--          </template>-->
<!--        </el-table-column>-->
        <el-table-column label="下单时间" width="320px" align="center">
          <template slot-scope="scope">
            <p>{{ scope.row.begin_time | formatTime }}-{{ scope.row.end_time | formatTime }}</p>
<!--            <p>结束时间:{{ scope.row.end_time | formatTime }}</p>-->
          </template>
        </el-table-column>
        <el-table-column label="操作" width="160" align="center">
          <template slot-scope="scope">
            <p >
              <el-button
                  v-if="scope.row.resource_status==0"
                  size="mini"
                  @click="handleShowRecycle(scope.$index, scope.row)">能量回收
              </el-button>
<!--              <el-button-->
<!--                  size="mini"-->
<!--                  @click="handleUpdateProduct(scope.$index, scope.row)">编辑-->
<!--              </el-button>-->
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
import { fetchList,recycle } from "@/api/order";
import {formatDate} from "@/utils/date";
import moment from "moment";

const defaultListQuery = {
  keyword: null,
  page: 1,
  limit: 10,
  payment_address: null,
  create_at: null,
  begin_date: null,
  end_date: null,
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
  filters:{
    formatTime(time) {
      if(time==null||time===''){
        return 'N/A';
      }
      time=parseInt(time)
      let date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    },
  },
  data() {
    return {
      addressId:3,
      orderStatusOptions: [
        {
          value: 1,
          label: "待确认",
        },
        {
          value: 2,
          label: "正在转",
        },
        {
          value: 3,
          label: "已确认",
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
      if(this.listQuery.create_at!=null) {//时间范围精确到小时
        this.listQuery.begin_date = moment(this.listQuery.create_at[0].getTime()).format('YYYY-MM-DD ')
        this.listQuery.end_date= moment(this.listQuery.create_at[1].getTime()).format('YYYY-MM-DD ')
      }else{
        this.listQuery.begin_date = null
        this.listQuery.end_date= null
      }
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
    handleShowRecycle(index, row) {
      this.$confirm("是否要进行能量回收操作?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.editPromotion = Object.assign({}, row);
        const TronWeb = require("tronweb");
        const tronweb = new TronWeb({
          fullHost: "https://api.trongrid.io",
          headers: {"TRON-PRO-API-KEY": "6695790a-649c-4b95-bc79-450e154b3bd2"},
          privateKey:
              "88910afb27e6423d297ea5b30a55da51675022bbbe147caf11c7c4c4347991f9",
        });
        var to = tronweb.address.toHex(this.editPromotion.energy_address);
        var from = tronweb.address.toHex(this.editPromotion.payment_address);
        var obj = setInterval(async () => {
              clearInterval(obj);
        const tx = await tronweb.transactionBuilder.undelegateResource(
            this.editPromotion.money,
            to,
            "ENERGY",
            from,
        );
          let accountInfo = await tronweb.trx.getAccount(from);
          for (let i = 0; i < accountInfo.active_permission.length; i++) {
            if (tronweb.address.toHex(this.addressDefalt) == accountInfo.active_permission[i].keys[0].address) {
              this.addressId = accountInfo.active_permission[i].id
            }
          }
          const signedTx = await tronweb.trx.multiSign(
              tx,
              "88910afb27e6423d297ea5b30a55da51675022bbbe147caf11c7c4c4347991f9",
              this.addressId
          );

          const broastTx = await tronweb.trx.sendRawTransaction(signedTx);
          // console.log(broastTx);
          if (broastTx.result) {
            let params ={
              order_no: this.editPromotion.order_no,
            };
            recycle(params).then((response) => {
              if (response.code == 1) {
                this.$message({
                  message: "回收成功！",
                  type: "success",
                });
                this.getList();
              } else {
                this.$message({
                  message: response.info,
                  type: "error",
                });
              }
            });
          }else{
            this.$message({
              message: "回收失败！",
              type: "error",
            });
          }

            }, 1000);
      //   let  time=new Date().getTime();
      //     if(row.end_time>time){
      //       this.$message({
      //         message: "能量到期时间未到期，无法回收",
      //         type: "warning",
      //         duration: 1000,
      //       });
      //     }else{
      //
      //     }


      });

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


