import { useAppSelector, useAppDispatch } from '../redux/hooks'
import { fetchUser, setIsAuthorized } from '../redux/userSlice'
import { useHistory } from 'react-router-dom'
import { signOutReq } from '../api/signOutReq'
import { editUserReq } from '../api/editUserReq'
import { useEffect, useState } from 'react'
import AdminForm from './AdminForm'

const UserCard = () => {
  const [isAdminShown, setIsAdminShown] = useState(false)
  const [targetField, setTargetField] = useState('');
  const dispatch = useAppDispatch()
  const history = useHistory()
  const username = useAppSelector(state => state.user.username)
  const email = useAppSelector(state => state.user.email)
  const dob = useAppSelector(state => state.user.dob)
  const role = useAppSelector(state => state.user.role)
  const isExists = useAppSelector(state => state.user.isExists)
  const isAuthorized = useAppSelector(state => state.user.isAuthorized)
  useEffect(() => {
    dispatch(fetchUser())
  }, [])

  useEffect(() => {
    if (isExists === false) {
      dispatch(
        setIsAuthorized(false)
      )
    }
  }, [isExists])

  const handleChangeUserData = (e:any) => {
    switch (e.target.name) {
      case 'username':
        setTargetField('username')
        break
      case 'email':
        setTargetField('email')
        break
      case 'password':
        setTargetField('password')
        break
      case 'dob':
        setTargetField('dob')
        break
    }
  }

  const handleSubmit = async (e:any) => {
    let res
    if (e.key === 'Enter') {        
      if (e.currentTarget.name === 'username-input') {
        res = await editUserReq('username', e.currentTarget.value)
      }
      else if (e.currentTarget.name === 'email-input') {
        res = await editUserReq('email', e.currentTarget.value)
      }
      else if (e.currentTarget.name === 'password-input') {
        res = await editUserReq('password', e.currentTarget.value)
      }
      else if (e.currentTarget.name === 'dob-input') {
        res = await editUserReq('dob', e.currentTarget.value)
      }
      setTargetField('')
      }
      if (res && res.status === 200) {
        dispatch(fetchUser())
      } else if (res) {
        console.log(res)
      }
      
    if (e.key === 'Escape') {
			setTargetField('')
		}
  }

  const handleBlur = () => {
    setTargetField('')
  }

  const handleSignOut = async () => {
    await signOutReq()
    dispatch(
      setIsAuthorized(false)
    )
  }

  const handleAdmin = () => {
    isAdminShown ? setIsAdminShown(false) : setIsAdminShown(true)
  }

  return (
    <div>
      <h1>User Page</h1>
      <p>{username}</p>
      <button
        name="username"
        onClick={handleChangeUserData}
      >Change username</button>
      <button
        name="password"
        onClick={handleChangeUserData}
      >Change password</button>
      <p>{email}</p>
      <button
        name="email"
        onClick={handleChangeUserData}
      >Change email</button>
      <p>{dob}</p>
      <button
        name="dob"
        onClick={handleChangeUserData}
      >Change date of birth</button>
      {targetField ?
        (targetField === 'username' ?
        <input type="text" 
        placeholder="username"
        name="username-input"
        autoFocus 
        onBlur={handleBlur}
        onKeyUp={handleSubmit}/> :
        targetField === 'email' ?
        <input type="text" 
        placeholder="email"
        name="email-input"
        autoFocus 
        onBlur={handleBlur}
        onKeyUp={handleSubmit}/> :
        targetField === 'password' ?
        <input type="text" 
        placeholder="password"
        name="password-input"
        autoFocus
        onBlur={handleBlur}
        onKeyUp={handleSubmit}/> :
        <input type="date" 
        placeholder="dob"
        name="dob-input"
        autoFocus 
        onBlur={handleBlur}
        onKeyUp={handleSubmit}/>) : ''
      }
      <p>{role}</p>
      { role === 'Admin' ? 
        <button
          onClick={handleAdmin}
        >Admin Card</button> :
        ''
      }
      <button
        onClick={handleSignOut}
      >Sign out</button>
      { isAdminShown ? <AdminForm /> : ''}
    </div>
  )
}

export default UserCard