<template>
  <div class="hello">
    <input type="text" v-model="user.userName" placeholder="用户名">
    <input type="password" v-model="user.password" placeholder="密码">
    <input type="text" v-model="user.email" placeholder="邮箱">
    <input type="text" v-model="user.phone" placeholder="电话">
    <div>
      <button @click="onSubmit">
        注册
      </button>
      <button @click="onLogin">
        登录
      </button>
      <button @click="onCheck">
        是否存在
      </button>
    </div>
  </div>
</template>

<script>
import URL from "@/serviceAPI.config";
export default {
  name: "HelloWorld",
  data() {
    return {
      user: {
        userName: "",
        password: "",
        email: "",
        phone: ""
      }
    };
  },
  methods: {
    onSubmit() {
      var qs = require("qs");
      this.$http
        .post(URL.register, qs.stringify({ user: this.user }))
        .then(res => {
          if (res.data.code == 200) {
            alert("添加成功!");
          } else {
            alert(res.data.data);
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    onLogin() {
      var qs = require("qs");
      this.$http
        .post(URL.login, qs.stringify({ user: this.user }))
        .then(res => {
          if (res.data.code == 200) {
            console.log(res);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("token_exp", new Date().getTime());
            localStorage.setItem("username", this.user.userName);
            alert("登录成功!");
          } else {
            alert(res.data.data);
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    onCheck() {
      var qs = require("qs");
      let token = localStorage.getItem("token");
      this.$http
        .post(URL.checkUser, qs.stringify({ userName:localStorage.getItem('username'),token: token }))
        .then(res => {
          console.log(res);
          if (res.data.code == 200 ){
              alert("用户存在!");  
          } else if(res.data.code ==201) {
            alert('登录超时');
          }else{
            alert('登录错误')
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  },
  created() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
