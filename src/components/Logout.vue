<template>
    <div>
        <p>Вы уверенны, что хотите выйти?</p>
        <button @click="logout">
            Да
        </button>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['isAuthenticated']),
  },
  methods: {
    logout() {
      this.$store.dispatch('LOGOUT')
        .then(() => {
          this.$router.push('/login'); 
        });
    },
  },
};
</script>
<style scoped>
div{
    height: 90vh;
}
button{
    margin-top: 20px;
    width: 150px;
    padding: 15px 0 15px 0;
    color: #fff;
    background: #bb314a;
    border-radius: 6px;
    transition: 0.2s ease-in-out;
}
</style>