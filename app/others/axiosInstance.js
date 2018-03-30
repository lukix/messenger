import axios from 'axios'

export default axios.create({
	baseURL: CONFIG.apiUrl,
})