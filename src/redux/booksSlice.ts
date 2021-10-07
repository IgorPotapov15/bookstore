import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getBooksReq } from "../api/getBooksReq"

export interface Books {
  items: Array<any>,
  isLoading: boolean
}

const initialState: Books = {
  items: [],
  isLoading: false
}

export const fetchBooks = createAsyncThunk(
  'books/fetchStatus',
  async () => {
    const res = await getBooksReq()
    return res.data
  }
)

export const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(fetchBooks.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(fetchBooks.fulfilled, (state, action) => {
      const tempArr:any = action.payload
      tempArr.forEach((item: any) => {
        item.img = "data:image/png;base64," + item.img
        item.img2 = item.img2 === null ? null : "data:image/png;base64," + item.img2
      })
      state.items = tempArr
      state.isLoading = false
    })
  }
})

export const {  } = bookSlice.actions
export default bookSlice.reducer