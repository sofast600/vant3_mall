<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="editInfo" ref="editInfoFrom">
      <el-form-item label="" prop="same_ip_register_number">
        <div class="sub-title">
          同一个IP允许注册数量 same_ip_register_number (0不限制)
        </div>
        <el-input v-model="editInfo.same_ip_register_number"></el-input>
      </el-form-item>
      <el-form-item label="" prop="front_url">
        <div class="sub-title">
          注册网页链接前缀 front_url
        </div>
        <el-input v-model="editInfo.front_url"></el-input>
      </el-form-item>
      <el-form-item label="" prop="commission_rate">
        <div class="sub-title">
          佣金比例 commission_rate  填写5即为百分5
        </div>
        <el-input v-model="editInfo.commission_rate"></el-input>
      </el-form-item>

      <el-form-item label="" prop="send_rate">
        <div class="sub-title">
          提现手续费 send_rate  填写5即为5trx
        </div>
        <el-input v-model="editInfo.send_rate"></el-input>
      </el-form-item>

      <el-form-item label="" prop="purchase_prices">
        <div class="sub-title">
           统一采购单价  purchase_prices  填写5即为5
        </div>
        <el-input v-model="editInfo.purchase_prices"></el-input>
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
// const defaultSetting = {
//   title: "",
//   address: "",
//   status: 1,
//   sort: 0,
//   // send_rate: 0,
//   // purchase_prices: 0,
//   // commission_rate: 0,
//   // front_url: "",
//   // same_ip_register_number: 0,
// };
const defaultData = {
  send_rate: null,
  purchase_prices: null,
  commission_rate: null,
  front_url: null,
  same_ip_register_number: null,
};
export default {
  name: "SettingDetail",
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
    // resetForm(formName) {
    //   this.$refs[formName].resetFields();
    //   this.editInfo = Object.assign({}, defaultSetting);
    // },
  },
};
</script>
<style>
</style>


