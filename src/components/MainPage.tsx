import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { fetchBooks, changeOrder, changeSort, setBookSearch, setChapter, setPage } from '../redux/booksSlice'
import React, { useEffect, useState } from "react"
import Pagination from './Pagination'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  generatePath,
  Redirect,
  useHistory,
  useLocation
} from 'react-router-dom';
import { resetComments, setBookId } from "../redux/commentSlice";

const MainPage = () => {
  const dispatch = useAppDispatch()
  const history = useHistory()
  const location = useLocation()
  const booksList = useAppSelector(state => state.books.items)
  const authorsList = useAppSelector(state => state.books.authors)
  const isBooksLoading = useAppSelector(state => state.books.isLoading)
  const orderState = useAppSelector(state => state.books.order)
  const sortState = useAppSelector(state => state.books.sortBy)
  const filterByState = useAppSelector(state => state.books.filterBy)
  const fromState = useAppSelector(state => state.books.from)
  const toState = useAppSelector(state => state.books.to)
  const filterValueState = useAppSelector(state => state.books.filterValue)
  const [order, setOrder] = useState(orderState)
  const [sort, setSort] = useState(sortState)
  const [search, setSearch] = useState(filterByState)
  const [priceFrom, setPriceFrom] = useState(filterByState === 'price' ? fromState : '')
  const [priceTo, setPriceTo] = useState(filterByState === 'price' ? toState : '')
  const [ratingFrom, setRatingFrom] = useState(filterByState === 'rating' ? fromState : '')
  const [ratingTo, setRatingTo] = useState(filterByState === 'rating' ? toState : '')
  const [genre, setGenre] = useState('')
  const [author, setAuthor] = useState('')

  useEffect(() => {
    dispatch(setChapter(location.pathname))
    dispatch(resetComments())
  }, [])

  useEffect(() => {
    setSort(sortState)
    setOrder(orderState)
    setSearch(filterByState)
    setPriceFrom(filterByState === 'price' ? fromState : '')
    setPriceTo(filterByState === 'price' ? toState : '')
    setRatingFrom(filterByState === 'rating' ? fromState : '')
    setRatingTo(filterByState === 'rating' ? toState : '')
    setAuthor(filterByState === 'author' ? filterValueState : '')
    setGenre(filterByState === 'genre' ? filterValueState : '')
  }, [filterByState, fromState, toState, filterValueState, sortState, orderState])

  useEffect(() => {
    dispatch(changeOrder(order))
  }, [order])

  useEffect(() => {
    dispatch(changeSort(sort))
  }, [sort])

  const handleChangeOrder = () => {
    setOrder(order === 'asc' ? 'desc' : 'asc')
  }

  // const handleChangeSort = (sortType: string) => {
  //   setSort(sortType)
  // }

  const handleChangeSort = (e: any) => {
      switch (e.currentTarget.value) {
        case 'createdAt':
          setSort('createdAt')
          break
        case 'genre':
          setSort('genre')
          break
        case 'author':
          setSort('author')
          break
        case 'price':
          setSort('price')
          break
        case 'rating':
          setSort('rating')
          break
      }
    }

  const handleChangeSearchType = (e: any) => {
    setPriceFrom('')
    setPriceTo('')
    setRatingFrom('')
    setRatingTo('')
    setGenre('')
    setAuthor('')
    setSearch(e.currentTarget.value)
    if (!e.currentTarget.value) {
      dispatch(setBookSearch({
        filterBy: '',
        filterValue: '',
        from: '',
        to: ''
      }))
    }
  }

  const handleChangeSearchValue = (e: any) => {
    switch (e.currentTarget.id) {
      case 'priceFrom':
        setPriceFrom(e.currentTarget.value)
        break
      case 'priceTo':
        setPriceTo(e.currentTarget.value)
        break
      case 'ratingFrom':
        setRatingFrom(e.currentTarget.value)
        break
      case 'ratingTo':
        setRatingTo(e.currentTarget.value)
        break
      case 'genreSelect':
        setGenre(e.currentTarget.value)
        break
      case 'authorSelect':
        setAuthor(e.target.value)
        break
    }
  }

  const handleSubmitSearch = (e: any) => {
    e.preventDefault()
    dispatch(setPage(1))
    switch (e.target.id) {
      case 'priceSearch':
        if (priceFrom || priceTo) {
          dispatch(setBookSearch({
            filterBy: 'price',
            filterValue: '',
            from: priceFrom,
            to: priceTo
          }))
        } else {
          return
        }
        break
      case 'genreSearch':
        if (genre) {
          dispatch(setBookSearch({
            filterBy: 'genre',
            filterValue: genre,
            from: '',
            to: ''
          }))
        } else {
          return
        }
        break
      case 'authorSearch':
        if (author) {
          dispatch(setBookSearch({
            filterBy: 'author',
            filterValue: author,
            from: '',
            to: ''
          }))
        } else {
          return
        }
        break
      case 'ratingSearch':
        if (ratingFrom || ratingTo) {
          dispatch(setBookSearch({
            filterBy: 'rating',
            filterValue: '',
            from: ratingFrom,
            to: ratingTo
          }))
        } else {
          return
        }
        break
    }
  }

  const handleResetForm = () => {
    dispatch(setBookSearch({
      filterBy: '',
      filterValue: '',
      from: '',
      to: ''
    }))
    setSearch('')
  }
  
  return (
    <div>
        <h1>Main Page</h1>
          <div>
          Sort by:
          <select onChange={handleChangeSort} value={sort}>
            <option value="createdAt">Added time</option>
            <option value="genre">Genre</option>
            <option value="author">Author</option>
            <option value="price">Price</option>
            <option value="rating">Rating</option>
          </select>
          </div>
        <div>
          Order:
          <button
            onClick={handleChangeOrder}
          >{order === 'asc' ? 'Descending' : 'Ascending'}</button>
        </div>
        <div>
          Search:
            <select
              value={search}
              onChange={handleChangeSearchType}>
              <option value=""></option>
              <option
                value="price"
              >price</option>
              <option
                value="genre"
              >genre</option>
              <option
                value="author"
              >author</option>
              <option
                value="rating"
              >rating</option>
            </select>
            {search !== '' ? <button
              onClick={handleResetForm}
            >Reset form</button> : ''}
            { search === 'price' ?
              <form>
                From
                <input 
                  id="priceFrom"
                  type="number"
                  min="0"
                  value={priceFrom}
                  onChange={handleChangeSearchValue}
                />
                To
                <input
                  id="priceTo"
                  type="number"
                  min="0"
                  value={priceTo}
                  onChange={handleChangeSearchValue}
                />
              <button
                id="priceSearch"
                type="submit"
                onClick={handleSubmitSearch}
              >Search</button>
              </form> :
              search === 'genre' ?
              <form>
                <select id="genreSelect" onChange={handleChangeSearchValue} value={genre}>
                  <option value=""></option>
                  <option value="Classics">Classics</option>
                  <option value="Detective">Detective</option>
                  <option value="Fantasy">Fantasy</option>
                  <option value="Horror">Horror</option>
                  <option value="Science">Science</option>
                </select>
                <button
                id="genreSearch"
                type="submit"
                onClick={handleSubmitSearch}
              >Search</button>
              </form> :
              search === 'author' ?
              <form>
                <input type="text" id="authorSelect" 
                  onChange={handleChangeSearchValue}
                  value={author}
                />
                <button
                id="authorSearch"
                type="submit"
                onClick={handleSubmitSearch}
              >Search</button>
              </form> :
              search === 'rating' ?
              <form>
                From
                <input 
                  id="ratingFrom"
                  type="number"
                  min="0"
                  value={ratingFrom}
                  onChange={handleChangeSearchValue}
                />
                To
                <input
                  id="ratingTo"
                  type="number"
                  min="0"
                  value={ratingTo}
                  onChange={handleChangeSearchValue}
                />
              <button
                id="ratingSearch"
                type="submit"
                onClick={handleSubmitSearch}
              >Search</button>
              </form> : ''
            }
        </div>
        <ul>
          {isBooksLoading ? <h1>Loading...</h1> :
            booksList.length === 0 ? <h2>Nothing found</h2> :
            booksList.map(item =>
              <li key={item.id}>
                <Link to={`/book/${item.id}`}>
                  <img src={item.img} style={{width: '50px'}} />
                  {item.name}
                  <div>
                    {item.genre}<br/>
                    {item.author}<br/>
                    €{item.price}<br/>
                  </div>
                </Link>
              </li>
            )
          }
        </ul>
        {!isBooksLoading ?
          <Pagination /> : ''
        }
    </div>
  )
}

export default MainPage