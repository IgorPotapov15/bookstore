import React from 'react'
import { useAppSelector, useAppDispatch } from './redux/hooks'
import { useEffect } from 'react'
import { changeOrder, fetchBooks, setPage } from './redux/booksSlice'

import {
  Switch,
  Route,
  Link,
  generatePath,
  Redirect,
  useHistory,
  withRouter,
  useLocation
} from 'react-router-dom';

import MainPage from './components/MainPage'
import UserCard from './components/UserCard'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import BookCard from './components/BookCard'
import NotMatch from './components/NotMatch'
import { fetchToken, fetchUser } from './redux/userSlice'


function App() {
  const isAuthorized = useAppSelector(state => state.user.isAuthorized)
  const isTokenChecking = useAppSelector(state => state.user.isTokenChecking)
  const booksList = useAppSelector(state => state.books.items)
  const dispatch = useAppDispatch()
  const location = useLocation()
  let query = new URLSearchParams(location.search)

  useEffect(() => {
    // dispatch(setPage(query.get('page')))
    // console.log(query.get('order'), query.get('page'), query.get('sortBy'))
    // console.log(query.get('orger'), '---------------------------------------')
    for (let p of query as any) {
      console.log(p);
    }
    // dispatch(changeOrder(query.get('order')))
  }, [])

  useEffect(() => {
    checkTokenFunc()
    console.log(isAuthorized)
  }, [])

  async function checkTokenFunc() {
    dispatch(
      fetchToken()
    )
  }  

  return (
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            {!isTokenChecking && isAuthorized ? 
            <li>
            <Link to="/user">User</Link>
            </li> :
              !isTokenChecking && !isAuthorized ?
            <li>
              <Link to="/signin">Sign in</Link>
              <br/>
              <Link to="/signup">Sign Up</Link>
            </li>
              : ''
            }
          </ul>
        </nav>
        <Switch>
          <Route path="/user">
            {!isAuthorized ? <Redirect to="/signin"/> : <UserCard />}
          </Route>
          <Route path="/signin">
            {isAuthorized ? <Redirect to="/user"/> : <SignIn />}
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route exact path="/">
            <MainPage/>
          </Route>
          {
            booksList.map(item => 
              <Route key={item.id} path={generatePath('/:id', { id: item.id })}>
                <BookCard
                  item={item}
                />
              </Route>
            )
          }
          <Route path="*">
            <NotMatch />
          </Route>
        </Switch>
      </div>
  );
}

export default withRouter(App)