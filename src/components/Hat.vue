<template>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#"><h3>Сервис по прокату авто</h3></a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <div class="btn-group" v-if="userStorage.user.is_staff">
          <button type="button" class="btn btn-light dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
            <span class="visually-hidden">Toggle Dropdown</span>
          </button>
          <ul class="dropdown-menu">
            <li>
              <RouterLink to="/users">
                <a class="dropdown-item" href="#" >Управление пользователями</a>
              </RouterLink>
            </li>  
            <li><hr class="dropdown-divider"></li>
            <li>
              <RouterLink to="/category">
                <a class="dropdown-item" href="#" >Управление категориями</a>
              </RouterLink>
            </li>  
            <li><hr class="dropdown-divider"></li>
          </ul>
          <button class="btn btn-light">Админская панель</button>
        </div>
      </ul>
      <div class="d-flex">
        <div class="btn-group">
          <button type="button" class="btn btn-light dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
            <span class="visually-hidden">Toggle Dropdown</span>
          </button>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item disabled" href="#" >Баланс: {{ userStorage.user.balance }}$</a></li>  
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#" @click="logout">Выйти из аккаунта</a></li>
          </ul>
          <button class="btn btn-light"><LoginWindow/></button>
        </div>
      </div>
    </div>
  </div>
</nav>
</template>
<script setup>
import { RouterLink } from 'vue-router';
import LoginWindow from './LoginWindow.vue';
import { useUserStorage } from '@/storages/UserStorage';
import { ref,onBeforeMount } from 'vue';
const userStorage = ref(useUserStorage())
const user = {
        username: 'Не авторизован',
        name: 'Не авторизован',
        email: 'Не авторизован',
        is_staff: false,
        balance: 0,
    }
const auth = {
    username:'Не авторизован',
    password:'Не авторизован',
}
const logout = () =>{
  localStorage.setItem('user',JSON.stringify(user))
  localStorage.setItem('auth',JSON.stringify(auth))
  userStorage.value.setUser(user)
  userStorage.value.setAuth(auth)
 }
onBeforeMount(()=>{
  if (JSON.parse(localStorage.getItem('user'))==user){
    userStorage.value.setUserFromServer()
  }
})
</script>
