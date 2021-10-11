import React from 'react'
import { useAppSelector, useAppDispatch } from './redux/hooks'
import { useEffect } from 'react'
import { fetchBooks } from './redux/booksSlice'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  generatePath,
  Redirect
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
  const page = useAppSelector(state => state.books.page)
  const dispatch = useAppDispatch()

  useEffect(() => {
    checkTokenFunc()
    console.log(isAuthorized)
  }, [])

  async function checkTokenFunc() {
    dispatch(
      fetchToken()
    )
  }

  useEffect(() => {
    dispatch(fetchBooks())
  }, [page])

  return (
    <Router>
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
          {/* <Route path="/:id" component={BookCard} /> */}
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
    </Router>
  );
}

export default App;