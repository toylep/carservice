<template>
    <div >
		<a data-bs-toggle="modal" data-bs-target="#staticBackdrop">
			
			<button class="btn btn-primary"><h5 class="bi bi-plus-square"> Добавить категорию</h5></button>
		</a>
	</div>
    
    <!-- Modal -->
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="true" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="false">
        <div class="modal-dialog">
            <form>
				<div>
					<div class="modal-dialog">
						<div class="modal-content">
							<div class="modal-header">
								<h5 class="modal-title" id="staticBackdropLabel">
                                    Добавление машины
								</h5>
								<button
									type="button"
									class="btn-close"
									data-bs-dismiss="modal"
									aria-label="Close"
								></button>
							</div>
							<div class="modal-body">
                                
								<div class="form-group">
									<label for="exampleInputCarMark">Введите название категории</label>
									<input
										class="form-control"
										id="exampleInputCarMark"
										placeholder="Марка"
                                        v-model="catHolder.name"
									/>
                                </div>
								<div class="form-group">
									<label for="exampleInputCarMark">Введите цену машины</label>
									<input
										class="form-control"
										id="exampleInputCarMark"
										placeholder="Марка"
                                        v-model="catHolder.price"
									/>
                                </div>
								<button 
								class="btn btn-primary" 
								type="button"
                                @click="userStorage.addCategory(catHolder)"
								>
									Добавить
								</button>
							</div>
						</div>
					</div>
				</div>
			</form>
        </div>
    </div>
</template>
<script setup>
import { useCategoryStorage } from '@/storages/CategoryStorage';
import { ref } from 'vue';
const userStorage = ref(useCategoryStorage())
const catHolder = {
    name:'',
    price:0
}
</script>