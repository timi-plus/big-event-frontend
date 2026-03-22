<script setup>
import avatar from "@/assets/default.png";
import { userInfoGetService } from "@/api/user.js";
//导入pinia
import { useUserInfoStore } from "@/stores/userInfo.js";
import { useTokenStore } from "@/stores/token.js";
const userInfoStore = useUserInfoStore();
const tokenStore = useTokenStore();
import { ref } from "vue";
import { useRouter } from "vue-router";
import { ElMessage, ElMessageBox } from "element-plus";
import { ro } from "element-plus/es/locale/index.mjs";
//获取个人信息
const getUserInf = async () => {
  let result = await userInfoGetService();
  //存储pinia
  userInfoStore.info = result.data;
};
getUserInf();
const router = useRouter();
//条目被点击.调用的函数
const handleCommand = (command) => {
  // 根据command的值，跳转到对应的路由
  if (command === "logout") {
    //退出登录
    ElMessageBox.confirm("确定要退出登录吗？", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    })
      .then(async () => {
        // 确定
        // 1.清空pinia中存储的token及个人信息
        tokenStore.removeToken();
        userInfoStore.removeInfo();
        // 2. 跳转到登录页面
        router.push("/login");

        ElMessage({
          type: "success",
          message: "退出登录成功",
        });
      })
      .catch(() => {
        //用户点击了取消
        ElMessage({
          type: "info",
          message: "用户取消了退出取消",
        });
      });
  } else {
    router.push(`/user/${command}`);
  }
};
</script>

<template>
  <el-container class="layout-container">
    <!-- 左侧菜单 -->
    <el-aside width="200px">
      <div class="el-aside__logo"></div>
      <el-menu
        active-text-color="#ffd04b"
        background-color="#232323"
        text-color="#fff"
        router
      >
        <el-menu-item index="/article/category">
          <el-icon>
            <Management />
          </el-icon>
          <span>文章分类</span>
        </el-menu-item>
        <el-menu-item index="/article/manage">
          <el-icon>
            <Promotion />
          </el-icon>
          <span>文章管理</span>
        </el-menu-item>
        <el-sub-menu>
          <template #title>
            <el-icon>
              <UserFilled />
            </el-icon>
            <span>个人中心</span>
          </template>
          <el-menu-item index="/user/info">
            <el-icon>
              <User />
            </el-icon>
            <span>基本资料</span>
          </el-menu-item>
          <el-menu-item index="/user/avatar">
            <el-icon>
              <Crop />
            </el-icon>
            <span>更换头像</span>
          </el-menu-item>
          <el-menu-item index="/user/resetPassword">
            <el-icon>
              <EditPen />
            </el-icon>
            <span>重置密码</span>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-aside>
    <!-- 右侧主区域 -->
    <el-container>
      <!-- 头部区域 -->
      <el-header>
        <div>
          用户名:<strong>{{
            userInfoStore.info.nickname
              ? userInfoStore.info.nickname
              : userInfoStore.info.usrename
          }}</strong>
        </div>
        <!-- 下拉菜单 -->
        <!-- command：条目被点击后出发，在事件函数上可以声明一个参数，参数的值就是当前条目的command属性值 -->
        <el-dropdown placement="bottom-end" @command="handleCommand">
          <span class="el-dropdown__box">
            <el-avatar
              :src="
                userInfoStore.info.userPic ? userInfoStore.info.userPic : avatar
              "
            />
            <el-icon>
              <CaretBottom />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="info" :icon="User"
                >基本资料</el-dropdown-item
              >
              <el-dropdown-item command="avatar" :icon="Crop"
                >更换头像</el-dropdown-item
              >
              <el-dropdown-item command="resetPassword" :icon="EditPen"
                >重置密码</el-dropdown-item
              >
              <el-dropdown-item command="logout" :icon="SwitchButton"
                >退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>
      <!-- 中间区域 -->
      <el-main>
        <!-- <div style="width: 1290px; height: 570px; border: 1px solid red">
          内容展示区
        </div> -->
        <router-view></router-view>
      </el-main>
      <!-- 底部区域 -->
      <el-footer>大事件 ©2026 Created by ZSJ</el-footer>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.layout-container {
  height: 100vh;

  .el-aside {
    background-color: #232323;

    &__logo {
      height: 120px;
      background: url("@/assets/logo.png") no-repeat center / 120px auto;
    }

    .el-menu {
      border-right: none;
    }
  }

  .el-header {
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .el-dropdown__box {
      display: flex;
      align-items: center;

      .el-icon {
        color: #999;
        margin-left: 10px;
      }

      &:active,
      &:focus {
        outline: none;
      }
    }
  }

  .el-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #666;
  }
}
</style>
