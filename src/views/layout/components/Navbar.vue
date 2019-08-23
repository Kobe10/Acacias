<template>
  <div class="navbar">
    <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>
    <div :class="{'tags-container-mobile':device==='mobile'}" class="tags-container">
      <tags-view/>
    </div>
    <div class="right-menu">
      <template v-if="device!=='mobile'">
        <el-tooltip :content="$t('navbar.screenfull')" effect="dark" placement="bottom">
          <screenfull class="screenfull right-menu-item"/>
        </el-tooltip>
        <el-tooltip :content="$t('navbar.size')" effect="dark" placement="bottom">
          <size-select class="international right-menu-item"/>
        </el-tooltip>
        <!--<el-tooltip :content="$t('navbar.theme')" effect="dark" placement="bottom">
          <theme-picker class="theme-switch right-menu-item"/>
        </el-tooltip>-->
      </template>

      <el-dropdown class="avatar-container right-menu-item" trigger="click">
        <div class="avatar-wrapper">
          <el-badge is-dot>
            <svg-icon icon-class="user" class="user-image"/>
          </el-badge>
          <label class="user-name">{{ name }}</label>
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>
              {{ $t('navbar.dashboard') }}
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span style="display:block;" @click="chgpwd">{{ $t('navbar.chgpwd') }}</span>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">{{ $t('navbar.logOut') }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-dialog
      :visible.sync="dialogVisible"
      :before-close="hideDialog"
      :title="$t('navbar.chgpwd')"
      width="30%">
      <el-form ref="form" :model="pwdform" :rules="pwdRules" status-icon label-width="80px">
        <el-form-item label="原  密  码" prop="oldPassword">
          <el-input v-model="pwdform.oldPassword" type="password"/>
        </el-form-item>
        <el-form-item label="新  密  码" prop="newPassword">
          <el-input v-model="pwdform.newPassword" type="password"/>
        </el-form-item>
        <el-form-item label="密码确认" prop="newPasswordCfm">
          <el-input v-model="pwdform.newPasswordCfm" type="password"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="hideDialog">取 消</el-button>
        <el-button type="primary" @click="doChangePwd">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import ErrorLog from '@/components/ErrorLog'
import Screenfull from '@/components/Screenfull'
import SizeSelect from '@/components/SizeSelect'
import LangSelect from '@/components/LangSelect'
import ThemePicker from '@/components/ThemePicker'
import TagsView from './TagsView'
import * as SysApi from '@/api/sys'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    SizeSelect,
    LangSelect,
    ThemePicker,
    TagsView
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.pwdform.newPassword !== '') {
          this.$refs.form.validateField('newPasswordCfm')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.pwdform.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      dialogVisible: false,
      pwdform: {oldPassword: '', newPassword: '', newPasswordCfm: ''},
      pwdRules: {
        oldPassword: [
          {required: true, message: '请输入旧密码', trigger: 'blur'}
        ],
        newPassword: [
          {required: true, message: '请输入新密码', trigger: 'blur'},
          {validator: validatePass, trigger: 'blur'}
        ],
        newPasswordCfm: [
          {required: true, message: '请再次输入密码', trigger: 'blur'},
          {validator: validatePass2, trigger: 'blur'}
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'name',
      'avatar',
      'device'
    ]),
    device() {
      return this.$store.state.app.device
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload()// In order to re-instantiate the vue-router object to avoid bugs
      })
    },
    chgpwd() {
      this.dialogVisible = true
    },
    hideDialog() {
      this.dialogVisible = false
      this.pwdform = {oldPassword: '', newPassword: '', newPasswordCfm: ''}
      this.$refs['form'].resetFields()
    },
    doChangePwd() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          SysApi.changePassword(this.pwdform.oldPassword, this.pwdform.newPassword).then(data => {
            if (data.success) {
              this.$message({message: '修改成功', type: 'success'})
              this.hideDialog()
            }
          }).catch(() => {
            // 取消
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .navbar {
    height: 50px;
    line-height: 50px;
    border-radius: 0px !important;
    position: relative;
    border-bottom: 1px solid #d8dce5;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
    .hamburger-container {
      line-height: 58px;
      height: 50px;
      float: left;
      padding: 0 10px;
    }
    .breadcrumb-container {
      float: left;
    }
    .tags-container {
      position: absolute;
      display: inline-block;
      box-sizing: border-box;
      bottom: 0;
      left: 40px;
      right: 190px;
    }
    .tags-container-mobile {
      right: 60px;
    }
    .right-menu {
      float: right;
      height: 100%;
      &:focus {
        outline: none;
      }
      .right-menu-item {
        display: inline-block;
        margin: 0 8px;
      }
      .screenfull {
        height: 20px;
        margin-top: 14px;
        vertical-align: top;
      }
      .international {
        vertical-align: top;
      }
      .theme-switch {
        vertical-align: 15px;
      }
      .avatar-container {
        height: 50px;
        margin-right: 10px;
        .avatar-wrapper {
          margin-top: 10px;
          height: 40px;
          position: relative;
          .user-image {
            cursor: pointer;
            width: 20px;
            height: 40px;
            border-radius: 10px;
            position: relative;
            margin-top: -5px;
          }
          .user-name {
            position: relative;
            top: -10px;
          }
          .el-icon-caret-bottom {
            cursor: pointer;
            position: absolute;
            right: -20px;
            top: 12px;
            font-size: 12px;
          }
        }
      }
    }
  }
</style>
