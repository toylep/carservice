<template>
    <h1>Мой профиль</h1>
        <div class="card" v-if="change_button==true">
            <div class="card-body">
                <h3 class="card-title">Ваш юзернейм: {{userStorage.user.username}}</h3>
                <hr>
                <h3 class="card-title">Ваш email: {{userStorage.user.email}}</h3>
                <hr>
                <h3 class="card-title">Как к вам обращаться: {{userStorage.user.first_name}}</h3>  
                <hr>
                <h3 class="card-title">Баланс: {{userStorage.user.balance}}$</h3>     

                <AddBalanceModal></AddBalanceModal>
            </div>
        </div>
        <div class="card" v-else>
            <div class="card-body">
                <form>
                    <h3 class="card-title">Ваш юзернейм</h3>
                    <input type="text" class="form-control" placeholder="username" v-model="redUserHolder.username">
                    <h3 class="card-title">Ваш email</h3>
                    <input placeholder="email" type="email" class="form-control" id="exampleInputEmail1" v-model="redUserHolder.email">
                    <h3 class="card-title">Как к вам обращаться</h3>  
                    <input type="text" class="form-control" placeholder="Имя" v-model="redUserHolder.first_name">
                    <!-- <h3 class="card-title">Баланс</h3>     
                    <input type="number" class="form-control" placeholder="Кол-во денег"> -->
                    <br>
                    <button type="button" class="btn btn-primary" @click="changeUser">Подтвердить</button>
                    
                </form>
                
            </div>
        </div>
        <button type="button" class="btn btn-warning" @click="on_change_click"><i class="bi bi-pencil">Изменить информацию о себе</i></button>
</template>
<script setup>
import { ref } from 'vue';
import { useUserStorage } from '@/storages/UserStorage';
import { onBeforeMount } from 'vue';
import AddBalanceModal from './AddBalanceModal.vue';
import axios from 'axios';
const userStorage = ref(useUserStorage())
let change_button =ref(true)
const changeUser = async () =>{
    console.log(userStorage.value.user.id)
    await axios.patch('/api/users/'+ userStorage.value.user.id ,
    redUserHolder
    )
    .then(res => userStorage.value.setAuth({
        username:redUserHolder.username,
        password:userStorage.value.user.password
    }))
    .then(res => userStorage.value.setUserFromServer())
}
const on_change_click = () =>{
    change_button.value*=-1
}
const userHolder = {
	username: '',
	first_name: '',
	email: '',
	is_staff: false,
	balance: 0,
}
let redUserHolder = {
    username: '',
	first_name: '',
	email: '',
}
onBeforeMount(() => {
	if (!(JSON.parse(localStorage.getItem('user')) === null)){
		userStorage.value.setUser(JSON.parse(localStorage.getItem('user')))
		userStorage.value.setAuth(JSON.parse(localStorage.getItem('auth')))
	}
})
</script>