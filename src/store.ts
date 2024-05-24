import { configureStore } from '@reduxjs/toolkit'
import socketReducer from './features/socketSlice'
import renderEditorReducer from './features/renderEditorSlice'

export const store = configureStore({
  reducer: {
    socket: socketReducer,
    editor: renderEditorReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch