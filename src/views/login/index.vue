<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li v-for="(item,index) in menu" :key="index" :class="{'activeColor': isActive == item.current}" @click="toggletab(item)">{{ item.txt }}</li>
      </ul>
      <!-- 表单  start -->
      <el-form :model="ruleForm"  status-icon :rules="rules" ref="loginForm" size="medium" class="login-form">
        <el-form-item  prop="username" class="item-form">
          <label for="username">邮箱</label>
          <el-input id="username" type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="password" class="item-form">
          <label for="password">密码</label>
          <el-input id="password" type="text" v-model="ruleForm.password" autocomplete="off" minlength="6" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item prop="passwords" class="item-form" v-show="model == 'register'">
          <label for="passwords">重复密码</label>
          <el-input id="passwords" type="password" v-model="ruleForm.passwords" autocomplete="off" minlength="6" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item prop="code" class="item-form">
          <label>验证码</label>
          <el-row :gutter="11">
            <el-col :span="16">
              <el-input v-model="ruleForm.code"></el-input>
            </el-col>
            <el-col :span="8">
              <el-button class="login-btn" type="success" :disabled="BtnStatus.status" @click="getsms()">{{BtnStatus.text}}</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button :disabled="loginBtnStatus" type="danger" @click="submitForm('loginForm')" class="login-btn block">{{ model === 'login' ? '登录' : '注册'}}</el-button>
        </el-form-item>
      </el-form>
      <!-- 表单  end -->

    </div>
  </div>
</template>

<script>
import sha1 from 'js-sha1';
import {GetSms, Register, Login} from "@/api/login.js";
import { reactive, ref, onMounted } from '@vue/composition-api';
import { stripscript, validateEmail, validatePass, validateCode} from '@/utils/validate';
export default {
  setup(props,context){
  // setup(props,{ref, root}){

    // console.log(context);
    /**
     * 
    context: {
      attrs: Object => this.$attrs 
      emit: ƒ () => this.$emit
      listeners: Object => this.$listeners
      parent: VueComponent => this.$parent
      refs: Object => this.$refs
      root: Vue => this
    }
     */

     /**
     * 声明规则
     */
     // 验证用户名
      let validateUsername = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else if(validateEmail(value)){
          callback(new Error('用户名格式有误'));
        } else {
          callback();
        }
      };
      // 验证密码
      let validatePassword = (rule, value, callback) => {
        // console.log(stripscript(value));
        ruleForm.password = stripscript(value);
        value = ruleForm.password;
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if(validatePass(value)){
          callback(new Error('密码为6至20为的数字加字母'));
        }else {
          callback();
        }
    };
    // 验证重复密码
    let validatePasswords = (rule, value, callback)=> {
      // 如果模块值为login
      if(model.value === 'login') {
        callback()
      }
      ruleForm.passwords = stripscript(value);
      value = ruleForm.passwords;
      // console.log(value);
      
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if(value !== ruleForm.password){
        callback(new Error('与第一次输入的密码不一致'));
      }else {
        callback();
      }
    };
      // 验证验证码
    let validateCoding = (rule, value, callback) => {
        // console.log(stripscript(value));
      // ruleForm.code = stripscript(value);
      // value = ruleForm.code;
      if (value === '') {
        return callback(new Error('验证码不能为空'));
      }else if(validateCode(value)) {
        return callback(new Error('验证码格式有误'))
      }
    };

    /**
     * 声明数据
     */
    // 切换登录与注册的数据
    const menu = reactive([
      { txt: '登录', current: true, type:'login' },
      { txt: '注册', current: false, type: 'register' }
    ])
    // isActive: true,
    const isActive = ref(true)
    const model = ref('login')
    // 登录按钮禁用状态
    const loginBtnStatus = ref(true)
    // 表单里的数据
    const ruleForm = reactive({
      username: '',
      password: '',
      passwords: '',
      code: ''
    })
    const rules = reactive({
      username: [
        { validator: validateUsername, trigger: 'blur' }
      ],
      password: [
        { validator: validatePassword, trigger: 'blur' }
      ],
      passwords: [
        { validator: validatePasswords, trigger: 'blur' }
      ],
      // code: [
      //   { validator: validateCoding, trigger: 'blur' }
      // ]
    })
    // 获取验证码的状态
    const BtnStatus = reactive({
      text: '获取验证码',
      status: false
    })
    // 倒计时
    const timer = ref(null)

    /**
     * 声明函数
     */
    const toggletab = (data => {
      menu.forEach((ele, index)=>{
        ele.current = false
      })
      // 高光
      data.current = true;
      // 修改模块值
      model.value = data.type;
      resetFields()
      clearInterval(timer.value)
    }) 
    /**
     * 重置表单
     */
    const resetFields = (()=> {
      //  this.$refs[formName].resetFields();
      context.refs.loginForm.resetFields();
    })
    /**
     * 更新按钮
     */
    const updateBtnStatus = ((params) =>{
      BtnStatus.status = params.status;
      BtnStatus.text = params.text;
    })
    /**
     * 获取验证码
     */
    const getsms = (() => {
      if(ruleForm.username == '') {
         context.root.$message.error('邮箱不能为空');
        //  root.$message.error('邮箱不能为空');
         return false;
      }
      if(validateEmail(ruleForm.username)) {
        context.root.$message.error('邮箱格式有误，请重新输入！！！');
        return false;
      }
      let data = {
        username: ruleForm.username,
        module: model.value
      }
      updateBtnStatus({
        status: true,
        text: '发送中'
      })
      setTimeout(()=>{
        GetSms(data).then(response => {
          console.log(response);
          context.root.$message({
            type: 'success',
            message: response.data.message
          })
          // 修改获取验证码按钮状态 
          loginBtnStatus.value = false;
          countDown(60)
        }).catch(error => {
          console.log(error);
        })
      },1000)
    }) 
    // 提交
    const submitForm = (formName) =>{
      context.refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!');
          if(ruleForm.code === '') {
            context.root.$message({
              type: 'warning',
              message: '验证码不能为空'
            })
          }else if(validateCode(ruleForm.code)){
            context.root.$message({
              type: 'warning',
              message: '验证码格式不正确'
            })
          }else{
            model.value === 'login' ? login() : register()
            // console.log(model.value);
          }
        } else {
          console.log('error submit!!');
          return false;
        }
        
      });
    }
    /**  注册 */
    const register = (()=> {
      let regData = {
        username: ruleForm.username,
        // password: sha1(ruleForm.password),
        // password: sha1(ruleForm.password),
        password: ruleForm.password,
        code: ruleForm.code,
        module: 'register'
      }
      Register(regData).then(res => {
        console.log(JSON.stringify(res));
        if(res.data.resCode === 0) {
          context.root.$message({
            type: 'success',
            message: res.data.message
          })
          toggletab(menu[0]);
          clearCountDown();
        }
      })
    })
    /** 登录 */
    const login = (()=> {
      let loginData = {
        username: ruleForm.username,
        // 密码加密
        // password: sha1(ruleForm.password),
        // password: sha1(ruleForm.password),
        password: ruleForm.password,
        code: ruleForm.code,
      }
      Login(loginData).then(res => {
        console.log(JSON.stringify(res));
        context.root.$router.push({
          name: "Console"
        })
      }).catch(error => {

      })
    })
    /**
     * 倒计时
     */
    const countDown = ((number)=> {
      // 判断定时器是否存在，存在的话清除
      // 预防多次点击造成混乱
      if(timer.value) {clearInterval(timer.value);}
      let time = number
      timer.value = setInterval(()=>{
        time--;
        if(time === 0) {
          clearInterval(timer.value);
          updateBtnStatus({
            status: false,
            text: '再次获取'
          })
        }else {
          updateBtnStatus({
            status: true,
            text: `倒计时${time}秒`
          })
        }
      },1000)
    })
    /**
      清除倒计时
     */
     const clearCountDown = (() => {
      //  还原验证码默认状态
       BtnStatus.status = false;
       BtnStatus.text = '获取验证码';
       clearInterval(timer.value);
     })
    
    onMounted(()=> {
     
    })

      return {
        menu,
        isActive,
        model,
        loginBtnStatus,
        BtnStatus,
        ruleForm,
        rules,
        toggletab,
        submitForm,
        getsms
        
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
      height: 36px;
      display: block;  // 块元素
    }
    .block {
      margin-top: 10px;
    }
  }
</style>