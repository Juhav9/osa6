import { useSelector, useDispatch } from 'react-redux'
import {updateAnecdote}  from '../reducers/anecdoteReducer'
import { setNotification, setOffNotification,notification } from '../reducers/notificationReducer'


const AnecdoteList = () => {
    const anecdotes = useSelector(({anecdotes, filter}) => {
        const arr = [...anecdotes]
        const sortedAnecdotes = arr.sort((a,b) => b.votes-a.votes)
        if(filter===''){
            return sortedAnecdotes
        }
        return anecdotes.filter(a=> a.content.includes(filter))
    })
    const dispatch = useDispatch()

    const vote = (anecdote) => {
        dispatch(updateAnecdote(anecdote))
        dispatch(notification(`you voted ${anecdote.content}`,5))
    }
    return (
        <div>
          <h2>Anecdotes</h2>
          {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote)}>vote</button>
              </div>
            </div>
          )}
        </div>
      )
}

export default AnecdoteList