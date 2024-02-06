<template>
    <div>
        <div class="container-fluid">
            <div class="row">
                <SideBar></SideBar>
                <div class="col-sm p-3 min-vh-100">
                    <div class="container">
                        <MyProfile></MyProfile>
                        <MyRents></MyRents>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
</template>
<script setup>
import MyProfile from '@/components/MyProfile.vue';
import MyRents from '@/components/MyRents.vue';
import SideBar from '@/components/SideBar.vue';
</script>