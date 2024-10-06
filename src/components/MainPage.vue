<template>
  Main Page
  <button @click="login">Logout</button>
</template>

<script>
import router from "@/routers";
export default {
  methods: {
    login() {
      router.push({ name: "LoginPage" });
    },
  },
};
</script>
