<template>
    <form class="register" @submit.prevent="login">
      <h1>Регистрация</h1>
      <input type="text" required v-model="email" placeholder="Введите почту" />
      <input type="password" required v-model="password" placeholder="Введите пароль" />
      <button type="submit">Войти</button>
    </form>
  </template>

<script>
export default {
  data() {
    return {
      fio:"",
      email: "",
      password: "",
    };
  },
  methods: {
  }
}
</script>