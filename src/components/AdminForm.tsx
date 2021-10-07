import { useState, useRef } from "react";
import { postBookReq } from "../api/postBookReq";

const AdminForm = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [genre, setGenre] = useState('')
  const [author, setAuthor] = useState('')
  const [image, setImage]: any = useState('')
  const [image2, setImage2]: any = useState('')

  const fileRef = useRef<any>(null)
  const fileRef2 = useRef<any>(null)
  const [ loading, setLoading ] = useState(false)

  const handleSubmit = (e: any) => {
    e.preventDefault()

    const fetchData = async (uint8Array: any, uint8Array2: any) => {
      try {
        const res = await postBookReq(uint8Array, uint8Array2, name, description, genre, author)
        console.log(name, description, genre, author)
        setLoading(false)
      } catch (error) {
        console.error(error)
      }
    }

    if (!fileRef.current || !fileRef2.current) return void null

    const reader = new FileReader()
    reader.onloadend = () => {
      const uint8Array = new Uint8Array(reader.result as any)
      setLoading(true)
      // fetchData(uint8Array, uint8Array2)
      nextImage(uint8Array)
    }
    reader.readAsArrayBuffer(fileRef.current[0])
    const nextImage = (uint8Array: any) => {
      const reader2 = new FileReader()
      reader2.onloadend = () => {
        const uint8Array2 = new Uint8Array(reader2.result as any)
        fetchData(uint8Array, uint8Array2)
        console.log(uint8Array, uint8Array2)
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
            <select name="genre" required onChange={handleChange}>
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
            cover
            <input
              onChange={e => fileRef.current = e.target.files}
              accept="image/*"
              type="file"
              id="button-file"
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