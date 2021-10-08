import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getBooksAttributesReq } from "../api/getBooksAttributesReq"
import { getBooksReq } from "../api/getBooksReq"

export interface Books {
  items: Array<any>,
  isLoading: boolean,
  order: string,
  sortBy: string,
  filterBy: string,
  from: number | string,
  to: number | string,
  filterValue: string,
  page: number
}

const initialState: Books = {
  items: [],
  isLoading: false,
  order: 'asc',
  sortBy: 'createdAt',
  filterBy: '',
  from: '',
  to: '',
  filterValue: '',
  page: 1
}

export const fetchBooks = createAsyncThunk(
  'books/fetchStatus',
  async (_, api) => {
    let state: any = api.getState()
    const res = await getBooksReq(state.books.sortBy, state.books.order, state.books.filterBy, state.books.from, state.books.to, state.books.filterValue)
    console.log(res)
    return res.data
  }
)

export const fetchBooksAttributesReq = createAsyncThunk(
  'books/fetchAttrStatus',
  async () => {
    const res = await getBooksAttributesReq()
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
    },
    setBookSearch: (state, action: any) => {
      state.filterBy = action.payload.filterBy
      state.filterValue = action.payload.filterValue
      state.from = action.payload.from
      state.to = action.payload.to
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

export const { changeOrder, changeSort, setBookSearch } = bookSlice.actions
export default bookSlice.reducer