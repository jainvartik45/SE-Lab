import axios from 'axios'

const API = axios.create({baseUrl : 'http://localhost:6000'})

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
  
    return req;
  });


export const fetchSamples = ()=> API.get(`/posts`);

export const upload = (writing)=> API.post('/posts' , writing);
export const getSample = (id)=> API.get(`/posts/${id}`);

export const signIn =(formData) =>API.post('/user/signin' , formData)
export const signUp =(formData) =>API.post('/user/signup' , formData)


export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const getUsersBySearch = (search) => API.get(`/user/search-user?search=${search}`);
export const getUserById =(id) => API.get(`/user/${id}`);
export const getPostsByUserId =(userid)=>API.get(`/posts/userid?userid=${userid}`);
export const fetchPost=(id)=>API.get(`/posts/${id}`)

export const updatePost = (id,updatedPost) => API.patch(`${'/posts'}/${id}` , updatedPost)
export const deletePost = (id) => API.delete(`${'/posts'}/${id}`)
export const likePost = (id) => API.patch(`${'/posts'}/${id}/likePost`)
export const comment = (value, id) => API.post(`/posts/${id}/commentPost`, { value });
export const toStudent = (feedback,id)=> API.patch(`${'/user'}/${id}` , feedback);



 
