import { useState } from 'react'
import { useAppSelector, useAppDispatch } from '../redux/hooks'
import { setIsAuthorized } from '../redux/userSlice'
import { useHistory } from 'react-router-dom'
import { signUpReq } from '../api/signUpReq'
import { useEffect } from 'react'

const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [date, setDate] = useState('')
  const [username, setUsername] = useState('');
  const dispatch = useAppDispatch()
  const history = useHistory()
  const isAuthorized = useAppSelector(state => state.user.isAuthorized)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.type === 'text') {
      setUsername(e.currentTarget.value)
    }
    if (e.currentTarget.type === 'email') {
      setEmail(e.currentTarget.value)
    }
    if (e.currentTarget.type === 'password') {
      setPassword(e.currentTarget.value)
    }
    if (e.currentTarget.type === 'date') {
      setDate(e.currentTarget.value)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const res: any = await signUpReq(username, email, password, date)
    if (res && res.status === 200) {
      dispatch(
        setIsAuthorized(true)
      )
      history.push('/user')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
    >
      <input 
        type="email" 
        onChange={handleChange}
        value={email}
        required
        placeholder="Email"
      />
      <input 
        type="password"
        onChange={handleChange}
        value={password}
        required
        placeholder="Password"
      />
      <input 
        type="text"
        onChange={handleChange}
        value={username}
        required
        placeholder="Username"
      />
      <input 
        type="date"
        onChange={handleChange}
        value={date}
        required
      />
      <button type="submit">Sign Up</button>
    </form>
  )
}

export default SignUp