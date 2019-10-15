<template>
  <div class="Login">
    <div class="login-box">
      <h1>登录页面</h1>
      <div class="login-boxboss">
      <el-form
        :label-position="labelPosition"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        :model="formLabelAlign"
      >
        <el-form-item label="用户名:" prop="username">
          <el-input type="text" v-model="formLabelAlign.username" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="password">
          <el-input type="password" v-model="formLabelAlign.password" clearable></el-input>
        </el-form-item>
      </el-form>
      <el-button  type="primary" @click="submitForm('ruleForm')">登陆</el-button>
      </div>

    </div>
  </div>
</template>

<script>
import { Message } from "element-ui";
import service from "../service/index";
export default {
  name: "Login",
  data() {
    return {
      labelPosition: "left",
      formLabelAlign: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名长度在 3 到 12 个字符",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码长度在 3 到 15 个字符",
            trigger: "blur"
          },
          { min: 3, max: 15, message: "长度在 3 到 15 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          service
            .login(this.formLabelAlign)
            .then(res => {
              console.log(res.data);
              if (res.data.code === 0) {
                Message({
                  showClose: true,
                  message: "请输入正确的用户名或密码",
                  type: "error"
                });
              } else if (res.data.code == 1) {
                sessionStorage.setItem("login_token", res.data.token);
                this.$router.push("home");//登录成功后跳转到后台权限页面
              }
            })
            .catch(() => {
              Message({
                showClose: true,
                message: "本地网络错误",
                type: "warning"
              });
            });
        } else {
          Message({
            showClose: true,
            message: "请输入正确的用户名或密码",
            type: "error"
          });
          return;
        }
      });
    }
  }
};
</script>

<style lang='scss'scoped >
.Login {
  width: 100%;
  height: 100%;
  .login-box {
    width: 450px;
    padding-right: 20px;
    margin: 400px auto;
    border: 1px solid #ccc;
    h1 {
      text-align: center;
    }
    a {
      margin-left: 100px;
    }
  }
}
</style>
                                                                                                