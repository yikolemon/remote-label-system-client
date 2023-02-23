<template>
  <el-form ref="registerForm" :model="registerUser" :rules="registerRules" label-width="100px"
    class="registerForm sign-up-form">
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="registerUser.email" placeholder="Enter Email..."></el-input>
      <!-- <el-button plain @click="""">发送验证码</el-button> -->
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="registerUser.password" type="password" placeholder="Enter Password..."></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="password2">
      <el-input v-model="registerUser.password2" type="password" placeholder="Enter Password..."></el-input>
    </el-form-item>

    <el-form-item>
      <el-button @click="handleRegister('registerForm')" type="primary" class="submit-btn">注册</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { ref, getCurrentInstance } from "vue";
import {useRouter} from 'vue-router'
// import axios from 'axios' // 仅限在当前组件使用
export default {
  props: {
    registerUser: {
      type: Object,
      required: true,
    },
    registerRules: {
      type: Object,
      required: true,
    },
  },
  setup(props: any) {
    // @ts-ignore
    const { ctx } = getCurrentInstance();
    const router =useRouter();
    const handleRegister = (formName: string) => {
      ctx.$refs[formName].validate((valid: boolean) => {
        if (valid) {
          ctx.$axios
            .post(
              "127.0.0.1:9000/user/doRegister",
              props.registerUser
            )
            .then((res: any) => {
              ctx.$message({
                message: "注册成功",
                type: "success",
              });
            });
            //路由跳转
            router.push("/");
        } else {
          console.log("error submit!!");
          return false;
        }
      });

    };

    const sendRegisterMail=(formName:String)=>{
      ctx.$refs[formName].validateFiled("email",(errMsg: any)=>{
        if (errMsg) {
          console.log("手机号校验未通过");
        } else {
          console.log("校验通过");
        }
      })
    }

    return { handleRegister };
  },
};
</script>
<style scoped>
</style>
