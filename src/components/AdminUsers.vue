<template>
<div style="margin-top: 10px">
			<h3>Список пользователей</h3>
			<div v-if="userStorage.users && userStorage.users.length === 0">У вас пока нет аренд</div>
			<div v-else-if="userStorage.users">
				<div
					class="card"
					style="margin-top: 10px"
					v-for="user in userStorage.users"
					:key="user.id"
				>
					<div class="card-header">
						Пользoватель #{{ user.id }}
					</div>
					<div class="card-body">
						<p class="card-text">
                        Юзернейм: {{ user.username }}
                        </p>
						<p class="card-text">
                        Имя: {{ user.first_name }}
                        </p>
						<p class="card-text">
                        Емейл: {{ user.email }}
                        </p>
						<p class="card-text">
                            {{user.is_staff ? 'Админ' : 'Не админ' }}
						</p>
						<a @click="deleteUsers(user.id)" class="btn btn-warning">Поменять права</a>
						<a @click="deleteUsers(user.id)" class="btn btn-danger">Забанить(удалить)</a>
					</div>
			</div>
		</div>
	</div>
</template>
<script setup>
import { useUserStorage } from '@/storages/UserStorage';
import { ref, onBeforeMount } from 'vue';

const userStorage = ref(useUserStorage())

onBeforeMount(()=>{
    userStorage.value.getUserList()
})
</script>