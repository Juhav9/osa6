import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const anecdoteSlicer = createSlice({
  name:'anecdotes',
  initialState:[],
  reducers: {
    voteAnecdote(state, action) {
      const id = action.payload
      const votedAnecdote = state.find(a=>a.id===id)
      const changed = {
        ...votedAnecdote,
        votes: votedAnecdote.votes+1
      }
      return state.map(a=> a.id!==id ? a : changed)
    },
    newAnecdote(state, action) {
      state.push(asObject(action.payload))
    },
    appendAnecdote(state,action) {
      state.push(action.payload)
    },
    setAnecdote(state, action) {
      return action.payload
    }
  }
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdote(anecdotes))
  }
} 

export const createAnecdote = content => {
  const anecdote = asObject(content)
  return async dispatch => {
    const response = await anecdoteService.createNew(anecdote)
    dispatch(appendAnecdote(response))
  }
}

export const updateAnecdote = anecdote => {
  return async dispatch => {
    const a = {...anecdote, votes: anecdote.votes+1} 
    const updated = await anecdoteService.updateVote(a)
    dispatch(voteAnecdote(updated.id))
  }
}


const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}
export const {voteAnecdote, newAnecdote, appendAnecdote, setAnecdote} = anecdoteSlicer.actions
export default anecdoteSlicer.reducer
/*
const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const initialState = anecdotesAtStart.map(asObject)


const anecdoteReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'VOTE':
      const id = action.payload.id
      const votedAnecdote = state.find(a=>a.id===id)
      const changed = {
        ...votedAnecdote,
        votes: votedAnecdote.votes+1
      }
      return state.map(a=> a.id!==id ? a : changed)
    case 'NEW_ANECDOTE':
      return [...state, action.payload]
    default:
      return state
  }
}

export const voteAnecdote = (id) =>{
  return {
    type: 'VOTE',
    payload: {id}
  }
}

export const createAnecdote = (content) => {
  return {
    type: 'NEW_ANECDOTE',
    payload: asObject(content)
  }
} 
*/