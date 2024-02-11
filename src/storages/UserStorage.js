import {defineStore} from 'pinia'
import axios from 'axios'
export const useUserStorage = defineStore('userStore',{
    state: ()=>({
        user: {
            username: 'Не авторизован',
            first_name: 'Не авторизован',
            email: 'Не авторизован',
            is_staff: false,
            balance: 0,
        },
        auth:{
            username:'Не авторизован',
            password:'Не авторизован',
        },
        users:[]

    }),
    actions:{
        async addBalance(balance){
            console.log('/api/users/'+this.user.id)
            await axios.patch('/api/users/'+this.user.id,{
                'balance':this.user.balance+balance
            })
            await this.setUserFromServer()
        },
        setUser(user){
            this.user=user
        },
        setAuth(auth){
            this.auth=auth
        },
        async setUserFromServer(){
            this.auth.username = JSON.parse(localStorage.getItem('auth')).username
            if (this.auth != null){
                await axios.get(
                    '/api/users/get/'+this.auth.username
                ).then(res=>res.data)
                 .then(data=>{
                    this.user=data
                    localStorage.setItem('user', JSON.stringify(data));
                 })
            }
            else alert('Вы не авторизованы')
        },
        async getUserList(){
            axios.get('/api/users/list')
            .then(resp=>resp.data)
            .then(data=>this.users=data)
        },
        async changeAuthority(id){
            axios.patch('api/users/'+id)
            .then(resp=>resp.data)
            .then(data => this.users.filter((el)=>el.id === data.id)[0] = data)
        }
        

    }
})