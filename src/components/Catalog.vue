<template>
  <div class="products">
    <h1>Список товаров</h1>
    <ul>
      <li class="product-card" v-for="product in products" :key="product.id">
        <img :src="product.image" :alt="product.name">
        <div class="product-price">
          {{ product.price }} руб.
        </div>
        <div :class="{'container' : isAuthenticated}">
          <div class="product-description">
            {{ product.description }}
          </div>
          <button v-if="isAuthenticated" @click="addToCart(product)">В корзину</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { fetchProducts } from '@/utils/api'; 
import { mapGetters , mapActions} from 'vuex';

export default {
  data() {
    return {
      products: [],
    };
  },
  created() {
    this.loadProducts(); 
  },
  methods: {
    async loadProducts() {
    try {
      const fetchedProducts = await fetchProducts();
      this.products = fetchedProducts.map(product => ({
        ...product,
        image: `http://lifestealer86.ru/${product.image}`,
      }));
    } catch (error) {
      console.error('Ошибка при загрузке товаров:', error);
    }
  },
  ...mapActions(['addToCartWithAPI']),
    addToCart(product) {
        const productData = {
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
          image: product.image
        };
        this.$store.dispatch("addToCartWithAPI", productData)
        .then((successMessage) => {
            alert(successMessage); 
            this.$router.push("/");
        })
  },

  },
  computed: {
    ...mapGetters(['isAuthenticated']),
  },
};
</script>

<style scoped>
  h1{
    margin-bottom: 60px;
  }
  .products{
    max-width: 1200px;
    margin: 30px auto;
  }
  ul{
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 70px;
  }
  .product-card{
    display: flex;
    flex-direction: column;
    align-items: start;
    width: 250px;
    border-radius: 6px ;
    background: #fff;
    box-shadow: -2px 3px 11px rgba(87, 87, 87, 0.192);
  }
  img {
    width: 100%;
    height: 300px;
    object-fit: contain;


  }
  .product-price{
    color: #02974d;
    font-weight: bold;
    font-size: 22px;
    margin: 0 0 15px 0;
    padding: 0 20px 0;
  }
  .container{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 122px;
  }
  .product-description{
    text-align: left;
    padding: 0 20px 10px ;
  }
  button{
    width: 100%;
    height: 30px;
    border-radius: 6px;
    background: #ed4172;
    color: #fff;
    font-weight: bold;
  }
</style>
