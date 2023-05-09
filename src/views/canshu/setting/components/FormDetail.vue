<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="editInfo" ref="editInfoFrom">
      <el-form-item label="" prop="same_ip_register_number">
        <div class="sub-title">
          同一个IP允许注册数量 same_ip_register_number (0不限制)
        </div>
        <el-input v-model="editInfo.same_ip_register_number"></el-input>
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
const defaultSetting = {
  title: "",
  address: "",
  status: 1,
  sort: 0,
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
      editInfo: Object.assign({}, defaultSetting),
    };
  },
  created() {
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
            this.getSetting();
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
      this.editInfo = Object.assign({}, defaultSetting);
    },
  },
};
</script>
<style>
</style>


