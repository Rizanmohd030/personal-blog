import axios from 'axios';
// 1. Create a new Axios instance with a custom configuration.
// We are not modifying the global axios instance. This is a best practice.
    const apiService = axios.create({
//make a baseurl like  For example, apiService.get('/posts') will make a GET request to 'http://localhost:5000/api/posts'.
    baseURL:'http://localhost:5000/api',
});

// This function will be called for EVERY request made using this 'apiService' instance.

    apiService.interceptors.request.use(
        (config) =>{
            //getting token before request is sent
            const token = localStorage.getItem('token');

             // 5. If a token exists, add it to the 'Authorization' header.
    // The backend's 'protect' middleware is specifically looking for this header.

            if(token){
                config.headers['Authorization'] = `Bearer ${token}`;
            }
            return config;
        },
        (error) =>{
                // This is for handling errors before the request is even sent.

            return Promise.reject(error);
        }
    );

export default apiService;    