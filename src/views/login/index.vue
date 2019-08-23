<template>
  <div :style="{ 'backgroundImage': 'url(\'' + tbgImg + '\')' }" class="login-container">
    <h1 class="sys-title">后台管理系统</h1>
    <div class="sys-sub-title">
      <h2>后台管理系统</h2>
      <h3>Information Management System</h3>
    </div>
    <!--<div style="height: 400px; background-color: red;"></div>-->
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon class="licon" icon-class="wode"/>
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          :autofocus="true"
          :placeholder="$t('login.username')"
          name="username"
          type="text"
          auto-complete="on"
          @keyup.enter.native="focusNext('password')"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon class="licon" icon-class="mima"/>
        </span>
        <el-input
          ref="password"
          :type="passwordType"
          v-model="loginForm.password"
          :placeholder="$t('login.password')"
          name="password"
          auto-complete="off"
          @keyup.enter.native="focusNext('validate')"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye"/>
        </span>
      </el-form-item>

      <el-form-item prop="validate">
        <span class="svg-container">
          <svg-icon class="licon" icon-class="yanzhengma-cuxiantiao"/>
        </span>
        <el-input
          ref="validate"
          v-model="loginForm.validate"
          :placeholder="$t('login.validate')"
          type="text"
          name="validate"
          auto-complete="off"
          @keyup.enter.native="handleLogin"
        />
        <img :src="getCodeImage() + '?' + codeSrcRd" class="show-code-img" @click="loadCode">
      </el-form-item>

      <el-button
        :loading="loading"
        class="primary"
        style="width:100%;margin-bottom:30px;background-color: #2d3a4b;height: 50px;font-size: 24px;color: #fff;"
        @click.native.prevent="handleLogin"
      >{{ $t('login.logIn') }}</el-button>
    </el-form>
  </div>
</template>

<script>
import { isvalidUsername } from "@/utils/validate"
import LangSelect from "@/components/LangSelect"
import { getLoginImage, checkLogin } from "@/api/login"
import tbg from "@/assets/login/tbg.jpg"

export default {
  name: "Login",
  components: { LangSelect },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error("请输入登录用户名"))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("密码必须6位以上"))
      } else {
        callback()
      }
    }
    const validateCode = (rule, value, callback) => {
      callback()
    }
    return {
      loginForm: {
        username: "",
        password: "",
        validate: ""
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername }
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword }
        ],
        validate: [{ required: false, trigger: "blur", validator: validateCode }]
      },
      passwordType: "password",
      codeSrcRd: "",
      loading: false,
      showDialog: false,
      redirect: undefined,
      tbgImg: tbg
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {},
  destroyed() {},
  methods: {
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = ""
      } else {
        this.passwordType = "password"
      }
    },
    getCodeImage() {
      return getLoginImage()
    },
    focusNext(nextElement) {
      this.$refs[nextElement].focus()
    },
    loadCode() {
      this.$set(this.loginForm, "validate", "")
      this.codeSrcRd = "_t=" + new Date().getTime()
    },
    /* eslint handle-callback-err: "warn" */
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          checkLogin(
            this.loginForm.username,
            this.loginForm.password,
            this.loginForm.validate
          ).then(
            res => {
              const data = res.data
              if (data.needOutCnt > 0) {
                this.$alert(
                  "当前用户已经登录，点击确定将移除原登录？",
                  "已登录提醒",
                  {
                    confirmButtonText: "确定",
                    callback: action => {
                      this.doLogin(data.token)
                    }
                  }
                )
              } else {
                this.doLogin(data.token)
              }
            },
            error => {
            // 重新加载验证码
              this.loadCode()
            })
        } else {
          // 重新加载验证码
          this.loadCode()
          return false
        }
      })
    },
    doLogin(token) {
      this.loading = true
      this.$store
        .dispatch("LoginByUsername", { ...this.loginForm, token: token })
        .then(data => {
          // 登录成功获取参数列表
          this.$store.dispatch("loadAppCfg").then(() => {
            this.loading = false
            this.$router.push({ path: this.redirect || "/" })
          })
        })
        .catch(() => {
          this.loading = false
          // 重新加载验证码
          this.loadCode()
        })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #ffffff;
$light_gray: #eee;
$cursor: #000;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
    &::first-line {
      color: $cursor;
    }
  }
}

/* reset element-ui css */
.login-container {
  font-family: "Microsoft YaHei";
  background-repeat: no-repeat;
  background-size: auto 300px;
  text-align: center;
  .sys-title {
    font-size: 48px;
    font-weight: 500;
    margin-top: 60px;
    color: white;
  }
  .sys-sub-title {
    width: 336px;
    border: 2px solid #d3edff;
    color: #d3edff;
    margin: 30px auto;
    h2 {
      font-weight: 300;
      font-size: 34px;
      margin: 20px 0 0 0;
    }
    h3 {
      font-weight: normal;
      font-size: 14px;
      margin: 10px 0 10px 0;
    }
  }
  .el-input {
    display: inline-block;
    width: 85%;
    input {
      color: black;
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      height: 48px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid #ccc;
    color: #9d9d9d;
    line-height: 48px;
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #fff;
$dark_gray: #889aa4;
$light_gray: #eee;
.login-container {
  position: relative;
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    min-height: 420px;
    padding: 70px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    border: 0px solid #ccc;
    background-color: #2d3a4b;
    vertical-align: middle;
    box-sizing: border-box;
    color: white;
    width: 50px;
    height: 50px;
    display: inline-block;
    position: relative;
    left: -7px;
    top: 0px;
    .licon {
      margin-top: 14px;
      font-size: 22px;
    }
  }
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .set-language {
      color: #fff;
      position: absolute;
      top: 5px;
      right: 0px;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    cursor: pointer;
    user-select: none;
  }
  .show-code-img {
    position: absolute;
    right: 5px;
    top: 5px;
    bottom: 10px;
    width: 100px;
    cursor: pointer;
    user-select: none;
  }
  .thirdparty-button {
    font-weight: normal;
    width: 100%;
    text-align: center;
    position: absolute;
    font-size: 14px;
    color: #666;
    bottom: 30px;
  }
}
</style>
