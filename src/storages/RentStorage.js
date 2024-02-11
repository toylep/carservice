import {defineStore} from 'pinia'
import axios from 'axios'
export const useRentStorage = defineStore('rentStore',{
    state:()=>({
        rents:[]
    }),
    actions:{
        async setRentsFromServer(auth){
            try {
                const response = await axios.get(
                    `/api/cars/rent/user/${auth.username}`,
                    {
                        auth:{
                            username:auth.username,
                            password:auth.password,
                        }
                    }
                    
                )
                this.rents = response.data
            } catch (err) {
                if (!(auth.username==='Не авторизован'))
                    alert('Не получилось получить данные о ваших арендах')
            } 
        },
        async deleteRent(id){
            axios.delete('api/cars/rent/'+id)
        }
    }
})