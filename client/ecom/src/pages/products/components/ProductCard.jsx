import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThemeContext } from "../../../redux/context/ThemeContext";
import { Button, Spinner } from "react-bootstrap";
import { GoArrowSwitch, IoAdd, IoRemove } from '@/assets/icons/icons'
import { addItem, addQuantity, deleteItem, fetchUserCart, minusQuantity } from "../../../redux/reducer/cartReducer";
import { motion } from "framer-motion";

function ProductCard(props) {
  const dispatch = useDispatch()
  const { themeDark } = useContext(ThemeContext);

  const urlToImage = (url) => {
    return url.replace("{EXTENSION}", "jpg").replace("{MODIFIERS}", "w256_h256_q75")
  }

  const handleMinusItem = (value) => {
    const inCart = cartItems.cart.items.find(n => n.ean === value)
    if (inCart.amount > 1) {
      dispatch(minusQuantity(value))
    } else {
      const index = cartItems.cart.items.findIndex(n => n.ean === value)
      dispatch(deleteItem(index))
    }
  }

  const handleAddItem = (value) => {
    const inCart = cartItems.cart.items.find(n => n.ean === value)
    if (inCart) {
      dispatch(addQuantity(value))
    } else {
      dispatch(addItem(value))
    }
  }

  const cartItems = useSelector(({ items }) => {
    return items
  })
  const itemsLoading = useSelector(state => state.items.loading);
  let bg = cartItems.cart.items.find(n => n.id.ean === props.item.ean) ? '#32BF6F28' : '#f8f9fa'
  
  return (
    <motion.div
      whileHover={{ scale: 1.01, y: -3, boxShadow: '0 1.2rem 1.6rem rgba(0, 0, 0, 0.125)' }}
    >
      <div className='card rounded-2 p-4 border' key={props.item.ean}
        style={{ "display": "grid", "height": "100%", "width": "100%", "position": "relative", minWidth: "180px", placeSelf: "center", backgroundColor:bg }}>
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
            {itemsLoading ? <Spinner /> :
              cartItems.cart.items.find(n => n.id.ean === props.item.ean) ? cartItems.cart.items.find(n => n.id.ean === props.item.ean).amount : '0'}
            kpl
          </div>
          <div style={{ "alignSelf": "center" }}>
            <Button onClick={() => handleAddItem(props.item.ean)} variant={themeDark ? 'dark' : 'light'} className='button-variant'><IoAdd /></Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ProductCard