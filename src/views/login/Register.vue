<template>
  <div class="register">
    <div class="login-container">
      <h1>
        <span>残疾人用具管理系统</span>
      </h1>
      <el-form ref="form" :model="form" :rules="rules" :show-message="false">
        <el-form-item prop="username">
          <el-input
            v-model="form.username"
            prefix-icon="el-icon-user"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="form.password"
            prefix-icon="el-icon-lock"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Message from '@/util/message';
import { register } from '@/api/user';

export default {
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          {
            required: true,
            message: '用户名不能为空',
            trigger: 'change'
          }
        ],
        password: [
          {
            required: true,
            message: '密码不能为空',
            trigger: 'change'
          }
        ]
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          const username = this.form.username;
          const password = this.form.password;
          const params = {
            username,
            password
          };
          const res = await register(params);
          if (res.code === 200) {
            Message('success', '注册成功');
            this.$router.push({
              path: '/login'
            });
          } else {
            Message('error', res.message);
          }
        }
      });
    }
  }
};
</script>

<style lang="scss">
.register {
  height: 100%;
  width: 100%;
  background-image: url(~@/assets/image/1.jpg);
  display: flex;
  justify-content: center;
  align-items: center;
  // background-color: #409eff;
  .login-container {
    width: 400px;
    // height: 350px;
    background: #ffffff;
    border-radius: 10%;
    border: 2px solid #409eff;
    color: #409eff;
    h1 {
      display: flex;
      justify-content: center;
      img {
        margin: 0 5px;
      }
    }
    .el-form {
      .el-input {
        width: 300px;
      }
      .el-button {
        width: 300px;
      }
    }
  }
}
</style>