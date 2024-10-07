import axios from 'axios'

const api = axios.create({
    baseURL:'http://15.228.191.54:3000',
    headers:{
        'Access-Control-Allow-Origin': '*',
        'X-Requested-With': 'XMLHttpRequest',

    }
})

export default api 