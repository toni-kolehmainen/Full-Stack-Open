import { createSlice } from '@reduxjs/toolkit'

// find by ean add count
// cart from {ean, amount}
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    loading: false,
    cart: [],
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
    // fetchItems: create.asyncThunk(
    //   async (id, thunkApi) => {
    //     const res = await fetch(`myApi/todos?id=${id}`)
    //     return await res.json()
    //   },
    //   {
    //     pending: (state) => {
    //       state.loading = true
    //     },
    //     rejected: (state, action) => {
    //       state.loading = false
    //     },
    //     fulfilled: (state, action) => {
    //       state.loading = false
    //       state.cart.push(action.payload)
    //     },
    //   }
    // ),
  }),
})

export const { addItem, deleteItem, fetchItems, addQuantity, minusQuantity } = cartSlice.actions
export default cartSlice.reducer