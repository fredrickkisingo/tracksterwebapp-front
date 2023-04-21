import { defineStore } from 'pinia'

export const useAuthStore  = defineStore('auth', {
    state: () => {
        return {
            user: null,
            acesstoken:null
        }
    },
    actions: {
        setUser(userData) {
            this.user = userData
            localStorage.setItem('user', JSON.stringify(userData))
        },
        setAccessToken(accesstoken) {
            this.acesstoken = accesstoken
            localStorage.setItem('acesstoken', accesstoken)
        },
    
    }
})

/**
 * 
 * { user: null, setUser: () => {}}
 */ 