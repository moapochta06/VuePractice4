<template>
  <form class="register" @submit.prevent="register">
    <h1>Регистрация</h1>
    <input type="text" v-model="fio" placeholder="Введите ФИО" @blur="validateFio" />
    <div v-if="errors.fio" class="error">{{ errors.fio }}</div>
    <input type="text" v-model="email" placeholder="Введите почту" @blur="validateEmail" />
    <div v-if="errors.email" class="error">{{ errors.email }}</div>
    <input type="password" v-model="password" placeholder="Введите пароль" @blur="validatePassword" />
    <div v-if="errors.password" class="error">{{ errors.password }}</div>
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
      errors: { 
        fio: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    validateFio() {
      if (!this.fio) {
        this.errors.fio = "ФИО обязательно для заполнения";
      } else if (this.fio.length < 3) {
        this.errors.fio = "ФИО должно содержать минимум 3 символа";
      } else {
        this.errors.fio = "";
      }
    },
    validateEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!this.email) {
      this.errors.email = "Email обязателен для заполнения";
    } else if (!emailRegex.test(this.email)) {
      this.errors.email = "Введите корректный email";
    } else {
      this.errors.email = "";
    }
  },
  validatePassword() {
      if (!this.password) {
        this.errors.password = "Пароль обязателен для заполнения";
      } else if (this.password.length < 6) {
        this.errors.password = "Пароль должен содержать минимум 6 символов";
      } else {
        this.errors.password = "";
      }
    },
    validateForm() {
      this.validateFio();
      this.validateEmail();
      this.validatePassword();
      return this.isFormValid;
    },
    register() {
      if (!this.validateForm()) {
        return;
      }
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
