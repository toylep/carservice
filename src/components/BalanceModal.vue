<template>

    <a  class="nav-link py-3 px-2" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
        <h3 class="btn btn-primary">Добавить машину</h3>
    </a>
    
    <!-- Modal -->
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="true" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="false">
        <div class="modal-dialog">
            <form>
				<div>
					<div class="modal-dialog">
						<div class="modal-content">
							<div class="modal-header">
								<h5 class="modal-title" id="staticBackdropLabel">
                                    Пополнение баланса
								</h5>
								<button
									type="button"
									class="btn-close"
									data-bs-dismiss="modal"
									aria-label="Close"
								></button>
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
                </form>
            </div>
        </div>
</template>
<script setup>
import { useUserStorage } from '@/storages/UserStorage';
import { ref } from 'vue';
const userStorage = ref(useUserStorage()) 
</script>