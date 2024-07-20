import { configureStore } from '@reduxjs/toolkit'
import { nodeApi } from '../../services/api'
import cartReducer from '../reducer/cartReducer'

const store = configureStore({
  reducer: {
    items:cartReducer,
    [nodeApi.reducerPath]: nodeApi.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(nodeApi.middleware)
})

export default store