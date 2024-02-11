<template setup>
    <!-- Button trigger modal -->
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
    Арендовать
    </button>

    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Аренда машины</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <h5>На сколько месяцев хотите арендовать?</h5>
            <input type="number" v-model="monthCount">
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="rentCar(car)">Подтвердить</button>
        </div>
        </div>
    </div>
    </div>

</template>
<script setup>
import { useCarStorage } from '@/storages/CarStorages';
import { useRentStorage } from '@/storages/RentStorage';
import { useUserStorage } from '@/storages/UserStorage';
import { ref,defineProps } from 'vue';
import axios from 'axios';

const userStorage = ref(useUserStorage())
const carStorage = ref(useCarStorage())
const rentStorage = ref(useRentStorage())

let car = defineProps(['car'])
let monthCount = 0

const rentCar = async (car) => {
	car = car.car
	try {
		if (!(userStorage.value.user.username==='Не авторизован')){
			if(monthCount!=0){
				console.log(monthCount * car.category.price)
			var response = await axios.post('/api/cars/rent/', {
				car: car.id,
				client: userStorage.value.user.id,
				cost: monthCount * car.category.price
			}, {
				auth: {
					username: userStorage.value.auth.username,
					password: userStorage.value.auth.password
				},
				})
			}
			else alert('Нельзя арендовывать на 0 месяцев :/')
		} 
		else alert('Прежде чем арендовать авторизуйтесь ;)')
	} 
	catch (err) {
		console.log(err)
		alert('У вас недостаточно средств')
	}
	carStorage.value.setCarsFromServer(userStorage.value.auth)
	rentStorage.value.setRentsFromServer(userStorage.value.auth)
	userStorage.value.setUserFromServer()
}
</script>