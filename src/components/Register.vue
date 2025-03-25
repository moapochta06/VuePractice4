<template>
    <form class="register" @submit.prevent="register">
      <h1>Регистрация</h1>
      <input type="text" required v-model="fio" placeholder="Введите ФИО" />
      <input type="text" required v-model="email" placeholder="Введите почту" />
      <input type="password" required v-model="password" placeholder="Введите пароль" />
      <button type="submit">Зарегистрироваться</button>
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
    register() {
        const userData = {
        fio: this.fio,
        email: this.email,
        password: this.password
     }
     this.$store.dispatch("REGISTER_REQUEST", userData)
          .then(() => this.$router.push("/login"))
          .catch((error) => {
            console.error('error:', error.message);
        });
    }
    
  }
}
</script>

<style scoped>
    h1{
      margin: 0 0 30px 0;
    }
    .register {
    display: flex;
    flex-direction: column;
    width: 400px;
    border-radius: 5px;
    padding: 50px;
    margin: 0 auto;
    }

    input,
    button {
    height: 40px;
    margin-bottom: 10px;
    border-radius: 5px;
    background: #dae4e0;
    border: none;
    outline: none;
    padding: 10px;
    }

    button {
      margin-top: 20px;
      color: #fff;
      background: #31bb7d;
      transition: 0.2s ease-in-out;
    }

    button:hover{
      background: #34966a;
    }
</style>
