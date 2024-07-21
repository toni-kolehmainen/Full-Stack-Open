import { Button, Dropdown, Modal, Spinner } from 'react-bootstrap'
import '../../assets/components/shoppingcart.css'
import { IoEllipsisHorizontal } from '../../assets/icons/icons'
import { useContext, useEffect, useState } from 'react'
import { useViewport } from '../../hooks';
import basket from '../../assets/basket.png'
import { motion } from "framer-motion";
import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { GoArrowSwitch, IoAdd, IoRemove } from '@/assets/icons/icons'
import { ThemeContext } from '../../redux/context/ThemeContext';
import RendererPdf from '../input/Rendererpdf';
const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: "100%" },
}

function ShoppingModal(props) {

  return (
    <>
      <Modal show={props.show} onHide={props.close}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.close}>
            Close
          </Button>
          <Button variant="primary" onClick={props.close}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
function ShoppingCart(props) {
  const [createPdf, setCreatePdf] = useState(false)
  const { themeDark } = useContext(ThemeContext);
  const viewport = useViewport()
  const info = useSelector(state => state.items.cart)

  const getByCategories = createSelector(
    [state => state.items],
    items => items.cart.items.reduce(
      (accumulator, currentValue) => {
        accumulator[currentValue['category']] = [...accumulator[currentValue['category']] || [], currentValue]
        return accumulator
      }, {},
    )
  )
  const byCategories = useSelector(getByCategories);
  const itemsLoading = useSelector(state => state.items.loading);

  const handleClick = () => {
    setCreatePdf(true)
  }
  const handleHideLink = () => {
    setTimeout(() => {
      setCreatePdf(false)
    }, 1000)
  }

  if (viewport.width < 992) {
    return (
      <ShoppingModal show={props.show} close={props.close} />
    )
  }
  let themeName = themeDark ? 'dark' : 'light'
  return (
    <motion.div
      animate={props.show ? "open" : "closed"}
      variants={variants}
      initial={{ opacity: 0 }}
      id="slider-container" className={`container bg-${themeName} shadow-lg`}
      style={{ "width": "30%", 'alignSelf': 'end', 'backgroundColor': 'white', 'display': 'flex', 'flexDirection': 'column', 'overflowY': 'auto',  'zIndex': '2' }}
    >
      <div className='cart-title row mt-2 align-items-center'>
        <div className='cart-title col-auto' style={{ "textAlign": "start", "fontSize": 20 }}>
          {info.items.length === 0 ? 'Ostokorisi on tyhjä' : null}
          {info.items.length === 1 ? 'Ostokorissa on 1 tuote' : null}
          {info.items.length > 1 ? 'Ostokorissa on ' + info.items.length + ' tuotetta' : null}
        </div>
        <div className='cart-title-icon col' style={{ "textAlign": "end", "fontSize": 24 }}>
          {/*  */}
          <Dropdown autoClose="outside" onBlur={handleHideLink}>
            <Dropdown.Toggle variant="" id="dropdown-basic">
              <IoEllipsisHorizontal />
            </Dropdown.Toggle>
            <Dropdown.Menu >
              <Dropdown.Item key="test" onClick={handleClick}>
                Lataa ostoslista
              </Dropdown.Item>
              <Dropdown.ItemText >
                {createPdf ? <RendererPdf data={byCategories} handleHideLink={handleHideLink} /> : null}
              </Dropdown.ItemText>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      {byCategories.length === 0 ? <EmptyBasket /> : <WithItems items={byCategories} theme={themeName} />}
      <Button className='mb-2' style={{ "display": "flex", "justifyContent": "space-between" }}>
        <span style={{ "textAlign": "start" }}>Siirry eteenpäin</span>
        <span style={{ "textAlign": "end" }}>{info.total} €</span>
      </Button>
    </motion.div>
  )
}

const WithItems = (props) => {
  // console.log(Object.entries(props))

  return (
    <div className='row align-items-start' style={{ 'flex': '1', 'overflow': 'auto', "flexDirection": "row", height: "70vh", gap: "5px" }} >
      {
        Object.entries(props.items).map(([key, items]) => (
          <div key={key}>
            <div style={{"fontSize":'1.1rem'}}>{key}</div>
            {
              items.map((item) => (
                <div key={item.id.ean}>
                  <CardItem item={item} theme={props.theme} />
                </div>
              ))
            }
          </div>
        ))
      }
    </div>
  )
}

const CardItem = (props) => {
  // console.log(props.item)
  const urlToImage = (url) => {
    return url.replace("{EXTENSION}", "jpg").replace("{MODIFIERS}", "w256_h256_q75")
  }
  return (
    <div className='rounded-2 shadow-5-strong p-0 border-top' key={props.item.ean}
      style={{
        "display": "grid", "height": "100%", "width": "100%", "position": "relative", minWidth: "180px",
        gridTemplateColumns: '70px 2fr', gridAutoRows: "100px", alignItems: 'center', gap: "5px"
      }}>
      <div style={{}}>
        <img src={urlToImage(props.item.id.imageUrl)}
          style={{
            "maxHeight": "70px", "maxWidth": "70px", "width": "70px", "height": "70px",
            "objectFit": "contain", "aspectRatio": "1/1", "mixBlendMode": "multiply",
          }} />
      </div>
      <div style={{ 'display': "grid", "gridColumn": "2", "gridRow": "1", gridTemplateColumns: '1fr', gridTemplateRows: '1fr 1fr', }}>
        <div style={{ "placeSelf": "start", "fontSize": "0.9rem", "gridColumn": "1", "gridRow": "1", "textAlign": 'start' }}>
          {props.item.id.name}
        </div>
        <div style={{ 'display': "grid", "gridColumn": "1", "gridRow": "2", gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr', }}>
          <div style={{ "placeSelf": "start", "fontSize": "0.9rem", "gridColumn": "1", "gridRow": "2", "textAlign": 'start' }}>
            {props.item.id.price.$numberDecimal} €
          </div>
          <div className='buttons rounded-4 border-sm-0' style={{ 'placeSelf': 'end', "display": "flex", "justifyContent": "space-between", "gridColumn": "2", "gridRow": "2", "maxWidth": "min-content" }}>
            <div style={{ "alignSelf": "center" }}>
              <Button variant={props.theme} className='button-variant rounded-4'><IoRemove /></Button>
            </div>
            <div style={{ "alignSelf": "center", "textWrap": "nowrap" }}>
              {props.item.amount} kpl
            </div>
            <div style={{ "alignSelf": "center" }}>
              <Button variant={props.theme} className='button-variant rounded-4'><IoAdd /></Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const EmptyBasket = () => {
  return (
    <div className='row align-items-center' style={{ 'flex': '1', 'overflow': 'auto' }} >
      <div className='col'>
        <div className='row'>
          <div className='col'>
            <img src={basket} style={{ "height": "20vh", "width": "20vh", "objectFit": "contain" }} />
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            Lisää ensimmäinen tuote ostokoriin
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShoppingCart