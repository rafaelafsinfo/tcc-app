import axios from 'axios'

const api = axios.create({
    baseURL:'http://15.228.203.122:3000',
    headers:{
        'Access-Control-Allow-Origin': '*'
    }
})

export default api