import { useState } from 'react'
/**
 *
 * @returns
 */
const useCustomBg = (props) => {
  const [bgColor, setBgColor] = useState("")

  const handleChange = (option) => {
    const color = props.find(n => n.brand === option).bg || "transparent"
    setBgColor(color)
  }

  return { bgColor, handleChange }
}

export default useCustomBg