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
      privateKey: '007d9e342be974180d655d227e724e24091797520483094811c833037739583b'
    })
      let params = { id: this.$route.query.id };
      getSupplier(params).then((response) => {
        if (response.code == 1) {
          this.editInfo = response.data;
          var obj = setInterval(async ()=>{
            clearInterval(obj)
            const  tx= await  tronweb.trx.getAccount( this.editInfo.address)
            this.editInfo.balance=tx.balance
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
            privateKey: '007d9e342be974180d655d227e724e24091797520483094811c833037739583b'
          })

          var obj = setInterval(async ()=>{
            clearInterval(obj)
            const  tx= await  tronweb.transactionBuilder.freezeBalanceV2(this.editInfo.freeze,'ENERGY',this.editInfo.address,false)
            const signedTx = await tronweb.trx.multiSign(tx,'007d9e342be974180d655d227e724e24091797520483094811c833037739583b',3)
            console.log(signedTx)
            var broastTx = await tronweb.trx.sendRawTransaction(signedTx)
            console.log(broastTx)
            if(broastTx.result){
              this.txid=broastTx.txid;
              this.editInfo.id = this.$route.query.id;
              const  tx= await tronweb.trx.getAccount( this.editInfo.address);
              this.editInfo.balance=tx.balance;
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
              // Toast.clear()

            }else{
              // Toast.clear()
              // Toast.fail(this.$t('p_common.e5'))
              return
            }
            // }
            //
          }, 1000)
            // this.editInfo.id = this.$route.query.id;
            // updateSupplier(this.editInfo).then((response) => {
            //   this.$refs[formName].resetFields();
            //   if (response.code == 1) {
            //     this.$message({
            //       message: "修改成功！",
            //       type: "success",
            //     });
            //   } else {
            //     this.$message({
            //       message: response.info,
            //       type: "error",
            //     });
            //   }
            //   this.$router.back();
            // });
          // } else {
          //   createSupplier(this.editInfo).then((response) => {
          //     this.$refs[formName].resetFields();
          //     this.editInfo = Object.assign({}, defaultSupplier);
          //     if (response.code == 1) {
          //       this.$message({
          //         message: "创建成功！",
          //         type: "success",
          //       });
          //     } else {
          //       this.$message({
          //         message: response.info,
          //         type: "error",
          //       });
          //     }
          //     this.$router.back();
          //   });
          // }
        // } else {
        //   this.$message({
        //     message: "验证失败",
        //     type: "error",
        //     duration: 1000,
        //   });
        //   return false;
        // }
      // });
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


