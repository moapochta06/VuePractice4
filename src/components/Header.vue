<template>
    <nav>
        <div>
            <router-link to="/">Каталог</router-link>
            <router-link to="/cart">Корзина</router-link>
            <router-link to="/history">Заказы</router-link>
        </div>
        <div>
            <router-link to="/login" v-if="!isAuthenticated">Вход</router-link>
            <router-link to="/signup" v-if="!isAuthenticated">Регистрация</router-link>
            <router-link to="/logout" v-if="isAuthenticated">Выход</router-link>
      </div>
    </nav>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['isAuthenticated']),
  },
};
</script>

<style>
    nav {
    width: 1300px;
    margin: 0 auto;
    display: flex;
    padding: 30px;
    justify-content: space-between;
    }

    nav a {
    font-weight: bold;
    color: #2c3e50;
    padding-left: 20px;
    }

    nav a.router-link-exact-active {
    color: #42b983;
    }
</style>