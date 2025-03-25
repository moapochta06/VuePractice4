<template>
    <p v-if="!isAuthenticated">Войдите в аккаунт</p>
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
</style>