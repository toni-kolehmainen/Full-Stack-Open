// components
// searchbar
// tuoteryhmä
// ostokori näkymä
import { Button, Form } from 'react-bootstrap'
import { GoArrowSwitch, IoAdd, IoRemove } from '@/assets/icons/icons'
import './products.css'
import ShoppingCart from '@/components/global/ShoppingCart'
import ProductCart from '@/components/global/productcart'
import { useViewport } from '@/hooks'
import { useGetProductGroupsQuery, useGetProductsBySlugMutation, useGetProductsMutation, useGetStoreByIdMutation } from '../../services/api'
import { useContext, useEffect, useState } from 'react'
import Groups from './components/Groups'
import ProductCard from './components/ProductCard'
import { ThemeContext } from '../../redux/context/ThemeContext'
import StoreModal from './components/StoreModal'
import { StoreContext } from '../../redux/context/StoreContext'
import { useDispatch, useSelector } from 'react-redux'
import { addItem, addQuantity, deleteItem, minusQuantity } from '../../redux/reducer/cartReducer'

// swich oma componentti

// uudet tuotteet
// osta uudelleen / usein ostetut
// carousel

function ProductsField() {
  const dispatch = useDispatch()
  const { themeDark } = useContext(ThemeContext);
  const [products, setProducts] = useState([])

  const [
    getProducts,
    { isLoading: isUpdating }, 
  ] = useGetProductsMutation()
  // const [
  //   getProducts, 
  //   { isLoading: isUpdating }, 
  // ] = useGetProductsBySlugMutation()


  useEffect(() => {
    async function fetchData() {
      const response = await getProducts();
      setProducts(response.data)
    }
    fetchData();
  }, [])

  const urlToImage = (url) => {
    return url.replace("{EXTENSION}", "jpg").replace("{MODIFIERS}", "w256_h256_q75")
  }

  const handleMinusItem = (value)=>{
    const inCart = cartItems.cart.find(n => n.ean === value)
    if (inCart.amount > 1) {
      dispatch(minusQuantity(value))
    } else {
      const index = cartItems.cart.findIndex(n => n.ean === value)
      dispatch(deleteItem(index))
    }
  }

  const handleAddItem = (value)=>{
    const inCart = cartItems.cart.find(n => n.ean === value)
    if (inCart) {
      dispatch(addQuantity(value))
    } else {
      dispatch(addItem(value))
    }
  }

  const cartItems = useSelector(({ items }) => { 
    return items
  })

  return (
    <>
      <div className="row w-100 " style={{ 'zIndex': '1', 'display': 'flex', 'flexDirection': 'column', 'textAlign': 'start' }}>
        <div className='wrapper' style={{ "display": "grid" }}>
          {(!isUpdating & products.length !== 0) ? products.map(item => (
            <div className='card rounded-2 shadow-5-strong p-4 border border-1' key={item.ean} 
            style={{ "display": "grid", "height": "100%", "width": "100%", "position": "relative", minWidth:"180px", placeSelf:"center"}}>
              <div className='image' style={{ "placeSelf": "center"}}>
                <img src={urlToImage(item.imageUrl)}
                  style={{ "maxHeight": "130px", "maxWidth": "130px", "width": "130px", "height": "130px", "objectFit": "contain", "aspectRatio": "1/1", "mixBlendMode": "multiply" }} />
              </div>
              <div className='name' style={{"whiteSpace":"break-word"}}>
                {item.name}
              </div>
              <div className='text-grid' style={{ "display": "grid" }}>
                <div className='price'>
                  {item.price.$numberDecimal}
                </div>
                <div className='unit'>
                  {item.unit}
                </div>
              </div>
              <div className='comparison'>
                {item.comparisonPrice.$numberDecimal} {item.comparisonUnit}
              </div>
              <div className='buttons' style={{ "display": "flex", "justifyContent": "space-between" }}>
                <div style={{ "alignSelf": "center" }}>
                  <Button onClick={() => handleMinusItem(item.ean)} variant={themeDark ? 'light' : 'dark'} className='button-variant'><IoRemove /></Button>
                </div>
                <div style={{ "alignSelf": "center" }}>
                  {cartItems.cart.find(n => n.ean === item.ean) ? cartItems.cart.find(n => n.ean === item.ean).amount : '0'}
                  kpl
                </div>
                <div style={{ "alignSelf": "center" }}>
                  <Button  onClick={() => handleAddItem(item.ean)}variant={themeDark ? 'light' : 'dark'} className='button-variant'><IoAdd /></Button>
                </div>
              </div>
            </div>
          )) : <div>loading</div>}
        </div>
      </div>
    </>
  )
}

function Products() {
  const {storeId} = useContext(StoreContext);
  // const prisma ="#007841"
  const smarket = "#0B3B6A"
  // const sale ="#C8102E"

  const [view, setView] = useState("home")
  const [store, setStore] = useState()
  const {
    data: path,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetProductGroupsQuery()

  const [
    getStoresById, // This is the mutation trigger
    { isLoading: isUpdating }, // This is the destructured mutation result
  ] = useGetStoreByIdMutation()

  const productGroups = () => {
    setView("groups")
  }
  const handleToHome = () => {
    setView("home")
  }

  useEffect(() => {
    async function fetchData() {
      const userStore = await getStoresById({ id:storeId })
      setStore(userStore.data.data)
    }
    fetchData();
  }, [storeId])

  return (
    <>
      {/* <div className="tuotteet-palkki" style={{ 'backgroundColor': 'rgba(20, 35, 200, 0.95)' }}> */}
      <div className="tuotteet-palkki" style={{ 'backgroundColor': smarket }}>
        <div className="container-fluid">
          <div className="row align-items-center justify-content-center row-cols-1 row-cols-lg-5">
            <div className="col-6 col-lg-3 order-2">
              <div className="row align-items-center justify-content-center" style={{ 'maxHeight': '60px' }}>
                <div className="col-auto">
                  {(!isUpdating & store !== undefined) ? <div>
                    <h5 style={{ 'color': '#DEE2E6', fontSize:"1.2rem" }}>
                      {store.name}<br />
                    </h5>
                    <span style={{ 'color': '#DEE2E6' }}>{store.location.postcodeName}</span>
                  </div>
                    : <div>loading</div>}</div>
                <div className="col-2">
                  <StoreModal />
                </div>
              </div>
            </div>
            <div className=" col-3 col-lg-2  order-1 order-lg-3">
              <Button onClick={() => productGroups()}>
                Tuotteet
              </Button>
            </div>
            <div className="col-12 col-lg-4 order-5 order-lg-3 pb-2 pb-lg-0">
              <Form className="d-flex">
                <Form.Control
                  onClick={() => handleToHome()}
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
              </Form>
            </div>
            <div className=" col-3 col-lg-2 order-3">
              <Button>
                Kaupan tiedot
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="main-content" style={{ 'display': 'block', 'backgroundColor': 'transparent' }}>
        <div className="container-fluid p-0 m-0 h-100" style={{ 'display': 'flex', 'flexDirection': 'row', 'position': 'sticky', "justifyContent": "center" }}>
          {view === "home" ? <ProductsField /> : null}
          {view === "groups" ? <Groups groups={path[0].navigation} /> : null}
          {view === "info" ? <></> : null}
        </div>
      </div>
    </>
  )
}

export default Products