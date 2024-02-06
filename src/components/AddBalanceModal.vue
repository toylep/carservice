<template>
    <div >
		<a  class="nav-link py-3 px-2" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
			<a class="btn btn-primary">Пополнить баланс</a>
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
                                    Пополнение баланса
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
									<label for="exampleInputCarMark">На сколько хотите пополнить баланс</label>
									<input
                                        type="number"
										class="form-control"
										id="exampleInputCarMark"
										placeholder="Марка"
                                        v-model="balance"
									/>
                                </div>
								<button 
								class="btn btn-primary" 
								type="button"
                                @click="userStorage.addBalance(balance)"
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
import { useUserStorage } from '@/storages/UserStorage';
import { ref } from 'vue';
let balance = 0
const userStorage = ref(useUserStorage()) 
</script>