<template>
    <div class="col-sm-auto bg-light sticky-top">
            <div class="d-flex flex-sm-column flex-row flex-nowrap bg-light align-items-center sticky-bottom">
                <ul class="nav nav-pills nav-flush flex-sm-column flex-row flex-nowrap mb-auto mx-auto text-center align-items-center">
                    <li class="nav-item">
                        <RouterLink to="/">
                            <h3 class="bi bi-car-front-fill"></h3>
                        </RouterLink>
                    </li>
                    <li>
                        <a href="#" class="nav-link py-3 px-2" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Dashboard">
                            <RouterLink to="/me">
                                <h3 class="bi bi-person"></h3>
                            </RouterLink>
                        </a>
                    </li>

                    <li class="nav-item dropdown">
                        <a class="nav-link" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <h3 class="bi bi-sliders"></h3>
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><a class="dropdown-item disabled">Категории</a></li>
                            <li><RouterLink to="/categories-edit">

                            </RouterLink></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item" v-for="cat in categoryStorage.categories">{{cat.name}}</a></li>
                        </ul>
                    </li>
                </ul>
                <div class="d-flex">
                
                </div>
            </div>
        </div>
</template>
<script setup>
import { useCategoryStorage } from '@/storages/CategoryStorage';
import { ref,onBeforeMount } from 'vue';
const categoryStorage = ref(useCategoryStorage())
onBeforeMount(()=>{
    categoryStorage.value.getCategoriesFromServer()
})
</script>