import React from 'react'
import { useAppSelector, useAppDispatch } from './redux/hooks'
import { useEffect } from 'react'
import { changeOrder, changeSort, fetchBooks, setBookSearch, setChapter, setPage } from './redux/booksSlice'

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
  const orderState = useAppSelector(state => state.books.order)
  const sortState = useAppSelector(state => state.books.sortBy)
  const filterByState = useAppSelector(state => state.books.filterBy)
  const filterValueState = useAppSelector(state => state.books.filterValue)
  const fromState = useAppSelector(state => state.books.from)
  const toState = useAppSelector(state => state.books.to)
  const page = useAppSelector(state => state.books.page)
  const chapter = useAppSelector(state => state.books.currChapter)
  const history = useHistory()
  
  const params = {
    page: `page=${page}`,
    order: `order=${orderState}`,
    sortBy: `sortBy=${sortState}`,
    filterByState: `filterBy=${filterByState}`,
    filterValueState: `value=${filterValueState}`,
    fromState: `from=${fromState}`,
    toState: `to=${toState}`
  }

  useEffect(() => {
    let query = new URLSearchParams(location.search)
    // if (query.get('page') &&
    //     query.get('order') &&
    //     query.get('sortBy')
    // ) {
      dispatch(setPage(query.get('page')))
      dispatch(changeOrder(query.get('order')))
      dispatch(changeSort(query.get('sortBy')))
      dispatch(setBookSearch({
        filterBy: query.get('filterBy') ? query.get('filterBy') : '',
        filterValue: query.get('value') ? query.get('value') : '',
        from: query.get('from') ? query.get('from') : '',
        to: query.get('to') ? query.get('to') : ''
      }))
    // }
  }, [])

  useEffect(() => {
    dispatch(fetchBooks())
    if (chapter === '/' || chapter === '') {
      setURL()
    }
  }, [page, orderState, sortState, filterByState, filterValueState, fromState, toState, chapter])

  function setURL() {
      history.push({
        pathname: '/',
        search: '?' + params.page + '&' + params.order + '&' + params.sortBy +
        (filterByState ? '&' + params.filterByState : '') + 
        (filterValueState ? '&' + params.filterValueState : '') + 
        (fromState ? '&' + params.fromState : '') + 
        (toState ? '&' + params.toState : '')
      })
  }

  useEffect(() => {
    checkTokenFunc()
    console.log(isAuthorized)
  }, [])

  async function checkTokenFunc() {
    dispatch(
      fetchToken()
    )
  }

  const changeChapter = (path: string) => {
    dispatch(setChapter(path))
  }

  return (
      <div>
        <nav>
          <ul>
            <li onClick={setURL}>
              <Link to="/" onClick={() => changeChapter('/')}>Home</Link>
            </li>
            {!isTokenChecking && isAuthorized ? 
            <li>
            <Link to="/user" onClick={() => changeChapter('/user')}>User</Link>
            </li> :
              !isTokenChecking && !isAuthorized ?
            <li>
              <Link to="/signin" onClick={() => changeChapter('/signin')}>Sign in</Link>
              <br/>
              <Link to="/signup" onClick={() => changeChapter('/signup')}>Sign Up</Link>
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