import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { fetchBooks } from '../redux/booksSlice'
import React, { useEffect, useState, useRef, useCallback } from "react"
import { postBookReq } from "../api/postBookReq"
import { getBooksReq } from "../api/getBooksReq"

const MainPage = () => {
  const dispatch = useAppDispatch()
  const booksList = useAppSelector(state => state.books.items)
  const isBooksLoading = useAppSelector(state => state.books.isLoading)

  useEffect(() => {
    dispatch(fetchBooks())
  }, [])

    // const newReader = new FileReader()
    // newReader.onloadend = () => {
    //   const newImg: any = newReader.readAsDataURL(fileRef.current[0])
    //   setReaderResult(newImg)
    //   console.log(fileRef.current[0])
    // }
  
  return (
    <div>
        <h1>Main Page</h1>
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