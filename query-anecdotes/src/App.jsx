import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient} from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from './request'
import { useNotificationDispatch } from './NotificationContext'

const App = () => {

  const queryClien = useQueryClient()

  const dispatch = useNotificationDispatch()

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClien.invalidateQueries({queryKey:['anecdotes']})
    }
  })

  const handleVote = (anecdote) => {
    const message = `anecdote '${anecdote.content}' voted`
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes+1})
    dispatch({type:'VOTE', payload: message})
  }
  const result = useQuery(
    {
      queryKey: ['anecdotes'],
      queryFn: getAnecdotes,
      retry: 1
    })
  
  if ( result.isLoading ) {
    return <div>loading data...</div>
    }
  if ( result.error ) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data
  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
