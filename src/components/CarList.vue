<template>
    <div class="container">
        <h1>Cписок машин</h1>
        <div class="wrapper d-flex flex-wrap" >
            <CarAddModal v-if="userStorage.user.is_staff"/>
            <div 
            v-if="userStorage.user.is_staff==true"
            v-for="(car,index) in carStorage.cars"
            >
                <div class="card list flex" 
                    :style="{ width: '18rem', borderColor: 'black', margin: '10px' }" 
                    >
                    <div v-if="change_button!=true">
                        <form>
                            <div class="card-body">
                                    <h5 class="card-title">Картинка</h5>
                                    <input type="file" v-on:change="changePic">
                                    <h5 class="card-title">Модель</h5>
                                    <input type="text" placeholder="Новая марка" v-model="carHolder.mark">
                                    <h5 class="card-title">Марка</h5>
                                    <input type="text" placeholder="Новая модель" v-model="carHolder.model">
                                    <h5 class="card-title" >Описание</h5>
                                    <input type="text" placeholder="Новое описание" v-model="carHolder.description">
                                    <h5 class="card-title" >Категории</h5>
                                    <select class="form-select" aria-label="Default select example">
                                        <option :value="cat.id" v-for="cat in categoryStorage.categories">
                                            {{ cat.name }}
                                        </option>
                                    </select>
                                    <a class="btn btn-primary" @click="carChange(car.id)">Подтвердить</a>
                                    <button type="button" class="btn btn-warning" @click="reg_button_click(index)">Назад</button>
                            </div>
                        </form>
                        
                    </div>
                    <div v-else>
                        <img src="https://upload.wikimedia.org/wikipedia/ru/8/8e/Black_Sabbath_debut.jpg" class="card-img-top" alt="тут должна быть картинка">
                        <div class="card-body">
                            <h5 class="card-title">Car id: {{ car.id }}</h5>
                            <h5 class="card-title">{{ car.mark }} {{ car.model }}</h5>
                            <p class="card-text">{{ car.description }}</p>
                            <h5 class="card-text">{{ car.category.price }}$/мес.</h5>
                            <RentCarModal :car="car"></RentCarModal>
                            <button class="btn btn-warning" @click="reg_button_click(index)"><i class="bi bi-pencil"></i></button>
                            <button class="btn btn-danger" @click="deleteCar(car.id)"><i class="bi bi-trash"></i></button>
                        </div>
                    </div>
                    
                </div>
            </div>
            <div  
            v-else
            v-for="car in carStorage.cars">
                <div class="card list flex" 
                    :style="{ width: '18rem', borderColor: 'black', margin: '10px' }" 
                    >
                    <img src="" class="card-img-top" alt="тут должна быть картинка">
                    <div class="card-body">
                        <h5 class="card-title">{{ car.mark }} {{ car.model }}</h5>
                        <p class="card-text">{{ car.description }}</p>
                        <h5 class="card-text">{{ car.category.price }}$/мес.</h5>
                        <RentCarModal :car="car"/>
                    </div>
                </div>
            </div>
        </div>
            <nav aria-label="Page navigation example" >
                <ul class="pagination justify-content-center fixed-bottom">
                            <li class="page-item">
                            <a class="page-link" href="#" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                            </a>
                            </li>
                            <li class="page-item" v-for="(p, index) in [1,2,3]"><a class="page-link" href="#" @click="changeParams(p)">{{p}}</a></li>
                            <li class="page-item">
                            <a class="page-link" href="#" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                            </a>
                    </li>
                </ul>
            </nav>
        </div>
</template>
<script setup>
import { ref } from 'vue';
import {useCarStorage} from '@/storages/CarStorages'
import {useUserStorage} from '@/storages/UserStorage'
import { onBeforeMount } from 'vue';
import axios from 'axios';
import {useCategoryStorage} from '@/storages/CategoryStorage'
import CarAddModal from './CarAddModal.vue';
import RentCarModal from './RentCarModal.vue'

let change_button = ref(true)
const categoryStorage = ref(useCategoryStorage()) 
const carStorage = ref(useCarStorage())
const userStorage = ref(useUserStorage())

const changeParams =(page) => {
    carStorage.value.params.page = page
    carStorage.value.setCarsFromServer(
        carStorage.value.params.page,
    )
}

const carHolder = {
    mark: '',
	model: '',
	description: '',
	category:'',
    picture: '',
}

const carChange = async (car_id) =>{
    try{
        const repsonce = await axios.put('/api/cars/'+car_id,carHolder,{
        auth: userStorage.value.auth,
        headers: {
                "Content-Type": "multipart/form-data"
            },

        })
        carStorage.value.setCarsFromServer()
    }catch(err){
        console.log(err)
    }
}

const deleteCar = async (id) => {

    try {
    await axios.delete('/api/cars/' + id, {
        auth: {
            username: userStorage.value.auth.username,
            password: userStorage.value.auth.password
        },
    })
    }catch(err){
        alert('У вас нет прав админа')
        console.log(err)
}

carsStorage.value.setCarsFromServer()
}

const changePic = (event)=>{
    carHolder.picture = event.target.files[0]
    console.log(carHolder.picture)
}

const reg_button_click = (index)=>{
    change_button.value = !change_button.value
}

onBeforeMount(()=>{
	carStorage.value.setCarsFromServer(
        carStorage.value.params.page,
    )
    categoryStorage.value.getCategoriesFromServer()
    if (!(JSON.parse(localStorage.getItem('user')) === null)){
		userStorage.value.setUser(JSON.parse(localStorage.getItem('user')))
		userStorage.value.setAuth(JSON.parse(localStorage.getItem('auth')))
	}
})
</script>
<style>
.wrapper {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
	overflow-x: hidden;
	flex-wrap: wrap;
}
.btn{
    margin: 2px;
}
.centered{
    margin-left: auto;
    margin-right: auto;
    display: block;
}

</style>