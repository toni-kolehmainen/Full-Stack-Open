import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// find by ean add count
// cart from {ean, amount}

export const fetchUserCart = createAsyncThunk(
  'cart/fetchUserCart',
  async (userId, thunkAPI) => {
    console.log("userid", userId)
    const response = await fetch(`http://localhost:3001/usercart?id=${userId}`)
    // return response.data
    return response.json()
  }
)

export const addItemFetch = createAsyncThunk(
  'cart/addtocart',
  async (id, thunkAPI) => {
    const response = await fetch(`http://localhost:3001/addtocart?id=${id.userId}&product=${id.productId}`)
    return response.json()
  }
)

export const deleteItemFetch = createAsyncThunk(
  'cart/deleteformcart',
  async (id, thunkAPI) => {
    const response = await fetch(`http://localhost:3001/deleteformcart?id=${id.userId}&product=${id.productId}`)
    return response.json()
  }
)

export const addQuantityFetch = createAsyncThunk(
  'cart/addquantity',
  async (id, thunkAPI) => {
    const response = await fetch(`http://localhost:3001/addquantity?id=${id.userId}&product=${id.productId}`)
    return response.json()
  }
)

export const minusQuantityFetch = createAsyncThunk(
  'cart/minusquantity',
  async (id, thunkAPI) => {
    const response = await fetch(`http://localhost:3001/minusquantity?id=${id.userId}&product=${id.productId}&amount=${id.amount}`)
    return response.json()
  }
)
const countTotal = (items) => {
  let total = 0.0
  console.log(items)
  items.map(({ id, amount }) => {
    total += parseFloat(id.price.$numberDecimal) * amount
  })
  return Math.round( total *100) /100
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    loading: false,
    cart: { total: 0, items: [] },
  },
  reducers: (create) => ({
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

    builder.addCase(addItemFetch.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(addItemFetch.fulfilled, (state, action) => {
      // Add items
      state.cart.items.push(action.payload)
      state.cart.total = countTotal(state.cart.items)
      state.loading = false
    })
    builder.addCase(deleteItemFetch.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(deleteItemFetch.fulfilled, (state, action) => {
      state.cart.items = state.cart.items.filter(n => {return  n.id.id !== action.payload.id})
      state.cart.total = countTotal(state.cart.items)
      state.loading = false
    })
    builder.addCase(addQuantityFetch.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(addQuantityFetch.fulfilled, (state, action) => {
      const newItems = state.cart.items.map(item =>
        item.id.id !== action.payload.id.id ? item : action.payload
      )
      state.cart.items = newItems
      state.cart.total = countTotal(state.cart.items)
      state.loading = false
    })

    builder.addCase(minusQuantityFetch.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(minusQuantityFetch.fulfilled, (state, action) => {
      const newItems = state.cart.items.map(item =>
        item.id.id !== action.payload.id.id ? item : action.payload
      )
      state.cart.items = newItems
      state.cart.total = countTotal(state.cart.items)
      state.loading = false
    })
  },
})

export const { addItem, deleteItem, fetchItems, addQuantity, minusQuantity } = cartSlice.actions
export default cartSlice.reducer