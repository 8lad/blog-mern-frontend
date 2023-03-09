import axios from "axios";

const instance = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
});

instance.interceptors.request.use((config) => {
	if (config && config.headers) {
		config.headers.Authorization = window.localStorage.getItem(
			"token-mern"
		) as string;
		return config;
	}
});

export default instance;
