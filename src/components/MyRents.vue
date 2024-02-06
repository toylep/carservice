<template>
    <h1>Мои аренды</h1>
        <div class="card" v-for="rent in rents">
            <div class="card-header">
                Featured
            </div>
            <div class="card-body">
                <h5 class="card-title">Special title treatment</h5>
                <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
        </div>
</template>
<script setup>
import { ref,onBeforeMount } from 'vue';
import { useRentStorage } from '@/storages/RentStorage';
import { useUserStorage } from '@/storages/UserStorage';
const userStorage = ref(useUserStorage())
const rentStorage = ref(useRentStorage())
onBeforeMount(()=>{
    rentStorage.value.setRentsFromServer(userStorage.value.auth)
})
</script>