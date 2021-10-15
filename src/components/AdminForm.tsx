import { useState, useRef } from "react";
import { postBookReq } from "../api/postBookReq";

const AdminForm = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [genre, setGenre] = useState('')
  const [author, setAuthor] = useState('')
  const [price, setPrice] = useState(0)
  const [rating, setRating] = useState(0)

  const fileRef = useRef<any>(null)
  const fileRef2 = useRef<any>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: any) => {
    e.preventDefault()

    const fetchData = async (uint8Array: any, uint8Array2: any) => {
      try {
        const res = await postBookReq(uint8Array, uint8Array2, name, description, genre, author, rating, price)
        console.log(name, description, genre, author)
        setLoading(false)
      } catch (error) {
        console.error(error)
      }
    }

    if (!fileRef.current) return void null

    const reader = new FileReader()
    reader.onloadend = () => {
      const uint8Array = new Uint8Array(reader.result as any)
      setLoading(true)
      // fetchData(uint8Array, uint8Array2)
      if (fileRef2.current) {
        nextImage(uint8Array)
      } else if (!fileRef2.current) {
        fetchData(uint8Array, '')
      }
    }
    reader.readAsArrayBuffer(fileRef.current[0])
    const nextImage = (uint8Array: any) => {
      const reader2 = new FileReader()
      reader2.onloadend = () => {
        const uint8Array2 = new Uint8Array(reader2.result as any)
        fetchData(uint8Array, uint8Array2)
      }
      reader2.readAsArrayBuffer(fileRef2.current[0])
    }
  }

  const handleChange = (e: any) => {
    if (e.currentTarget.name === 'name') {
      setName(e.currentTarget.value)
    }
    if (e.currentTarget.name === 'description') {
      setDescription(e.currentTarget.value)
    }
    if (e.currentTarget.name === 'genre') {
      setGenre(e.currentTarget.value)
    }
    if (e.currentTarget.name === 'author') {
      setAuthor(e.currentTarget.value)
    }
    if (e.currentTarget.name === 'rating') {
      setRating(e.currentTarget.value)
    }
    if (e.currentTarget.name === 'price') {
      setPrice(e.currentTarget.value)
    }
  }

  return(
    <form onSubmit={handleSubmit}>
          <div>
            name
            <input 
              type="text" 
              name="name" 
              onChange={handleChange} 
              value={name}
              required
            />
            description
            <input 
              type="text" 
              name="description" 
              onChange={handleChange} 
              value={description}
              required
            />
            genre
            <select name="genre" required onChange={handleChange} value={genre}>
              <option value=""></option>
              <option value="Classics">Classics</option>
              <option value="Detective">Detective</option>
              <option value="Fantasy">Fantasy</option>
              <option value="Horror">Horror</option>
              <option value="Science">Science</option>
            </select>
            author
            <input 
              type="text" 
              name="author" 
              onChange={handleChange} 
              value={author}
              required
            />
            rating
            <input 
              type="number"
              name="rating"
              min="0.1"
              step="0.01"
              onChange={handleChange} 
              value={rating}
              required
            />
            price
            <input 
              type="number" 
              name="price"
              min="1"
              step="0.01"
              onChange={handleChange} 
              value={price}
              required
            />
            cover
            <input
              onChange={e => fileRef.current = e.target.files}
              accept="image/*"
              type="file"
              id="button-file"
              required
            />
            <input
              onChange={e => fileRef2.current = e.target.files}
              accept="image/*"
              type="file"
              id="button-file2"
            />
          </div>
          <button type="submit">{loading ? 'Сохраняю...' : 'Сохранить'}</button>
        </form>
  )
}

export default AdminForm