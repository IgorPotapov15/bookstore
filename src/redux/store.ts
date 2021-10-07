import { configureStore } from "@reduxjs/toolkit"
import user from './userSlice'
import books from './booksSlice'

export const store =  configureStore({
  reducer: {
    user: user,
    books: books
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch