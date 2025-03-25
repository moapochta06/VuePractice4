import { createStore } from 'vuex';
import { login,register } from '../utils/api'; // Импортируем метод login

export default createStore({
  state: {
    token: localStorage.getItem('myAppToken') || '', // Токен из localStorage
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
  },
  actions: {
    AUTH_REQUEST: ({ commit }, credentials) => {
      return new Promise((resolve, reject) => {
        login(credentials) // Вызываем метод login из api.js
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
  }
  }});




