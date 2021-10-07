import { useState } from 'react'
import { useAppSelector, useAppDispatch } from '../redux/hooks'
import { setIsAuthorized } from '../redux/userSlice'
import { useHistory } from 'react-router-dom'
import { signInReq } from '../api/signInReq'


const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch()
  const history = useHistory()

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
      setIsAuthorized(true)
    )
  }

  return (
    <form
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
    </form>
  )
}

export default SignIn