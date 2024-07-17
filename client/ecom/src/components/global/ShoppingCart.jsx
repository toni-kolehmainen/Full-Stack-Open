import { Button, Dropdown, Modal } from 'react-bootstrap'
import '../../assets/components/shoppingcart.css'
import { IoEllipsisHorizontal } from '../../assets/icons/icons'
import { useEffect, useState } from 'react'
import { useViewport } from '../../hooks';
import basket from '../../assets/basket.png'
import { motion } from "framer-motion";

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
  const viewport = useViewport()

  if (viewport.width < 992) {
    return (
      <ShoppingModal show={props.show} close={props.close} />
    )
  }
  return (
    <motion.div
      animate={props.show ? "open" : "closed"}
      variants={variants}
      id="slider-container" className="container w-25 bg-dark shadow-lg"
      style={{ 'alignSelf': 'end', 'backgroundColor': 'white', 'display': 'inline-flex', 'flexDirection': 'column', 'overflow': 'auto', 'zIndex': '2' }}
    >
      <div className='cart-title row mt-2 align-items-center'>
        <div className='cart-title col-auto' style={{ "textAlign": "start", "fontSize": 20 }}>
          Ostokorisi on tyhjä
        </div>
        <div className='cart-title-icon col' style={{ "textAlign": "end", "fontSize": 24 }}>
          <Dropdown >
            <Dropdown.Toggle variant="" id="dropdown-basic">
              <IoEllipsisHorizontal />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item key="test">
                test
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
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
      <Button className='mb-2'>Siirry eteenpäin</Button>
    </motion.div>
  )
}

export default ShoppingCart