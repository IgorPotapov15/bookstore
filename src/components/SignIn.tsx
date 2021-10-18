import { useEffect, useState } from 'react'
import { useAppDispatch } from '../redux/hooks'
import { fetchToken, fetchUser } from '../redux/userSlice'
import { useHistory, useLocation } from 'react-router-dom'
import { signInReq } from '../api/signInReq'
import { setChapter } from '../redux/booksSlice'
import {
  SignForm
} from '../style'
const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch()
  const history = useHistory()
  const location = useLocation()
  
  useEffect(() => {
    dispatch(setChapter(location.pathname))
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.type === 'email') {
      setEmail(e.currentTarget.value)
    }
    if (e.currentTarget.type === 'password') {
      setPassword(e.currentTarget.value)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const res: any = await signInReq(email, password)
    if (res && res.status === 200) {
      history.push('/')
    }
    dispatch(
      fetchToken()
    )
    dispatch(
      fetchUser()
    )
  }

  return (
    <SignForm
      onSubmit={handleSubmit}
    >
      <input 
        type="email" 
        onChange={handleChange}
        value={email}
        required/>
      <input 
        type="password"
        onChange={handleChange}
        value={password}
        required/>
      <button type="submit">Sign In</button>
    </SignForm>
  )
}

export default SignIn