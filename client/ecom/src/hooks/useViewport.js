import { useEffect, useState } from 'react'
/**
 *
 * @returns
 */
const useViewport = () => {
  const [width, setWidth] = useState(window.innerWidth)
  useEffect(() => {
    const handleWindowResize = () => {
      setWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleWindowResize)
    return () => window.removeEventListener('resize', handleWindowResize)
  }, [])

  return { width }
}

export default useViewport