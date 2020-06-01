<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li v-for="(item,index) in menu" :key="index" :class="{'activeColor': isActive == item.current}" @click="toggletab(item)">{{ item.txt }}</li>
      </ul>
      <!-- 表单  start -->
      <el-form :model="ruleForm"  status-icon :rules="rules" ref="ruleForm" size="medium" class="login-form">
        <el-form-item  prop="username" class="item-form">
          <label>邮箱</label>
          <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="password" class="item-form">
          <label>密码</label>
          <el-input type="text" v-model="ruleForm.password" autocomplete="off" minlength="6" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item prop="passwords" class="item-form" v-show="model == 'register'">
          <label>重复密码</label>
          <el-input type="text" v-model="ruleForm.passwords" autocomplete="off" minlength="6" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item prop="code" class="item-form">
          <label>验证码</label>
          <el-row :gutter="11">
            <el-col :span="16">
              <el-input v-model="ruleForm.code"></el-input>
            </el-col>
            <el-col :span="8">
              <el-button class="login-btn" type="success">获取验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="submitForm('ruleForm')" class="login-btn block">登录</el-button>
        </el-form-item>
      </el-form>
      <!-- 表单  end -->

    </div>
  </div>
</template>

<script>
import { stripscript, validateEmail, validatePass, validateCode} from '@/utils/validate'
export default {
  data() {
      // 验证用户名
      var validateUsername = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else if(validateEmail(value)){
          callback(new Error('用户名格式有误'));
        } else {
          callback();
        }
      };
      // 验证密码
      var validatePassword = (rule, value, callback) => {
        // console.log(stripscript(value));
        this.ruleForm.password = stripscript(value);
        value = this.ruleForm.password;
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if(validatePass(value)){
          callback(new Error('密码为6至20为的数字加字母'));
        }else {
          callback();
        }
    };
    // 验证重复密码
    var validatePasswords = (rule, value, callback)=> {
      // 如果模块值为login
      if(this.model === 'login') {
        callback()
      }
       this.ruleForm.passwords = stripscript(value);
        value = this.ruleForm.passwords;
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if(value != this.ruleForm.password){
          callback(new Error('与第一次输入的密码不一致'));
        }else {
          callback();
        }
    };
      // 验证验证码
    var validateCoding = (rule, value, callback) => {
        // console.log(stripscript(value));
      this.ruleForm.code = stripscript(value);
      value = this.ruleForm.code;
      if (value === '') {
        callback(new Error('验证码不能为空'));
      }else if(validateCode(value)) {
        callback(new Error('验证码格式有误'))
      }
    };
    return {
      menu: [
        { txt: '登录', current: true, type:'login' },
        { txt: '注册', current: false, type: 'register' }
      ],
      isActive: true,
      // 注册显示
      model: 'login',
      ruleForm: {
        username: '',
        password: '',
        passwords: '',
        code: ''
      },
      rules: {
        username: [
          { validator: validateUsername, trigger: 'blur' }
        ],
        password: [
          { validator: validatePassword, trigger: 'blur' }
        ],
        passwords: [
          { validator: validatePasswords, trigger: 'blur' }
        ],
        code: [
          { validator: validateCoding, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    toggletab(data) {
      this.menu.forEach((ele,index)=>{
        ele.current = false
      })
      data.current = true;
      // 修改模块值
      this.model = data.type;
    },
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
  }
}
</script>

<style lang="scss" scoped>
  #login {
    height: 100vh;
    background-color: rgb(75, 107, 107);
  }
  .login-wrap {
    width: 330px;
    margin: 0 auto;
    .menu-tab {
      text-align: center;
      li {
        display: inline-block;
        padding: 10px 20px;
        color: #fff;
        cursor: pointer;
      }
      .activeColor {
        background-color: rgb(61, 92, 92);
      }
    }
  }
  .login-form {
    margin-top: 29px;
    label {
      display: block;
      color: #fff;
      font-size: 14px;
      margin-bottom: 3px;
    }
    .item-form {
      margin-bottom: 15px;
    }
    .login-btn {
      width: 100%;
      display: block;  // 块元素
    }
    .block {
      margin-top: 10px;
    }
  }
</style>