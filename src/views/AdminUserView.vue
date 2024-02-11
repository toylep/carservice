<template>
    <div>
        <div class="container-fluid">
            <div class="row">
                <SideBar></SideBar>
                <div class="col-sm p-3 min-vh-100">
                    <AdminUsers></AdminUsers>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import SideBar from '@/components/SideBar.vue';
import AdminUsers from '@/components/AdminUsers.vue';
</script>