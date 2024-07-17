import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { nodeApi } from '../../services/api'
// import noteReducer from './reducers/noteReducer'
// import filterReducer from './reducers/filterReducer'
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