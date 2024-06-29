import { useState } from 'react'
/**
 *
 * @returns
 */
const useCanvas = () => {
  const [showOffcanvas, setShowOffcanvas] = useState(false)
  const closeOffcanvas = () => setShowOffcanvas(false)
  const openOffcanvas = () => setShowOffcanvas(true)

  return { showOffcanvas, closeOffcanvas, openOffcanvas }
}

export default useCanvas