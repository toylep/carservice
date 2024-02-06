<template>
    
    <div class="container" v-if="userStorage.user.is_staff==true">
        <h1>
            Управление категориями
        </h1>
        <AddCategoryModal/>
        
        <hr>
        <div class v-for="cat in categoryStorage.categories">
            <div class="card">
                <div class="card-header">
                    Категория: {{ cat.name }}
                </div>
                <div class="card-body">
                    <h5 class="card-title">Цена машины: {{ cat.price }}$</h5>
                    <a href="#" class="btn btn-warning">Изменить</a>
                    <a @click="categoryStorage.deleteCategory(cat.id)" href="#" class="btn btn-danger">Удалить</a>
                </div>
            </div>
        </div>
    </div>
    <div class="container" v-else>
        <h1>Похоже у вас нет прав админа</h1>
    </div>
</template>
<script setup>
import { useCategoryStorage } from '@/storages/CategoryStorage';
import { useUserStorage } from '@/storages/UserStorage';
import { ref,onBeforeMount } from 'vue';
import AddCategoryModal from './AddCategoryModal.vue';
const categoryStorage = ref(useCategoryStorage())
const userStorage = ref(useUserStorage())

onBeforeMount(()=>{
    userStorage.value.setUserFromServer()
})
</script>