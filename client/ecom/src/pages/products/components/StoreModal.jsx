import { Button, Dropdown, Form, Modal, Row } from 'react-bootstrap'
import { useCanvas } from '@/hooks'
import { GoArrowSwitch } from '@/assets/icons/icons'
import { forwardRef, useCallback, useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import debounce from 'lodash.debounce'
import Scroll from './Scroll'

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
    )
  }
)
CheckDropdownItem.displayName = 'drodownItem'

function StoreModal() {
  const current = new Date()
  const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`
  const [isHovered, setHovered] = useState(false)
  const modal = useCanvas()
  const [searchText, setSearchText] = useState('')
  const [brands, setBrands] = useState([
    { id: 1, label: 'Prisma', checked: true, brand: 'prisma' },
    { id: 2, label: 'Sale', checked: true, brand: 'sale' },
    { id: 3, label: 'S-market', checked: true, brand: 's-market' }])

  const handleSearch = useCallback(debounce(e => {
    setSearchText(e.target.value)
  }
  , 500), []
  )

  const handleChecked = (key) => {
    const brand = brands.find(i => i.id === key)
    const changedBrand = { ...brand, checked: !brand.checked }
    const changedBrands = brands.map(brand => brand.id !== key ? brand : changedBrand)
    setBrands(changedBrands)
  }
  return (
    <>
      <Button onClick={modal.openOffcanvas}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        id="button-swich" style={{ 'backgroundColor': '#00000000', 'borderColor': '#0d6efd60' }}>
        <motion.div
          initial={false}
          animate={{ transform: isHovered ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
        >
          <GoArrowSwitch />
        </motion.div>
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
                  <Form.Control type="search" placeholder="Search" onChange={handleSearch} />
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
          <Scroll brands={brands} searchText={searchText} />
        </Modal.Body>
      </Modal>
    </>
  )
}

export default StoreModal