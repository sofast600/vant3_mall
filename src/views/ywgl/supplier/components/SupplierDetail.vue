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
<!--      <el-form-item label="私钥：">-->
<!--        <el-input v-model="editInfo.privateKey"></el-input>-->
<!--      </el-form-item>-->
      <el-form-item label="排序：" prop="sort">
        <el-input v-model.number="editInfo.sort"></el-input>
      </el-form-item>
      <el-form-item label="是否显示：">
        <el-radio-group v-model="editInfo.status">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
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
import TronWeb from "tronweb";
const defaultSupplier = {
  title: "",
  address: "",
  status: 1,
  sort: 0,
};
export default {
  name: "SupplierDetail",
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
    if (this.isEdit) {
      let params = { id: this.$route.query.id };
      getSupplier(params).then((response) => {
        if (response.code == 1) {
          this.editInfo = response.data;
        } else {
          this.$message({
            message: response.info,
            type: "error",
          });
        }
      });
    } else {
      this.editInfo = Object.assign({}, defaultSupplier);
    }
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const TronWeb = require('tronweb')
          const tronweb =   new TronWeb({
            fullHost: 'https://api.trongrid.io',
            headers: { "TRON-PRO-API-KEY": '6695790a-649c-4b95-bc79-450e154b3bd2' },
            privateKey: ''
          })
          var obj = setInterval(async ()=>{
              clearInterval(obj)
              const  tx= await tronweb.trx.getAccount( this.editInfo.address);
              this.editInfo.balance=tx.balance/1000000;
            if (this.isEdit) {
              this.editInfo.id = this.$route.query.id;
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
            } else {
              createSupplier(this.editInfo).then((response) => {
                this.$refs[formName].resetFields();
                this.editInfo = Object.assign({}, defaultSupplier);
                if (response.code == 1) {
                  this.$message({
                    message: "创建成功！",
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
            }
          }, 1000)

        } else {
          this.$message({
            message: "验证失败",
            type: "error",
            duration: 1000,
          });
          return false;
        }
      });
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


