<script setup>
import { ref } from "vue";
import { useTokenStore } from "@/stores/token.js";
import { useUserInfoStore } from "@/stores/userInfo.js";
import { useRouter } from "vue-router";
import { userPasswordUpdateService } from "@/api/user.js";
import { ElMessage } from "element-plus";

const tokenStore = useTokenStore();
const userInfoStore = useUserInfoStore();
const router = useRouter();
const userPassword = ref({
  old_pwd: "",
  new_pwd: "",
  re_pwd: "",
});
// 定义验证规则
const validateOldPwd = (rule, value, callback) => {
  if (!value) {
    return callback(new Error("请输入原密码"));
  }
  if (value.length < 5 || value.length > 16) {
    return callback(new Error("密码长度必须在 5-16 个字符之间"));
  }
  callback();
};

const validateNewPwd = (rule, value, callback) => {
  if (!value) {
    return callback(new Error("请输入新密码"));
  }
  if (value.length < 5 || value.length > 16) {
    return callback(new Error("密码长度必须在 5-16 个字符之间"));
  }
  if (value === userPassword.value.old_pwd) {
    return callback(new Error("新密码不能与原密码相同"));
  }
  callback();
};

const validateRePwd = (rule, value, callback) => {
  if (!value) {
    return callback(new Error("请再次输入新密码"));
  }
  if (value !== userPassword.value.new_pwd) {
    return callback(new Error("两次输入的密码不一致"));
  }
  callback();
};

const rules = {
  old_pwd: [{ validator: validateOldPwd, trigger: "blur" }],
  new_pwd: [{ validator: validateNewPwd, trigger: "blur" }],
  re_pwd: [{ validator: validateRePwd, trigger: "blur" }],
};

// 修改用户密码
const updateUserPassword = async () => {
  let result = await userPasswordUpdateService(userPassword.value);
  if (result.code === 0) {
    // 1.清空pinia中存储的token及个人信息
    tokenStore.removeToken();
    userInfoStore.removeInfo();
    // 2. 跳转到登录页面
    router.push("/login");
    ElMessage.success("修改成功");
  } else {
    ElMessage.error(result.message || "修改失败");
  }
};
const clearInput = () => {
  userPassword.value = { old_pwd: "", new_pwd: "", re_pwd: "" };
};
</script>

<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span>修改密码</span>
      </div>
    </template>
    <el-row>
      <el-col :span="12">
        <el-form
          :model="userPassword"
          :rules="rules"
          label-width="100px"
          size="large"
        >
          <el-form-item label="原密码" prop="old_pwd">
            <el-input
              v-model="userPassword.old_pwd"
              type="password"
              placeholder="请输入原密码"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="new_pwd">
            <el-input
              v-model="userPassword.new_pwd"
              type="password"
              placeholder="请输入新密码"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item label="再次输入" prop="re_pwd">
            <el-input
              v-model="userPassword.re_pwd"
              type="password"
              placeholder="请再次输入新密码"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="updateUserPassword"
              >提交修改</el-button
            >
            <el-button @click="clearInput">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </el-card>
</template>
