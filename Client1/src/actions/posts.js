import * as api from '../api'



export const uploadhandSample =(writing)=> async(dispatch)=>{

    try {
       const {data} = await api.upload(writing);
      
       dispatch({type : 'CREATE' , payload :data});
        
      } catch (error) {
        console.log(error);
      }
}



export const getSamples = () => async (dispatch) => {
    try {
      const { data } = await api.fetchSamples();
      dispatch({ type: 'FETCH_ALL', payload: data });
      
    } catch (error) {
      console.log(error.message);
    }
  };

export const getPost =(id)=> async(dispatch)=>{

    try {
        const { data } = await api.fetchPost(id);
        
        dispatch({ type: 'FETCH_POST', payload: data });
      } catch (error) {
        console.log(error);
      }
}

export const getPostsBySearch =(searchQuery) => async(dispatch) =>{
    try {
        
        const {data : {data}} = await api.fetchPostsBySearch(searchQuery);
        
        dispatch({type : 'FETCH_BY_SEARCH' , payload :{data}});    
    } catch (error) {
        console.log(error)
    }
}



export const updatePost =(id,post)=>async(dispatch)=>{
    try {
        const {data} = await api.updatePost(id,post);
        
        dispatch({type : 'UPDATE' , payload :data});
    } catch (error) { 
        console.log(error.message);
    }
}

export const commentPost = (value, id) => async (dispatch) => {
    try {
      const { data } = await api.comment(value, id);
        
      dispatch({ type: 'COMMENT', payload: data });
      
      return data.comments;
    } catch (error) {
      console.log(error);
    }
  };

export const deletePost =(id)=>async(dispatch)=>{
    try {
         await api.deletePost(id);
        dispatch({type : 'DELETE' , payload :id});
    } catch (error) { 
        console.log(error.message);
    }
}

export const likePost =(id)=>async(dispatch)=>{
    try {
        const {data} = await api.likePost(id);
        dispatch({type : 'LIKE' , payload :data});
    } catch (error) { 
        console.log(error.message);
    }
}

export const getPostsByUser =(userid)=>async(dispatch)=>{
    try {
        const {data} = await api.getPostsByUserId(userid);
        dispatch({type : 'POSTS_BY_USER' , payload :{data}});
    } catch (error) { 
        console.log(error.message);
    }
}

export const getSample =(id)=>async(dispatch)=>{
  try {
      const {data} = await api.getSample(id);
      dispatch({type : 'GET_SAMPLE' , payload :data});
  } catch (error) { 
      console.log(error.message);
  }
}




