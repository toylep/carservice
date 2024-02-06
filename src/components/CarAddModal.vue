<!-- Button trigger modal -->
<script setup>
import { useCategoryStorage } from '@/storages/CategoryStorage';
import { useUserStorage } from '@/storages/UserStorage';
import { useCarStorage } from '@/storages/CarStorages';
import { ref } from 'vue';
import axios from 'axios'
const userStorage = ref(useUserStorage())
const categoryStorage = ref(useCategoryStorage())
const carsStorage = ref(useCarStorage())
const carHolder = {
    mark: '',
	model: '',
	description: '',
	category:'',
    picture: '',
}
const addCar = async ()=>{
	try{
        console.log(carHolder.picture)
		await axios.post('/api/cars/',carHolder,
		{
			auth:{
				username:userStorage.value.auth.username,
				password:userStorage.value.auth.password,
			},
            headers: {
                "Content-Type": "multipart/form-data"
            },
		})
		.then(res=>res.data)
		.then(data=>carsStorage.value.setCarsFromServer(userStorage.value.auth))
	}catch(err){
		alert('У вас нет прав админа')
        console.log(err)
	}

}
const changePic = (event)=>{
    carHolder.picture = event.target.files[0]
}
</script>
<template>

	<div 
	style="margin-right: 5%;margin-top: 15%;"
	>
		<a  class="nav-link py-3 px-2" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
			<h1 class="bi bi-plus-square"></h1>
		</a>
	</div>
    
    <!-- Modal -->
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="true" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="false">
        <div class="modal-dialog">
            <form>
				<div>
					<div class="modal-dialog">
						<div class="modal-content">
							<div class="modal-header">
								<h5 class="modal-title" id="staticBackdropLabel">
                                    Добавление машины
								</h5>
								<button
									type="button"
									class="btn-close"
									data-bs-dismiss="modal"
									aria-label="Close"
								></button>
							</div>
							<div class="modal-body">
                                
								<div class="form-group">
									<label for="exampleInputCarMark">Введите марку</label>
									<input
										class="form-control"
										id="exampleInputCarMark"
										placeholder="Марка"
                                        v-model="carHolder.mark"

									/>
								</div>
								<div class="form-group">
									<label for="exampleInputCarModel">Введите модель</label>
									<input
										class="form-control"
										id="exampleInputCarModel"
										placeholder="Модель"
                                        v-model="carHolder.model"
									/>
								</div>
                                <div class="form-group">
									<label for="exampleInputCarDesc">Введите описание</label>
									<input
										class="form-control"
										id="exampleInputCarDesc"
										placeholder="Ну какое-нибудь описание"
                                        v-model="carHolder.description"
									/>
								</div>
                                <div class="form-group">
									<label for="exampleInputCarPic">Добавьте картинку</label>
									<input
										type="file"
										class="form-control"
										id="exampleInputCarPic"
                                        ref="file"
                                        v-on:change="changePic"
									/>
								</div>
								<div class="form-group">
									<label for="exampleInputCarСategory">Добавьте категорию</label>
									<select class="form-select" aria-label="Default select example" v-model="carHolder.category">
										<option :value="cat.id" v-for="cat in categoryStorage.categories">{{cat.name}}</option>
									</select>
								</div>
								<button 
								class="btn btn-primary" 
								type="button"
                                @click="addCar"
								>
									Добавить
								</button>
							</div>
						</div>
					</div>
				</div>
			</form>
        </div>
    </div>
</template>
<style>
</style>
    