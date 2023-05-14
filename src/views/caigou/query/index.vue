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
          <el-form-item label="钱包地址：">
            <el-input
                style="width: 203px"
                v-model="listQuery.address"
                placeholder="查询的钱包地址"
            ></el-input>
          </el-form-item>
          <el-form-item label="订单状态：">
            <el-select v-model="listQuery.fee" placeholder="全部" clearable>
              <el-option
                  v-for="item in queryOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="查询时间：">
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
    <div class="total-layout">
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="total-frame">
            <div class="total-title">32000笔数</div>
            <div class="total-value">{{countTotal}}</div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="total-frame">
            <div class="total-title">64000笔数</div>
            <div class="total-value">{{countTotalTwo}}</div>
          </div>
        </el-col>
<!--        <el-col :span="8">-->
<!--          <div class="total-frame">-->
<!--            <img :src="img_home_yesterday_amount" class="total-icon">-->
<!--            <div class="total-title">昨日销售总额</div>-->
<!--            <div class="total-value">￥5000.00</div>-->
<!--          </div>-->
<!--        </el-col>-->

      </el-row>
    </div>
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
        <el-table-column label="txID" width="80" align="center">
          <template slot-scope="scope">{{ scope.row.txID }}</template>
        </el-table-column>
        <el-table-column label="发起地址" align="center">
          <template slot-scope="scope">
            <p>{{ scope.row.owner_address }}</p>
          </template>
        </el-table-column>
        <el-table-column label="接收地址" width="200" align="center">
          <template slot-scope="scope">
            <p>{{ scope.row.contract_address }}</p>
          </template>
        </el-table-column>

        <el-table-column label="消耗带宽数量" align="center">
          <template slot-scope="scope">
            {{ scope.row.net_usage }}
          </template>
        </el-table-column>
        <el-table-column label="带宽消耗TRX数量" align="center">
          <template slot-scope="scope">
            {{ scope.row.net_fee }}
          </template>
        </el-table-column>
        <el-table-column label="消耗能量数量" align="center">
          <template slot-scope="scope">{{ scope.row.energy_usage }}</template>
        </el-table-column>
        <el-table-column label="能量消耗TRX数量" align="center">
          <template slot-scope="scope">{{ scope.row.energy_fee }}</template>
        </el-table-column>
        <el-table-column label="消耗的能量总量" align="center">
          <template slot-scope="scope">
            {{ scope.row.energy_usage_total }}
          </template>
        </el-table-column>
        <el-table-column label="区块id" align="center">
          <template slot-scope="scope">
            <p>{{ scope.row.blockNumber }}</p>
          </template>
        </el-table-column>
        <el-table-column label="转账时间" align="center">
          <template slot-scope="scope">
            <p>{{ scope.row.block_timestamp | formatTime}}</p>
          </template>
        </el-table-column>
<!--        <el-table-column label="操作信息" align="center">-->
<!--          <template slot-scope="scope">-->
<!--            <p>创建时间：{{ scope.row.create_at }}</p>-->
<!--            <p>提款时间：{{ scope.row.trade_time_str }}</p>-->
<!--          </template>-->
<!--        </el-table-column>-->
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
  </div>
</template>
<script>
import axios from 'axios'
import TronWeb from "tronweb";
import {formatDate} from "@/utils/date";

const defaultListQuery = {
  keyword: null,
  page: 1,
  limit: 10,
  create_at: null,
  fee: null,
  address: "THUBvpNoCNVy3emYrhV2FwViWFrKriMzW4",
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
      queryOptions: [
        {
          value: 1,
          label: "32000",
        },
        {
          value: 2,
          label: "64000",
        },
      ],
      editInfo: {
        dialogVisible: false,
      },
      operateType: null,
      listQuery: Object.assign({}, defaultListQuery),
      list: [],
      retList: null,
      total: null,
      data0: null,
      data1: null,
      tronweb: null,
      listLoading: false,
      queryLoading: true,
      fingerprint:'',
      countTotal:0,
      countTotalTwo:0,
      calculateTotal:0,
      calculateTotalTwo:0,
      editPromotion: Object.assign({}, defaultEditPromotion),
      isEdit: false,
    };
  },
  filters:{
    formatType(type){
      if(type===1){
        return 'APP首页轮播';
      }else{
        return 'PC首页轮播';
      }
    },
    formatTime(time){
      if(time==null||time===''){
        return 'N/A';
      }
      let date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    },
  },
  created() {
    // this.getList();
    const TronWeb = require('tronweb')
     this.tronweb =   new TronWeb({
      fullHost: 'https://api.trongrid.io',
      headers: { "TRON-PRO-API-KEY": '6695790a-649c-4b95-bc79-450e154b3bd2' },
      privateKey: ''
    })
  },
  watch: {},
  methods: {
    //列表
    getList() {
      this.listLoading = true;
      this.list=[];
      this.countTotal=0;
      this.countTotalTwo=0;
      this.calculateTotalTwo=0;
      this.calculateTotal=0;
      this.fingerprint='';
      this.queryLoading=false;
      if(this.listQuery.create_at!=null) {//时间范围精确到小时
        console.log('data0:',this.listQuery.create_at)
        this.data0 = this.listQuery.create_at[0].getTime()
        this.data1= this.listQuery.create_at[1].getTime()+86400000

        console.log('data0',this.data0)
        console.log('data1:',this.data1)
      }
      if(this.data0==null){
        this.data0=0
      }
      if(this.data1==null){
        let time=new Date();
        this.data1 = time.getTime();
      }
      if(this.listQuery.address!=''){
         var  time=this.data1-this.data0;
        if(time==86400000){
          this.data0 = this.listQuery.create_at[0].getTime()
          this.data1= this.listQuery.create_at[1].getTime()+10800000-1
          for(var i = 0; i < 8; i++){
            this.data0 =this.data0+10800000;
            this.data1=  this.data1+10800000;
            this.getTransactions();
            // this.data1= this.data1-1
          }

        }else{
          this.getTransactions();
        }
      }
    },
    getTransactions(){
      const  url="https://api.trongrid.io/v1/accounts/"+this.listQuery.address+"/transactions?only_confirmed=true&only_from=true&limit=200&min_timestamp="+this.data0+"&max_timestamp="+this.data1+"&fingerprint="+this.fingerprint;
      axios.get(url,{
        only_confirmed:true,
        only_from:true,
        limit:200,
        min_timestamp:this.data0,
        max_timestamp:this.data1,
      }).then(res => {
        this.retList=res.data.data
        this.metaList=res.data.meta
        this.retList.forEach(element => {
          var item  = {};
          if( element.raw_data.contract[0].type=='TriggerSmartContract'){
            if(element.energy_usage_total>32000){
              this.calculateTotalTwo=this.calculateTotalTwo+1;
            }else{
              this.calculateTotal=this.calculateTotal+1;
            }
            item.energy_usage = element.energy_usage;
            item.net_usage = element.net_usage;
            item.net_fee = element.net_fee;
            item.txID = element.txID;
            item.energy_usage_total = element.energy_usage_total;
            item.energy_fee = element.energy_fee;
            item.blockNumber = element.blockNumber;
            item.block_timestamp = element.block_timestamp;
            item.contract_address = this.tronweb.address.fromHex(element.raw_data.contract[0].parameter.value.contract_address);
            item.owner_address =this.tronweb.address.fromHex(element.raw_data.contract[0].parameter.value.owner_address);

           if(this.listQuery.fee==1){
             if(element.energy_usage_total<=32000){
               // for(let k = 1; k < this.list.length; k++){
               //   if( nums[k] == item.block_timestamp ){
               //
               //   }else{
               //
               //   }
               //
               // }
               this.list.push(item);

             }
           }else if (this.listQuery.fee==2){
             if(element.energy_usage_total>32000){
               this.list.push(item);
             }
           }else{
             this.list.push(item);
           }

          }

        });
        if(this.metaList.page_size==200){
          this.fingerprint=this.metaList.fingerprint
          this.getTransactions();
        }else{
          this.fingerprint='';
          this.countTotalTwo=this.calculateTotalTwo
          this.countTotal=this.calculateTotal
          this.listLoading = false;
          this.total = this.list.length;
          this.queryLoading=true;
        }

      }).catch(error => {
        this.queryLoading=true;
        this.listLoading = false;
        console.log(error)
      })
    },
    //搜索
    handleSearchList() {
      this.listQuery.page = 1;
      if(this.queryLoading){
        this.getList();
      }else{
        this.$message({
          message: "请等查询结果完毕在继续查询",
          type: "error",
          duration: 3000,
        });
      }
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
<style>

.total-layout {
  margin-top: 20px;
}

.total-frame {
  /*border: 1px solid #DCDFE6;*/
  padding: 20px;
  height: 70px;
}
.total-title {
  position: relative;
  font-size: 16px;
  color: #909399;
  left: 70px;
  /*top: -50px;*/
}

.total-value {
  position: relative;
  font-size: 18px;
  color: #606266;
  left: 70px;
  /*top: -40px;*/
}
</style>


