import { Button, Modal } from 'react-bootstrap'
import '../../assets/components/shoppingcart.css'
import { SlArrowLeft } from '../../assets/icons/icons'
import { useEffect, useState } from 'react'
import { useViewport } from '../../hooks';

function ShoppingModal(props) {

  // console.log(props.show)
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
    <>
      <div id="slider-container" className="container w-25"
        style={{ 'alignSelf': 'end', 'visibility': (props.show) ? 'visible' : 'hidden', 'backgroundColor': 'white', 'display': 'inline-flex', 'flexDirection': 'column', 'overflow': 'auto', 'zIndex': '2' }}>
        <div className='col  d-flex justify-content-start align-items-start' >

        </div>
        <div style={{ 'flex': '1', 'overflow': 'auto' }}>
          test
        </div>
      </div>
    </>
  )
}

export default ShoppingCart