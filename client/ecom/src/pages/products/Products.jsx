import './products.css'
import { useGetProductsMutation, useGetStoreByIdMutation } from '../../services/api'
import { useContext, useEffect, useState } from 'react'
import ProductCard from './components/ProductCard'
import StoreModal from './components/StoreModal'
import { StoreContext } from '../../redux/context/StoreContext'
import Searchbar from './components/Searchbar'
import { Outlet } from 'react-router-dom'
import useCustomBg from '../../hooks/useCustomBg'
import NavButton from './components/NavButton'
import Carousel from './components/Carousel'

// uudet tuotteet
// osta uudelleen / usein ostetut

export function ProductsField() {
  return (
    <>
      <div className="row w-100" style={{ 'zIndex': '1', 'display': 'flex', 'flexDirection': 'row', 'textAlign': 'start' }}>
        <div className="col p-0" >
          <Carousel />
        </div>
      </div>
    </>
  )
}

function Products() {
  const { storeId } = useContext(StoreContext);
  const { bgColor, handleChange } = useCustomBg([
    { brand: "s-market", bg: "#0B3B6A" },
    { brand: "sale", bg: "#C8102E" },
    { brand: "prisma", bg: "#007841" }
  ])

  const [store, setStore] = useState()
  const [
    getStoresById, // This is the mutation trigger
    { isLoading: isUpdating }, // This is the destructured mutation result
  ] = useGetStoreByIdMutation()

  useEffect(() => {
    async function fetchData() {
      const userStore = await getStoresById({ id: storeId })
      setStore(userStore.data.data)
      handleChange(userStore.data.data.brand)
    }
    fetchData();
  }, [storeId])

  return (
    <>
      <div className="tuotteet-palkki" style={{ 'backgroundColor': bgColor }}>
        <div className="container-fluid">
          <div className="row align-items-center justify-content-center row-cols-1 row-cols-lg-5">
            <div className="col-6 col-lg-3 order-2">
              <div className="row align-items-center justify-content-center" style={{ 'maxHeight': '60px' }}>
                <div className="col-auto">
                  {(!isUpdating & store !== undefined) ? <div>
                    <h5 style={{ 'color': '#DEE2E6', fontSize: "1.2rem" }}>
                      {store.name.replace(store.location.postcodeName, "")}<br />
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
              <NavButton href={"/tuotteet/tuoteryhmat"} text={"Tuotteet"} />
            </div>
            <div className="col-12 col-lg-4 order-5 order-lg-3 pb-2 pb-lg-0">
              <Searchbar />
            </div>
            <div className="col-3 col-lg-2 order-3">
              <NavButton href={"/tuotteet/info"} text={"Kaupan tiedot"} />
            </div>
          </div>
        </div>
      </div>
      <div className="main-content" style={{ 'display': 'block', 'backgroundColor': 'transparent' }}>
        <div className="container-fluid p-0 m-0 h-100" style={{ 'display': 'flex', 'flexDirection': 'row', 'position': 'sticky', "justifyContent": "center" }}>
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default Products