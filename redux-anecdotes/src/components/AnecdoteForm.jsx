import {useDispatch } from 'react-redux'
import {createAnecdote} from '../reducers/anecdoteReducer'
import { notification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const create = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(content))
        dispatch(notification(`${content} added`,5))
    }
    return(
        <>
            <h2>create new</h2>
            <form onSubmit={create}>
                <div><input name='anecdote'/></div>
                <button>create</button>
            </form>
        </>
    )

}
export default AnecdoteForm