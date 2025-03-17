import axios from 'axios'

const baseURL = 'http://localhost:3002'

const request = axios.create({
  baseURL,
  timeout: 5000
})

// Request interceptor
request.interceptors.request.use(
  config => {
    // You can add custom headers or auth tokens here
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// Response interceptor
request.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    return Promise.reject(error)
  }
)

// API methods
export const getPosts = (params) => {
  return request.get('/posts', { params })
}

export const getPostById = (id) => {
  return request.get(`/posts/${id}`)
}

export const createPost = (data) => {
  return request.post('/posts', data)
}

export const updatePost = (id, data) => {
  return request.put(`/posts/${id}`, data)
}

export const deletePost = (id) => {
  return request.delete(`/posts/${id}`)
}
