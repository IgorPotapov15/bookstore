import { useEffect } from "react"
import { useHistory } from "react-router-dom"
import { deleteBookReq } from "../api/deleteBookReq"
import { useAppSelector, useAppDispatch } from "../redux/hooks"
import { fetchUser } from "../redux/userSlice"


const BookCard = ({item}: any) => {
  const dispatch = useAppDispatch()
  const booksList = useAppSelector(state => state.books.items)

  const history = useHistory()
  useEffect(() => {
    dispatch(fetchUser())
  }, [])
  const role = useAppSelector(state => state.user.role)

  const handleDelete = async () => {
    const res = await deleteBookReq(item.id)
    if (res.status === 204) {
      history.push('/')
    }
  }
 
  return (
    <div>
      <img src={item.img}/>
      { item.img2 !== null ? 
        <img src={item.img2}/> :
        ''
      }      
      <h2>{item.name}</h2>
      <p>{item.description}</p>
      {role === 'Admin' ? 
        <button
          onClick={handleDelete}
        >Delete this book</button> :
        ''
      }
    </div>
  )
}

export default BookCard