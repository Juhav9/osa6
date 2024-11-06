import { createSlice } from "@reduxjs/toolkit"

const notificationSlicer = createSlice({
    name:'notification',
    initialState: null,
    reducers:{
        setNotification (state, action){
            return action.payload 
        },
        setOffNotification(state, action){
            return null
        }
    }

})

export const notification = (message, ms) => {
    const time = ms*1000
    return dispatch => {
      dispatch(setNotification(message))
      setTimeout(()=>{
        dispatch(setNotification(null))
      }, time)
    }
  }

export const {setNotification, setOffNotification} = notificationSlicer.actions
export default notificationSlicer.reducer