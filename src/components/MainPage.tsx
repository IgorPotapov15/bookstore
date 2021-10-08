import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { fetchBooks, changeOrder, changeSort, setBookSearch } from '../redux/booksSlice'
import React, { useEffect, useState } from "react"
import Pagination from './Pagination'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  generatePath,
  Redirect,
} from 'react-router-dom';

const MainPage = () => {
  const dispatch = useAppDispatch()
  const booksList = useAppSelector(state => state.books.items)
  const isBooksLoading = useAppSelector(state => state.books.isLoading)
  const orderState = useAppSelector(state => state.books.order)
  const sortState = useAppSelector(state => state.books.sortBy)
  const filterByState = useAppSelector(state => state.books.filterBy)
  const filterValueState = useAppSelector(state => state.books.filterValue)
  const fromState = useAppSelector(state => state.books.from)
  const toState = useAppSelector(state => state.books.to)
  const page = useAppSelector(state => state.books.page)
  const [order, setOrder] = useState('asc')
  const [sort, setSort] = useState('createdAt')
  const [search, setSearch] = useState('')
  const [priceFrom, setPriceFrom] = useState('')
  const [priceTo, setPriceTo] = useState('')
  const [ratingFrom, setRatingFrom] = useState('')
  const [ratingTo, setRatingTo] = useState('')
  const [genre, setGenre] = useState('')
  const [author, setAuthor] = useState('')
  
  useEffect(() => {
    dispatch(fetchBooks())
  }, [page, orderState, sortState, filterByState, filterValueState, fromState, toState])

  useEffect(() => {
    dispatch(changeOrder(order))
  }, [order])

  useEffect(() => {
    dispatch(changeSort(sort))
  }, [sort])

  const handleChangeOrder = () => {
    setOrder(order === 'asc' ? 'desc' : 'asc')
  }

  const handleChangeSort = (sortType: string) => {
    setSort(sortType)
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
        setAuthor(e.currentTarget.value)
        break
    }
  }

  const handleSubmitSearch = (e: any) => {
    console.log(author, genre)
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
  
  return (
    <div>
        <h1>Main Page</h1>
          <div>
          Sort by:
            <button onClick={() => handleChangeSort('price')}>Price</button>
            <button onClick={() => handleChangeSort('genre')}>Genre</button>
            <button onClick={() => handleChangeSort('author')}>Author</button>
            <button onClick={() => handleChangeSort('rating')}>Rating</button>
            <button onClick={() => handleChangeSort('createdAt')}>Added time</button>
          </div>
        <div>
          Order:
          <button
            onClick={handleChangeOrder}
          >{order === 'asc' ? 'Descending' : 'Ascending'}</button>
        </div>
        <div>
          Search:
            <select onChange={handleChangeSearchType}>
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
            { search === 'price' ?
              <div>
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
                onClick={handleSubmitSearch}
              >Search</button>
              </div> :
              search === 'genre' ?
              <div>
                <select id="genreSelect" onChange={handleChangeSearchValue}>
                  <option value=""></option>
                  <option value="Classics">Classics</option>
                  <option value="Detective">Detective</option>
                  <option value="Fantasy">Fantasy</option>
                  <option value="Horror">Horror</option>
                  <option value="Science">Science</option>
                </select>
                <button
                id="genreSearch"
                onClick={handleSubmitSearch}
              >Search</button>
              </div> :
              search === 'author' ?
              <div>
                <select id="authorSelect" onChange={handleChangeSearchValue}>
                  <option value=""></option>
                  <option value="Author A">Author A</option>
                  <option value="Author B">Author B</option>
                </select>
                <button
                id="authorSearch"
                onClick={handleSubmitSearch}
              >Search</button>
              </div> :
              search === 'rating' ?
              <div>
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
                onClick={handleSubmitSearch}
              >Search</button>
              </div> : ''
            }
        </div>
        <ul>
          {isBooksLoading ? <h1>Loading...</h1> :
            booksList.map(item => 
              <li key={item.id}>
                <Link to={`/${item.id}`}>
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
        <Pagination />
    </div>
  )
}

export default MainPage