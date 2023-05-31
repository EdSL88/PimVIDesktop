
import axios from 'axios'

const api = axios.create({
    baseURL: 'https://pimvi.favela.network/',
    headers: {
        'Content-type': 'application/json',
    }
});


export default api