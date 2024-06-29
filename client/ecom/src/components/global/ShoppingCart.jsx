import { Button } from 'react-bootstrap'
import '../../assets/components/shoppingcart.css'
import { SlArrowLeft } from '../../assets/icons/icons'
import { useEffect, useState } from 'react'


function ShoppingCartModal() {
  return (
    <>
    </>
  )
}


function ShoppingCart() {
  // state visible/hidden
  // let visible = "visible"
  const [visible, setVisible] = useState('visible')
  // useEffect(() => {

  // }, [visible])

  let height = 0
  const test =() => {
    if (visible === 'visible') {
      setVisible('hidden')
    }
    else {
      setVisible('visible')
    }
  }

  return (
    <>
      {/* <div className="slider"> */}
      <div id="slider-container" className="container w-25" style={{ 'alignSelf': 'end', 'visibility': visible, 'backgroundColor': 'white', 'display': 'inline-flex', 'flexDirection': 'column', 'overflow': 'auto','zIndex':'2' }}>
        {/* <div id="slider-container" className="container w-25" style={{"position":"sticky","alignSelf": "end", "visibility": "visible", "backgroundColor": "white", "display": "inline-flex", "flexDirection": "column", "overflow": "auto","zIndex":"2"}}> */}

        <div className='col  d-flex justify-content-start align-items-start' >
          <Button onClick={() => test()}>
            <SlArrowLeft/>
          </Button>
        </div>
        <div style={{ 'flex': '1', 'overflow': 'auto' }}>
          test
        </div>
      </div>
      {/* </div> */}
    </>
  )
}

export default ShoppingCart