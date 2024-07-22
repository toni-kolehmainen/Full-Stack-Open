import debounce from 'lodash.debounce'
import { useCallback, useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { createSearchParams, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

function Searchbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    if (('/tuotteet/tuotehaku'.includes(location.pathname))) {
      console.log(searchText)
      if (searchText.length === 0) {
        navigate('/tuotteet')
      } else {
        navigate({
          pathname: '/tuotteet/tuotehaku',
          search: `?${createSearchParams({
            haku: searchText
          })}`
        })
      }
    }
  }, [])

  const debouncedSearch = useCallback(debounce(e =>
    setSearchText(e.target.value), 500), []
  )

  const handleClick = () => {
    if (!('/tuotteet/tuotehaku'.includes(location.pathname))) {
      navigate('/tuotteet')
    }
  }

  return (
    <>
      <Form className="d-flex">
        <Form.Control
          onClick={handleClick}
          onChange={debouncedSearch}
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
        />
      </Form>
    </>
  )
}
export function SearchResult() {
  const [searchParams] = useSearchParams()
  let queryParamHaku = searchParams.get('haku')
  return (
    <>
      Haku : {queryParamHaku}
    </>
  )
}

export default Searchbar