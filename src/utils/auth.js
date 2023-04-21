import axios from "axios"

export const fetchUser = async (token) => {
   
    const response = await axios.get('/api/user',{
        headers: {
          Authorization: `Bearer ${token}`,
          token: token
        }
      })
    
    return response.data
}
