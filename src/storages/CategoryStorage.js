import {defineStore} from 'pinia'
import axios from 'axios'

export const useCategoryStorage = defineStore('carStore',{
    state: () =>({
        categories:[]
    }),
    actions:{
        async getCategoriesFromServer(){
                try {
                    const response = await axios.get('/api/cars/category/')
                    this.categories =  response.data
                } catch (error) {
                    console.error('Error fetching categories:')
                }
            
        },
        async deleteCategory(id){
            try{
                const response = await axios.delete('/api/cars/category/'+id)
                await this.getCategoriesFromServer()
            } catch(err){
                console.error('Error')
            }
        },
        async addCategory(catHolder){
            try{
                const response = await axios.post('/api/cars/category/',catHolder)
            } catch(err){
                console.log(err)
            }
        }
    }

})