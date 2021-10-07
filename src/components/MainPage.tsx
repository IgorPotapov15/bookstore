import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { fetchBooks, changeOrder } from '../redux/booksSlice'
import React, { useEffect, useState, useRef, useCallback } from "react"
import { postBookReq } from "../api/postBookReq"
import { getBooksReq } from "../api/getBooksReq"

const MainPage = () => {
  const dispatch = useAppDispatch()
  const booksList = useAppSelector(state => state.books.items)
  const isBooksLoading = useAppSelector(state => state.books.isLoading)
  const o = useAppSelector(state => state.books.order)
  const [order, setOrder] = useState('asc');

  useEffect(() => {
    dispatch(fetchBooks())
  }, [order])

  const handleChangeOrder = () => {
    dispatch(changeOrder(order))
    setOrder(order === 'asc' ? 'desc' : 'asc')
  }
  
  return (
    <div>
        <h1>Main Page</h1>
        <div>
          Order:
          <button
            onClick={handleChangeOrder}
          >{order === 'asc' ? 'Descending' : 'Ascending'}</button>
        </div>
        <ul>
          {isBooksLoading ? <h1>Loading...</h1> :
            booksList.map(item => 
              <li key={item.id}>
                <a href={item.id}>
                  <img src={item.img} style={{width: '50px'}} />
                  {item.name}
                </a>
              </li>
            )
          }
        </ul>
    </div>
  )
}

export default MainPage