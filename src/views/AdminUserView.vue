<template>
    <div>
        <div class="container-fluid">
            <div class="row">
                <SideBar></SideBar>
                <div class="col-sm p-3 min-vh-100">
                    <AdminCategory></AdminCategory>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import SideBar from '@/components/SideBar.vue';
import AdminCategory from '@/components/AdminCategory.vue';
</script>