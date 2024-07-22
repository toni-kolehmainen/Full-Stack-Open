import { useEffect, useState } from 'react'

// add filters for props
// const filters = props.brands.map(({ brand, checked }) =>
//         checked ? ({ brand }) : null).filter(brand => brand)

const useInfinteScroll = (mutation, slug) => {
  const [data, setData] = useState([])
  const [hasMore, setHasMore] = useState(true)
  const [skip, setSkip] = useState(0)
  const [limit, setLimit] = useState(24)
  // console.log(slug)
  const handleHasmore = (resData) => {
    if (resData.length < limit) {
      setHasMore(false)
    } else {
      setHasMore(true)
    }
  }
  useEffect(() => {
    async function fetchData() {
      const response = await mutation({ slug, params:{ skip, limit } })
      handleHasmore(response.data)
      setData(response.data)
      console.log(response.data)
      setSkip(24)
    }
    fetchData()
  }, [])

  const reFetchData = () => {
    console.log('reFetchData')
    mutation({ slug, params:{ skip, limit } }).then(
      (response) => {
        handleHasmore(response.data)
        setData((data) => [...data, ...response.data])
        setSkip((skip) => skip + 24)
      }
    )
  }
  return { data, reFetchData, hasMore }
}

export default useInfinteScroll