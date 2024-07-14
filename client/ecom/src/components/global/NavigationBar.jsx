import { useContext, useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { useLocation } from 'react-router-dom'
import Offcanvas from 'react-bootstrap/Offcanvas'
import { useTranslation } from 'react-i18next'
import '@/assets/css/navbar.css'
import LanguageDropdown from './LanguageDropdown'
import LoginButton from './LoginButton'
import { IoIosHeartEmpty, IoMenuSharp, MdOutlineLightMode, MdOutlineDarkMode, SlBasket, SlArrowLeft } from '../../assets/icons/icons'
import { useCanvas } from '../../hooks'
import { Button } from 'react-bootstrap'
import ShoppingCart from './ShoppingCart'
import useToggle from '../../hooks/useToggle'
import { ThemeContext } from '../../redux/context/ThemeContext'
/**
 * Component for site navigation bar.
 */
// login, teema?

function NavigationBar({ i18n }) {
  const {themeDark, toggleTheme} = useContext(ThemeContext);
  const canvas = useCanvas()
  const cart = useToggle()
  const { t } = useTranslation()
  // const [themeLight, setThemeLight] = useState(document.documentElement.getAttribute('data-bs-theme'))
  const [collapseNavbar, setCollapseNavbar] = useState(false)
  const loc = useLocation()
  const noNav = ['/signin', '/signup']

  const handleWindowResize = () => {
    if (window.innerWidth < 992) {
      setCollapseNavbar(true)
    } else {
      setCollapseNavbar(false)
    }
  }

  const handleThemeChange = () => {
    toggleTheme()
  }

  useEffect(() => {
    handleWindowResize()
  }, [])

  if (noNav.includes(loc.pathname)) {
    return null
  }

  window.addEventListener('resize', handleWindowResize)

  const sizeIcon = { 'height': '24', 'width': '24', 'marginRight': 2, 'verticalAlign': 'middle' }
  const styleNav = { 'display': 'inline-flex', 'alignItems': 'center', 'whiteSpace': 'nowrap', 'borderTopColor': '#32BF6F', 'borderTopWidth': '3px' }
  const styleNavItem = { 'display': 'inline-flex', 'alignItems': 'center', 'whiteSpace': 'nowrap' }
  const borderActiveHome = { borderTopStyle: loc.pathname === '/' ? 'solid' : 'none' }
  const borderActiveStores = { borderTopStyle: loc.pathname === '/kaupat' ? 'solid' : 'none' }
  const borderActiveProducts = { borderTopStyle: loc.pathname === '/tuotteet' ? 'solid' : 'none' }
  return (
    <>
      <Navbar className='border-bottom fixed-top' bg={themeDark ? 'light' : 'dark'} data-bs-theme={themeDark ? 'light' : 'dark'}>
        <Container className='px-md-5 justify-content-lg-around' fluid>
          <Nav className="justify-content-md-start">
            {collapseNavbar ? <Nav.Link style={styleNav} onClick={canvas.openOffcanvas} className=""><IoMenuSharp style={sizeIcon} /></Nav.Link> : null}
            <Navbar.Brand href="/" className="brand-text m-auto"
              style={{ 'color': '#32BF6F', 'borderTopColor': '#32BF6F', 'borderTopWidth': '3px', ...borderActiveHome }}>
              E-Shop
            </Navbar.Brand>
          </Nav>
          {collapseNavbar ? null :
            <Nav>
              <Nav.Link href='/kaupat' style={{ ...styleNav, ...borderActiveStores }}>{t('stores')}</Nav.Link>
              <Nav.Link href='/tuotteet' style={{ ...styleNav, ...borderActiveProducts }}>{t('products')}</Nav.Link>
            </Nav>
          }
          <Nav className="justify-content-md-end">
            <LanguageDropdown i18n={i18n} />
            <Nav.Link style={styleNav}><IoIosHeartEmpty style={sizeIcon} />{collapseNavbar ? null : t('favorities')}</Nav.Link>
            <LoginButton collapseNavbar={collapseNavbar} />
            <Nav.Link style={styleNav} className='px-2' onClick={handleThemeChange}>{(themeDark) ? <MdOutlineLightMode style={sizeIcon} /> : <MdOutlineDarkMode style={sizeIcon} />}</Nav.Link>
            <Nav.Link style={styleNav} className='px-2'><Button className='product-cart rounded-5'
              style={{ "backgroundColor": "#32BF6F", "borderStyle": "none" }}
              onClick={cart.openOffcanvas}><SlBasket style={sizeIcon} /></Button></Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Offcanvas show={canvas.showOffcanvas} onHide={canvas.closeOffcanvas} placement="start">
        <Offcanvas.Header closeButton>
          <Navbar.Brand href="/" className="brand-text" style={{ 'color': '#32BF6F' }}>E-Shop</Navbar.Brand>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className=" flex-grow-1">

          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
      <ShoppingCart close={cart.closeOffcanvas} show={cart.showOffcanvas} />
    </>
  )
}

export default NavigationBar