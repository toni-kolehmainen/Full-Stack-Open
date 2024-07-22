import { Button } from 'react-bootstrap'
import { useState } from 'react'

function NavButton(props) {
  const [bgColor, setBgColor] = useState('#d3d4d500')
  const onHover = () => {
    setBgColor('#42464960')
  }
  const onHoverEnd = () => {
    setBgColor('#d3d4d500')
  }
  return (
    <Button
      onMouseEnter={onHover}
      onMouseLeave={onHoverEnd}
      href={props.href}
      variant='transparent'
      style={{ 'color': '#dee2e6', backgroundColor: bgColor }}
    >
      {props.text}
    </Button>
  )
}

export default NavButton