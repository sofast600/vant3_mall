<template>
  <el-card class="form-container" shadow="never">
    <el-form
        :model="editInfo"
        :rules="rules"
        ref="editInfoFrom"
        label-width="150px"
    >
      <el-form-item label="同一个IP允许注册数量" prop="same_ip_register_number">
        <el-input v-model="editInfo.same_ip_register_number"></el-input>
      </el-form-item>
      <el-form-item label="注册网页链接前缀" prop="front_url">
        <el-input v-model="editInfo.front_url"></el-input>
      </el-form-item>
      <el-form-item label="佣金比例" prop="commission_rate">
        <el-input  v-model="editInfo.commission_rate"></el-input>
      </el-form-item>
      <el-form-item label="提现手续费" prop="send_rate">
        <el-input  v-model="editInfo.send_rate"></el-input>
      </el-form-item>
      <el-form-item label="统一采购单价" prop="purchase_prices">
        <el-input  v-model="editInfo.purchase_prices"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit('editInfoFrom')"
        >提交</el-button
        >
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { getSetting, updateSetting } from "@/api/setting";
const defaultData = {
  send_rate: null,
  purchase_prices: null,
  commission_rate: null,
  front_url: null,
  same_ip_register_number: null,
};
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Detail",
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      editInfo: Object.assign({}, defaultData),
    };
  },
  created() {
    this.getSettings();
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
            if (valid) {
              console.log(this.editInfo.purchase_prices)
              updateSetting(this.editInfo).then((response) => {
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
              this.getSettings();
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
    getSettings(){
      getSetting().then((response) => {
        if (response.code == 1) {
          this.editInfo = response.data;
        } else {
          this.$message({
            message: response.info,
            type: "error",
          });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.editInfo = Object.assign({}, defaultData);
    },
  },
}
</script>

<style scoped>

</style>
