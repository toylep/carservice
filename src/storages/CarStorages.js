import {defineStore} from 'pinia'
import axios from 'axios'

export const useCarStorage = defineStore('categoryStore',{
    state: () => ({
        cars:[],
        change_id:0,
        params:{
            page: 1,
            category: null,
        }
    }),
    actions:{
        setCars(cars){
            this.cars = cars
        },
        addCar(car){
            this.cars.push(car)
        },
        async setCarsFromServer(page=1){
            try {
                const response = await axios.get(
                    '/api/cars/list',{
                        params:{
                            page:page
                        }
                    }
                    )
                console.log(response.data)
                this.cars = response.data.results

            } catch (err){
                alert('Нет соединения с сервером :(')
                console.log(err)
            }
        },
        async setCarsFromServerWithCategory(){
            try {
                const response = await axios.get(
                    '/api/cars/list',{
                        params:{
                            category:this.params.category,
                            page:this.params.page
                        }
                    }
                    )
                console.log(response.data)
                this.cars = response.data.results

            } catch (err){
                alert('Нет соединения с сервером :(')
                console.log(err)
            }
        },
        setChangeId(id){
            alert('сhanged')
            this.change_id=id
        }

    }
})