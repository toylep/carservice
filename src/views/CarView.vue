<template>
    <div>
        <div class="container-fluid">
            <div class="row">
                <SideBar></SideBar>
                <div class="col-sm p-3 min-vh-100">
                    <CarList></CarList>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import CarList from '@/components/CarList.vue';
import SideBar from '@/components/SideBar.vue';


</script>
<style>
.row{
    z-index: 0;
    position: relative;
}
</style>