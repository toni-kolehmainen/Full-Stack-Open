import debounce from "lodash.debounce"
import { useCallback, useEffect, useState } from "react"
import { Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom";

function Searchbar() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("")

  useEffect(()=> {
    console.log(searchText)
  }, [searchText])

  const debouncedSearch = useCallback(debounce(e =>
    setSearchText(e.target.value), 500), []
  )
  const handleClick = ()=>{
    navigate("/tuotteet")
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

export default Searchbar