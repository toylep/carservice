import {defineStore} from 'pinia'
import axios from 'axios'

export const useCarStorage = defineStore('categoryStore',{
    state: () => ({
        cars:[],
        change_id:0
    }),
    actions:{
        setCars(cars){
            this.cars = cars
        },
        addCar(car){
            this.cars.push(car)
        },
        async setCarsFromServer(page){
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
        async setCarsFromServerWithCategory(category_id,page){
            try {
                const response = await axios.get(
                    '/api/cars/list',{
                        params:{
                            category:category_id,
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
        setChangeId(id){
            alert('сhanged')
            this.change_id=id
        }

    }
})