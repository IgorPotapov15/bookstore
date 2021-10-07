import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getBooksReq } from "../api/getBooksReq"

export interface Books {
  items: Array<any>,
  isLoading: boolean,
  order: string,
  sortBy: string
}

const initialState: Books = {
  items: [],
  isLoading: false,
  order: 'asc',
  sortBy: 'createdAt'
}

export const fetchBooks = createAsyncThunk(
  'books/fetchStatus',
  async (_, api) => {
    let state: any = api.getState()
    const res = await getBooksReq(state.books.sortBy, state.books.order)
    return res.data
  }
)

export const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    changeOrder: (state, action) => {
      state.order = action.payload
    },
    changeSort: (state, action) => {
      state.sortBy = action.payload
    }
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

export const { changeOrder, changeSort } = bookSlice.actions
export default bookSlice.reducer