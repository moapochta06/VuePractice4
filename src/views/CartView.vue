<template>
    <div class="cart">
    <p v-if="!isAuthenticated"> 
        Войдите в аккаунт
    </p>
    <ul>
        <li v-for="product in cartProducts" :key="product.id">
            <div>
                <img :src="product.image" :alt="product.name">
                <div class="product-price">
                {{ product.price }} руб.
                </div>
            </div>
            <div class="product-description">
            {{ product.description }}
            </div>
            <div class="buttons">
                <div class="count">
                <div @click="decreaseCount(product)">-</div>
                <div>{{ product.count }}</div>
                <div @click="increaseCount(product)">+</div>
                </div>
                <div @click="removeFromCart(product.id)">Удалить</div>
            </div>
        </li>
    </ul>
    <button v-if="cartProducts.length !== 0">Оформить заказ</button>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
export default {
    methods:{
        increaseCount(product) {
            this.$store.commit('ADD_TO_CART', product); 
        },
        decreaseCount(product) {
            if (product.count > 1) {
            this.$store.commit('DECREASE_COUNT', product.id);
            }
        },
        removeFromCart(productId) {
            this.$store.dispatch('removeFromCart', productId); 
        },
    },
    computed: {
        ...mapGetters(['isAuthenticated']),
        ...mapState(['cartProducts']),
    },
};
</script>
<style scoped>
.cart{
    width: 700px;
    height: 90vh;
    margin: 50px auto 0;
}
button{
    padding: 20px 0;
    font-weight: bold;
    border-radius: 6px;
    background: #ed4172;
    color: #ffffff;
    width: 100%;
    cursor: pointer;
}
ul{
    padding: 0;
}
li{
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #0000000f;
    padding: 20px;
}
img{
    width: 60px;
}
.product-description{
    width: 40%;
    text-align: left;
}
.buttons{
    display: flex;
    width: 70px;
    flex-direction: column;
    justify-content: space-between;
}
.count{
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: space-between;
}
.count>div:not(:nth-child(2)){
    background: #e7e7e7;
    padding: 8px;
    border-radius: 3px;
    cursor: pointer;
}
</style>