<template>
   <div style="margin-top: 10px">
			<h1>Мои аренды</h1>
			<div v-if="rentStorage.rents && rentStorage.rents.length === 0">У вас пока нет аренд</div>
			<div v-else-if="rentStorage.rents">
				<div
					class="card"
					style="margin-top: 10px"
					v-for="rent in rentStorage.rents"
					:key="rent.id"
				>
					<div class="card-header">
						Аренда #{{ rent.id }}
					</div>
					<div class="card-body">
                        {{ rent.car.mark }} {{ rent.car.model }}
						<p class="card-text">
							Арендовано до {{ rent.end_date }}
						</p>
						<a @click="deleteRent(rent.id)" class="btn btn-primary">Отменить покупку</a>
					</div>
			</div>
		</div>
	</div>
</template>
<script setup>
import { ref,onBeforeMount } from 'vue';
import { useRentStorage } from '@/storages/RentStorage';
import { useUserStorage } from '@/storages/UserStorage';
const userStorage = ref(useUserStorage())
const rentStorage = ref(useRentStorage())

const deleteRent = async (id)=>{
    rentStorage.value.deleteRent(id)
    rentStorage.value.setRentsFromServer(userStorage.value.auth)
}

onBeforeMount(()=>{
    rentStorage.value.setRentsFromServer(userStorage.value.auth)
})
</script>