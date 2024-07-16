import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { nodeApi } from '../../services/api'
// import noteReducer from './reducers/noteReducer'
// import filterReducer from './reducers/filterReducer'



const store = configureStore({
  reducer: {
    [nodeApi.reducerPath]: nodeApi.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(nodeApi.middleware)
})

export default store