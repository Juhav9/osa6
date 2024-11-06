import { createSlice } from "@reduxjs/toolkit"

const filterSlicer = createSlice({
    name: 'filter',
    initialState:'',
    reducers:{
        setFilter(state, action) {
            return action.payload
        }
    }
})

export const {setFilter} = filterSlicer.actions 
export default filterSlicer.reducer

/*
const filterReducer = (state = '', action) => {
    switch(action.type) {
        case 'FILTER':
            return action.payload
        default:
            return state
    }
}

export const filterChange = filter => {
    return {
        type: 'FILTER',
        payload: filter
    }
}
*/
