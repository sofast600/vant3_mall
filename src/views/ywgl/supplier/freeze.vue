<template>
  <el-card class="form-container" shadow="never">
    <el-form
        :model="editInfo"
        :rules="rules"
        ref="editInfoFrom"
        label-width="150px"
    >
      <el-form-item label="供应商名称：" prop="title">
        <el-input v-model="editInfo.title"></el-input>
      </el-form-item>
      <el-form-item label="地址：">
        <el-input v-model="editInfo.address"></el-input>
      </el-form-item>
      <el-form-item label="账户trx余额：">
        <el-input readonly  v-model="editInfo.balance"></el-input>
      </el-form-item>
      <el-form-item label="选择质押trx：" prop="freeze">
        <el-input v-model.number="editInfo.freeze"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit('editInfoFrom')"
        >提交</el-button
        >
        <el-button v-if="!isEdit" @click="resetForm('editInfoFrom')"
        >重置</el-button
        >
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
import { createSupplier, getSupplier, updateSupplier } from "@/api/supplier";
// import { trxWeb} from "@/utils/trxWeb";
import TronWeb from "tronweb";
const defaultSupplier = {
  title: "",
  address: "",
  status: 1,
  sort: 0,
};
export default {
  name: "freeze",
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      editInfo: Object.assign({}, defaultSupplier),
      rules: {
        sort: [{ type: "number", message: "排序必须为数字" }],
      },
    };
  },
  created() {
    // if (this.isEdit) {
    const TronWeb = require('tronweb')
    const tronweb =   new TronWeb({
      fullHost: 'https://api.trongrid.io',
      headers: { "TRON-PRO-API-KEY": '6695790a-649c-4b95-bc79-450e154b3bd2' },
      privateKey: ''
    })
      let params = { id: this.$route.query.id };
      getSupplier(params).then((response) => {
        if (response.code == 1) {
          this.editInfo = response.data;
          var obj = setInterval(async ()=>{
            clearInterval(obj)
            const  tx= await  tronweb.trx.getAccount( this.editInfo.address)
            this.editInfo.balance=tx.balance/1000000
          }, 1000)
        } else {
          this.$message({
            message: response.info,
            type: "error",
          });
        }
      });
    // } else {
    //   this.editInfo = Object.assign({}, defaultSupplier);
    // }
  },
  methods: {
    onSubmit(formName) {
      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
          const TronWeb = require('tronweb')
          const tronweb =   new TronWeb({
            fullHost: 'https://api.trongrid.io',
            headers: { "TRON-PRO-API-KEY": '6695790a-649c-4b95-bc79-450e154b3bd2' },
            privateKey: '88910afb27e6423d297ea5b30a55da51675022bbbe147caf11c7c4c4347991f9'
          })

          var obj = setInterval(async ()=>{
            clearInterval(obj)
            const  tx= await  tronweb.transactionBuilder.freezeBalanceV2(this.editInfo.freeze *1000000,'ENERGY',this.editInfo.address,false)
            const signedTx = await tronweb.trx.multiSign(tx,'',3)
            console.log(signedTx)
            var broastTx = await tronweb.trx.sendRawTransaction(signedTx)
            console.log(broastTx)
            if(broastTx.result){
              this.txid=broastTx.txid;
              this.editInfo.id = this.$route.query.id;
              const  tx= await tronweb.trx.getAccount( this.editInfo.address);
              this.editInfo.balance=tx.balance/1000000;
              updateSupplier(this.editInfo).then((response) => {
                this.$refs[formName].resetFields();
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
                this.$router.back();
              });
            }else{

              return
            }
            // }
            //
          }, 1000)

    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.editInfo = Object.assign({}, defaultSupplier);
    },
  },
};
</script>
<style>
</style>


