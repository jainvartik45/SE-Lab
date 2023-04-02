import * as api from '../api'

export const signin =(formData , navigate)=> async(dispatch)=>{
        try {
            const {data} = await api.signIn(formData)

            dispatch({type : 'AUTH' , data});

            navigate('/');
        } catch (error) {
            console.log(error);
        }
}

export const toStudent =(feedback,id)=> async(dispatch)=>{
    try {
        const {data} = await api.toStudent(feedback,id);
        dispatch({type : 'FEEDBACK' , data});
        
        
    } catch (error) {
        console.log(error);
    }
}

export const getUser =(feedback,id)=> async(dispatch)=>{
    try {
        const {data} = await api.getUserById(feedback,id);
        // dispatch({type : 'FEEDBACK' , data});
        console.log(data)
        
    } catch (error) {
        console.log(error);
    }
}

export const signup =(formData , navigate)=> async(dispatch)=>{
    try {
        
        const {data} = await api.signUp(formData)
        
        dispatch({type : 'AUTH' , data});

        navigate('/');
    } catch (error) {
        console.log(error);
    }
}