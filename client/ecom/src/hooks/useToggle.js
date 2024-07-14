import { useState } from 'react'
/**
 *
 * @returns
 */
const useToggle = () => {
  const [showOffcanvas, setShowOffcanvas] = useState(false)
  const closeOffcanvas = () => setShowOffcanvas(false)
  const openOffcanvas = () => setShowOffcanvas(!showOffcanvas)

  return { showOffcanvas, closeOffcanvas, openOffcanvas }
}

export default useToggle