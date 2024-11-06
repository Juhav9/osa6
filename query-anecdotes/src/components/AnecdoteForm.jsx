import {useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../request'
import { useNotificationDispatch } from '../NotificationContext'

const AnecdoteForm = () => {
  const dispatch = useNotificationDispatch()
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote)=>{
      queryClient.invalidateQueries({queryKey:['anecdotes']})
    }
  })
  
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    if(content.length<5){
      const message = 'too short anecdote, must have length 5 or more'
      dispatch({type:'SHORT', payload: message})
      
    }else{
      event.target.anecdote.value = ''
      newAnecdoteMutation.mutate({content, votes:0})
      const message = 'new anecdote is added'
      dispatch({type:'ADD', payload: message})
    }
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
