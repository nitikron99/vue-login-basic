<template>
  <div>
    <div>
      Username:
      <input type="text" v-model="formData.username" />
      Password:
      <input type="password" v-model="formData.password" />
      <button @click="login">Login</button>
    </div>
    <div>{{ responseText }}</div>
  </div>
</template>

<script>
import axios from "axios";
import router from "@/routers";
export default {
  data() {
    return {
      formData: {
        username: "",
        password: "",
      },
      responseText: "",
    };
  },
  methods: {
    login() {
      if (!this.formData.username || !this.formData.password) {
        this.responseText = "Please enter username and password.";
      } else {
        axios
          .post("http://localhost:4001/authenticatorLogin", {
            username: this.formData.username,
            password: this.formData.password,
          })
          .then((res) => {
            if (res) {
              if (res.data === true) {
                router.push({ name: "MainPage" });
              } else {
                this.responseText = res.data;
              }
            } else {
              console.log("error");
            }
          });
      }
    },
  },
};
</script>
