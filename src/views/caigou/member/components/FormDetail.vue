<template>
  <el-card class="form-container" shadow="never">
    <el-form
      :model="editInfo"
      :rules="rules"
      ref="editInfoFrom"
      label-width="150px"
    >
      <el-form-item label="用户名" prop="name">
        <el-input v-model="editInfo.name"></el-input>
      </el-form-item>


      <el-form-item label="钱包名称" prop="wallet_name">
        <el-input v-model="editInfo.wallet_name"></el-input>
      </el-form-item>
      <el-form-item label="钱包地址" prop="wallet_address">
        <el-input v-model="editInfo.wallet_address"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="wallet_address">
        <el-input v-model="editInfo.password_unencrypted"></el-input>
      </el-form-item>

      <el-form-item label="代理单价" prop="sun_price" >
        <el-input v-model="editInfo.sun_price"></el-input>
      </el-form-item>


        <el-form-item label="角色" prop="wallet_address">
<!--          <el-input v-model="editInfo.password_unencrypted"></el-input>-->
          <el-select v-model="editInfo.is_agent" placeholder="请选择角色" clearable>
            <el-option
                v-for="item in roleOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

      <el-form-item label="上级运营" prop="name" v-if="editInfo.is_agent==2">
      <el-select v-model="editInfo.pid" placeholder="请选择上级运营" clearable>
        <el-option
            v-for="item in optionList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
        >
        </el-option>
      </el-select>
    </el-form-item>

      <el-form-item label="供应商钱包" prop="name" v-if="editInfo.is_agent==3">
        <el-select v-model="editInfo.sup_ids" multiple placeholder="供应商钱包" clearable>
          <el-option
              v-for="item in supplierList"
              :key="item.id"
              :label="item.title"
              :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>

        <el-button type="primary" @click="onSubmit('editInfoFrom')"
          >提交</el-button
        >
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
import {
  getMember as getData,
  updateMember as updateData,
  createMember as createData, chooseRoleList,
} from "@/api/user";
const defaultData = {
  name: "",
  wallet_name: "",
  wallet_address: "",
  password_unencrypted: "",
  status: 1,
  is_agent: '',
  agent_mid: '',
  pid: '',
  sup_ids: '',
};
export default {
  name: "MemberDetail",
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      editInfo: Object.assign({}, defaultData),
      optionList:null,
      supplierList:null,
      roleOptions: [
        {
          value: 3,
          label: "供应商",
        },
        {
          value: 2,
          label: "代理",
        },
        {
          value: 1,
          label: "运营中心",
        },
        {
          value: 0,
          label: "会员",
        },
      ],
    };
  },
  created() {
    this.getList();
    if (this.isEdit) {
      let params = { id: this.$route.query.id };
      getData(params).then((response) => {
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
    getList() {
      this.listLoading = true;
      chooseRoleList(this.listQuery).then((response) => {
        this.listLoading = false;
        if (response.code == 1) {
          const data = response.data;
          this.optionList = data.optionList;
          this.supplierList= data.supplierList;
        } else {
          this.$message({
            message: response.info,
            type: "error",
            duration: 3000,
          });
        }
      });
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.isEdit) {
            this.editInfo.id = this.$route.query.id;
            updateData(this.editInfo).then((response) => {
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
            createData(this.editInfo).then((response) => {
              this.$refs[formName].resetFields();
              this.editInfo = Object.assign({}, defaultData);
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


