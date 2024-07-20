import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// find by ean add count
// cart from {ean, amount}

export const fetchUserCart = createAsyncThunk(
  'cart/fetchUserCart',
  async (userId, thunkAPI) => {
    console.log("userid",userId)
    const response = await fetch(`http://localhost:3001/usercart?id=${userId}`)
    // return response.data
    return response.json()
  }
)

export const updateUserCart = createAsyncThunk(
  'cart/updateUserCart',
  async (userId, thunkAPI) => {
    const response = await fetch(`http://localhost:3001/usercart?id=${userId}`)
    return response.json()
  }
)

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    loading: false,
    cart: {total:0, items:[]},
  },
  reducers: (create) => ({
    deleteItem: create.reducer((state, action) => {
      state.cart.splice(action.payload, 1)
    }),
    addItem: create.reducer(
      (state, action) => {
        const newItem = {"ean" :action.payload, "amount":1}
        state.cart.push(newItem)
      }
    ),
    addQuantity: create.reducer(
      (state, action) => {
        const itemToChange = state.cart.find(n => n.ean === action.payload)
        const changedItem = { 
          ...itemToChange, 
          amount: itemToChange.amount + 1
        }
        const newCart = state.cart.map(item =>
          item.ean !== action.payload ? item : changedItem 
        )
        return {...state, cart:newCart}
      }
    ),
    minusQuantity: create.reducer(
      (state, action) => {
        const itemToChange = state.cart.find(n => n.ean === action.payload)
        const changedItem = { 
          ...itemToChange, 
          amount: itemToChange.amount - 1
        }
        const newCart = state.cart.map(item =>
          item.ean !== action.payload ? item : changedItem 
        )
        return {...state, cart:newCart}
      }
    ),
  }),
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchUserCart.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(fetchUserCart.fulfilled, (state, action) => {
      // Add items
      state.cart = action.payload
      state.loading = false
    })
    
  },
})

export const { addItem, deleteItem, fetchItems, addQuantity, minusQuantity } = cartSlice.actions
export default cartSlice.reducer