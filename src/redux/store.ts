import { configureStore } from "@reduxjs/toolkit"
import user from './userSlice'
import books from './booksSlice'

export const store =  configureStore({
  reducer: {
    user: user,
    books: books
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ['books.authors', 'books.genres'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch