import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThemeContext } from "../../../redux/context/ThemeContext";
import { Button } from "react-bootstrap";
import { GoArrowSwitch, IoAdd, IoRemove } from '@/assets/icons/icons'
import { addItem, addQuantity, deleteItem, minusQuantity } from "../../../redux/reducer/cartReducer";

function ProductCard(props) {
  const dispatch = useDispatch()
  const { themeDark } = useContext(ThemeContext);

  const urlToImage = (url) => {
    return url.replace("{EXTENSION}", "jpg").replace("{MODIFIERS}", "w256_h256_q75")
  }

  const handleMinusItem = (value) => {
    const inCart = cartItems.cart.find(n => n.ean === value)
    if (inCart.amount > 1) {
      dispatch(minusQuantity(value))
    } else {
      const index = cartItems.cart.findIndex(n => n.ean === value)
      dispatch(deleteItem(index))
    }
  }

  const handleAddItem = (value) => {
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
    <div className='card rounded-2 shadow-5-strong p-4 border border-1' key={props.item.ean}
      style={{ "display": "grid", "height": "100%", "width": "100%", "position": "relative", minWidth: "180px", placeSelf: "center" }}>
      <div className='image' style={{ "placeSelf": "center" }}>
        <img src={urlToImage(props.item.imageUrl)}
          style={{ "maxHeight": "130px", "maxWidth": "130px", "width": "130px", "height": "130px", "objectFit": "contain", "aspectRatio": "1/1", "mixBlendMode": "multiply" }} />
      </div>
      <div className='name' style={{ "whiteSpace": "break-word" }}>
        {props.item.name}
      </div>
      <div className='text-grid' style={{ "display": "grid" }}>
        <div className='price'>
          {props.item.price.$numberDecimal}
        </div>
        <div className='unit'>
          {props.item.unit}
        </div>
      </div>
      <div className='comparison'>
        {props.item.comparisonPrice.$numberDecimal} {props.item.comparisonUnit}
      </div>
      <div className='buttons' style={{ "display": "flex", "justifyContent": "space-between" }}>
        <div style={{ "alignSelf": "center" }}>
          <Button onClick={() => handleMinusItem(props.item.ean)} variant={themeDark ? 'dark' : 'light'} className='button-variant'><IoRemove /></Button>
        </div>
        <div style={{ "alignSelf": "center" }}>
          {cartItems.cart.find(n => n.ean === props.item.ean) ? cartItems.cart.find(n => n.ean === props.item.ean).amount : '0'}
          kpl
        </div>
        <div style={{ "alignSelf": "center" }}>
          <Button onClick={() => handleAddItem(props.item.ean)} variant={themeDark ? 'dark' : 'light'} className='button-variant'><IoAdd /></Button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard