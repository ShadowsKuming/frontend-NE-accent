import axios from 'axios'

// Create an axios instance
const request = axios.create({
    baseURL: 'http://localhost:8081', // Base URL for the API
    timeout: 5000 // Timeout for requests (5 seconds)
})

// Request interceptor
// This allows you to process requests before they are sent
// For example, you can add a token or encrypt request parameters
request.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'application/json;charset=utf-8'; // Set the Content-Type header to JSON

    // config.headers['token'] = user.token; // Set a token in the request header (uncomment if needed)
    return config
}, error => {
    return Promise.reject(error) // Handle request error
})

// Response interceptor
// This allows you to handle responses in a unified way
request.interceptors.response.use(
    response => {
        // response.data is the Result returned from the backend
        let res = response.data;
        // Handle cases where the server returns a string instead of JSON
        if (typeof res === 'string') {
            res = res ? JSON.parse(res) : res
        }
        return res; // Return the processed response
    },
    error => {
        console.log('err' + error) // Log the error for debugging
        return Promise.reject(error) // Handle response error
    }
)

export default request
