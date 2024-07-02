// components
// searchbar
// tuoteryhmä
// ostokori näkymä
import { Button, Form } from 'react-bootstrap'
import { GoArrowSwitch } from '@/assets/icons/icons'
import './products.css'
import ShoppingCart from '@/components/global/ShoppingCart'
import ProductCart from '@/components/global/productcart'
import { useViewport } from '@/hooks'
import { useGetProductGroupsQuery } from '../../services/api'
import { useState } from 'react'
import Groups from './components/Groups'
// swich oma componentti
// Kauppa Tyyppi oma componentti
//
// Tuoteryhmät oma componentti
// https://cfapi.voikukka.fi/graphql?operationName=RemoteNavigation&variables=%7B%22id%22%3A%22603116906%22%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%22707a9c68de67bcde9992a5d135e696c61d48abe1a9c765ca73ecf07bd80c513f%22%7D%7D
// search oma componentti

// eritellä toiminnot

function Products() {
  const viewport = useViewport()
  const [view, setView] = useState("home")
  // const [
  //   getProductGroups, 
  //   { isLoading: isUpdating }, 
  // ] = useGetProductGroupsQuery()
  const {
    data: path,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetProductGroupsQuery()
  // const {
  //   data: posts,
  //   isLoading,
  //   isSuccess,
  //   isError,
  //   error
  // } = useGetPostsQuery()
  const productGroups = () => {
    console.log("productGroups")
    console.log(path[0].navigation)
    setView("groups")

  }
  return (
    <>
      <div className="tuotteet-palkki" style={{ 'backgroundColor': 'rgba(20, 35, 200, 0.95)' }}>
        <div className="container-fluid">
          <div className="row align-items-center justify-content-center row-cols-1 row-cols-lg-5">
            <div className="col-4 col-lg-3 order-2">
              <div className="row align-items-center" style={{ 'maxHeight': '60px' }}>
                <div className="col-10">
                  <div>
                    <h4 style={{ 'color': '#DEE2E6' }}>
                      Kauppa Tyyppi<br />
                    </h4>
                    <span style={{ 'color': '#DEE2E6' }}>Sijainti</span>
                  </div>
                </div>
                <div className="col-2">
                  <Button id="button-swich" style={{ 'backgroundColor': '#00000000', 'borderColor': '#0d6efd60' }}>
                    <GoArrowSwitch />
                  </Button>
                </div>
              </div>
            </div>
            <div className=" col-4 col-lg-2  order-1 order-lg-3">
              <Button onClick={() => productGroups()}>
                Tuoteryhmät
              </Button>
            </div>
            <div className="col-12 col-lg-4 order-5 order-lg-3 pb-2 pb-lg-0">
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
              </Form>
            </div>
            <div className=" col-4 col-lg-2 order-3">
              <Button>
                Kaupan tiedot
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="main-content" style={{ 'display': 'block', 'backgroundColor': 'transparent' }}>
        <div className="container-fluid p-0 m-0 h-100" style={{ 'display': 'flex', 'flexDirection': 'row', 'position': 'sticky' }}>
          {view === "home" ? <ProductCart /> : null}
          {view === "groups" ? <Groups groups={path[0].navigation} /> : null}
          {(viewport.width > 992 && ['home'].includes(view)) ? <ShoppingCart /> : null}
        </div>
      </div>
    </>
  )
}

export default Products