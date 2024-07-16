import { Button, Dropdown, Form, Modal, Row } from "react-bootstrap"
import { useCanvas } from "@/hooks"
import { GoArrowSwitch } from '@/assets/icons/icons'
import { forwardRef, useCallback, useEffect, useMemo, useState } from "react"
import { useGetStoresMutation } from "../../../services/api"
import InfiniteScroll from 'react-infinite-scroll-component'
// import debouce from "lodash.debounce";
import debounce from "lodash.debounce";
import Scroll from "./Scroll"


const CheckDropdownItem = forwardRef(
  ({ children, id, checked, onChange }, ref) => {
    return (
      <Form.Group ref={ref} className="dropdown-item mb-0" controlId={id}>
        <Form.Check
          type="checkbox"
          label={children}
          checked={checked}
          onChange={onChange && onChange.bind(onChange, id)}
        />
      </Form.Group>
    );
  }
);

function StoreModal() {
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;

  const modal = useCanvas()
  const [searchText, setSearchText] = useState("")
  const [brands, setBrands] = useState([
    { id: 1, label: "Prisma", checked: true, brand: "prisma" },
    { id: 2, label: "Sale", checked: true, brand: "sale" },
    { id: 3, label: "S-market", checked: true, brand: "s-market" }])

  const debouncedSearch = useCallback(debounce(e =>
    setSearchText(e.target.value), 500), []
  )

  const handleChecked = (key) => {
    const brand = brands.find(i => i.id === key)
    const changedBrand = { ...brand, checked: !brand.checked }
    const changedBrands = brands.map(brand => brand.id !== key ? brand : changedBrand)
    setBrands(changedBrands)
  }
  return (
    <>
      <Button onClick={modal.openOffcanvas} id="button-swich" style={{ 'backgroundColor': '#00000000', 'borderColor': '#0d6efd60' }}>
        <GoArrowSwitch />
      </Button>
      <Modal className="overflow-hidden" size="lg" show={modal.showOffcanvas} onHide={modal.closeOffcanvas} centered>
        <Modal.Header closeButton>
          <Modal.Title>Valitse kauppa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Form>
              <Form.Group as={Row} >
                <div className="col-8">
                  <Form.Control type="search" placeholder="Search" onChange={debouncedSearch} />
                </div>
                <div className="col-4">
                  <Dropdown >
                    <Dropdown.Toggle variant="" id="dropdown-basic">
                      Valitut kauppaketjut
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {brands.map((brand) => (
                        <Dropdown.Item key={brand.id} id={brand.id} checked={brand.checked} as={CheckDropdownItem} onChange={handleChecked}>
                          {brand.label}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </Form.Group>
              <Form.Group as={Row} >
                <div className="col-12">
                  <Form.Check
                    type='checkbox'
                    id='checkbox'
                    label='Näytä sinua läheltä'
                  />
                </div>
              </Form.Group>
            </Form>
          </div>
          {/* <div id="scrollableDiv" style={{ "overflowY": "auto", "display": "flex", "flexDirection": "column", "flex": "1", "maxHeight": "70vh", "scrollbarColor": "#495057 #bada5500" }}> */}
            <Scroll brands={brands} searchText={searchText}/>
            {/* <div style={{ "display": "flex", "flexDirection": "column" }}>
              <div>
                Haulla löytyi:
              </div>
              <InfiniteScroll
                dataLength={data.length}
                next={reFetchData}
                height="70vh"
                hasMore={true}
                loader={<p>Loading...</p>}
                endMessage={<p>No more data to load.</p>}
              >
                    {
                      (!isUpdating & data !== undefined) ?

                        data.map((store) => (
                          <div key={store.id} className="bg-transparent rounded-2 shadow-5-strong p-4 border border-1" style={{ "display": "grid" }}>
                            <div className="modal-title">
                              {store.name}
                            </div>
                            <div className="row">
                              <div className="col-9">
                                <div className="row row-cols-auto">
                                  <div className="col">
                                    {store.weeklyOpeningHours[0].dates ? store.weeklyOpeningHours[0].dates[0].open + "-" + store.weeklyOpeningHours[0].dates[0].close : null}
                                  </div>
                                  <div className="col">
                                    {store.location[0].postcodeName}
                                  </div>
                                  <div className="col">
                                    <a className="link-primary" href={store.slug}>Tarkista aukioloajat</a>
                                  </div>
                                </div>
                              </div>
                              <div className="col-3">
                                <Button variant="outline-primary">Valitse kauppa</Button>
                              </div>
                            </div>
                          </div>

                        )) : null
                    } */}
                  {/* </div>
                </div> */}
              {/* </InfiniteScroll> */}
            {/* </div> */}
            {/* </div> */}
        </Modal.Body>
      </Modal>
    </>
  )
}

export default StoreModal