import { createStore } from 'vuex';
import { login, register, addCart } from '../utils/api'; // Импортируем методы login и register

export default createStore({
  state: {
    token: localStorage.getItem('myAppToken') || '', // Токен из localStorage
    cartProducts: JSON.parse(localStorage.getItem('cartProducts')) || [],
  },

  getters: {
    isAuthenticated: (state) => !!state.token, // Проверка авторизации
  },

  mutations: {
    AUTH_SUCCESS: (state, token) => {
      state.token = token; // Устанавливаем токен
    },
    AUTH_ERROR: (state) => {
      state.token = ''; // Очищаем токен при ошибке
    },
    ADD_TO_CART(state, product) {
      const existingProduct = state.cartProducts.find((p) => p.id === product.id);
      if (existingProduct) {
        existingProduct.count += 1; // Увеличиваем количество
      } else {
        state.cartProducts.push({ ...product, count: 1 }); // Добавляем новый товар
      }
    },
    REMOVE_FROM_CART(state, productId) {
      state.cartProducts = state.cartProducts.filter((p) => p.id !== productId); // Удаляем товар из корзины
    },
    DECREASE_COUNT(state, productId) {
      const product = state.cartProducts.find((p) => p.id === productId);
      if (product && product.count > 1) {
        product.count -= 1; // Уменьшаем количество
      }
    },
    SAVE_CART_TO_LOCAL_STORAGE(state) {
      localStorage.setItem('cartProducts', JSON.stringify(state.cartProducts));
    },
  },

  actions: {
    AUTH_REQUEST: ({ commit }, credentials) => {
      return new Promise((resolve, reject) => {
        login(credentials)
          .then((token) => {
            commit('AUTH_SUCCESS', token);
            localStorage.setItem('myAppToken', token);
            resolve(token);
          })
          .catch((error) => {
            commit('AUTH_ERROR');
            localStorage.removeItem('myAppToken');
            reject(error);
          });
      });
    },
    REGISTER_REQUEST: ({ commit }, userData) => {
      return new Promise((resolve, reject) => {
        register(userData)
          .then((token) => {
            commit('AUTH_SUCCESS', token);
            localStorage.setItem('myAppToken', token);
            resolve(token);
          })
          .catch((error) => {
            commit('AUTH_ERROR');
            localStorage.removeItem('myAppToken');
            reject(error);
          });
      });
    },
    LOGOUT: ({ commit }) => {
      return new Promise((resolve) => {
        commit('AUTH_ERROR');
        localStorage.removeItem('myAppToken');
        resolve();
      });
    },
    addToCartWithAPI: async ({ commit, state }, productData) => {
      const message = await addCart(productData.id, state.token);
      commit('ADD_TO_CART', productData);
      commit('SAVE_CART_TO_LOCAL_STORAGE');
      return message;
    },
          
    saveStateCart(context) {
      const cartProducts = context.state.cartProducts; 
      localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
    },
    
    removeFromCart({ commit, dispatch }, productId) {
      commit('REMOVE_FROM_CART', productId); // Вызываем мутацию для удаления товара
      dispatch('saveStateCart');
    },
    decreaseCount({ commit, dispatch }, productId) {
      commit('DECREASE_COUNT', productId); // Вызываем мутацию для уменьшения количества
      dispatch('saveStateCart');
    },
  },
});