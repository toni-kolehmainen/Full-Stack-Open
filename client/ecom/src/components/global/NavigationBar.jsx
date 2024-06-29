import { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { useLocation } from 'react-router-dom'
import Offcanvas from 'react-bootstrap/Offcanvas'
import { useTranslation } from 'react-i18next'
import '../../assets/css/navbar.css'
import { initTheme, checkTheme } from '../../services/globalHandler'
import LanguageDropdown from './LanguageDropdown'
import LoginButton from './LoginButton'
import { IoIosHeartEmpty, IoMenuSharp, MdOutlineLightMode, MdOutlineDarkMode, SlBasket, SlArrowLeft } from '../../assets/icons/icons'
import { useCanvas } from '../../hooks'
import { Button } from 'react-bootstrap'
/**
 * Component for site navigation bar.
 */
// vaihtaa brand kuva, login, teema?

function NavigationBar({ i18n }) {

  const canvas = useCanvas()
  const { t } = useTranslation()
  const [themeLight, setThemeLight] = useState(document.documentElement.getAttribute('data-bs-theme'))
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
    const themeName = themeLight === 'light' ? 'dark' : 'light'
    document.documentElement.setAttribute('data-bs-theme', themeName)
    document.documentElement.setAttribute('data-theme', themeName)
    window.localStorage.setItem('theme', themeName)
    setThemeLight(themeName)
  }

  useEffect(() => {
    handleWindowResize()
  }, [])

  if (noNav.includes(loc.pathname)) {
    return null
  }

  window.addEventListener('resize', handleWindowResize)

  const sizeIcon = { 'height':'24', 'width':'24', 'marginRight':2, 'verticalAlign':'middle' }
  const styleNav = { 'display':'inline-flex', 'alignItems':'center', 'whiteSpace': 'nowrap' }
  const styleNavItem = { 'display':'inline-flex', 'alignItems':'center', 'whiteSpace': 'nowrap' }
  return (
    <>
      <Navbar className='border-bottom fixed-top' bg={document.documentElement.getAttribute('data-bs-theme')} data-bs-theme={document.documentElement.getAttribute('data-bs-theme')}>
        <Container className='px-md-5 justify-content-lg-around' fluid>
          <Nav className="justify-content-md-start">
            {collapseNavbar ? <Nav.Link style={styleNav} onClick={canvas.openOffcanvas} className=""><IoMenuSharp style={sizeIcon}/></Nav.Link> :  null}
            <Navbar.Brand href="/" className="brand-text m-auto"
              style={{ 'color':'#32BF6F','borderTopColor':'#32BF6F', 'borderTopWidth':'3px', 'borderTopStyle':'solid' }}>
              E-Shop
            </Navbar.Brand>
          </Nav>
          {collapseNavbar ? null :
            <Nav>
              <Nav.Link href='/kaupat' style={styleNav}>{t('stores')}</Nav.Link>
              <Nav.Link href='/tuotteet' style={styleNav}>{t('products')}</Nav.Link>
            </Nav>
          }
          <Nav className="justify-content-md-end">
            <LanguageDropdown i18n={i18n}/>
            <Nav.Link style={styleNav}><IoIosHeartEmpty style={sizeIcon}/>{collapseNavbar ? null : t('favorities')}</Nav.Link>
            <LoginButton collapseNavbar={collapseNavbar}/>
            {/* <Nav.Item style={styleNavItem} className='px-2' onClick={handleThemeChange}><Button className='p-0' variant={checkTheme()}>{(checkTheme()) ? <MdOutlineLightMode style={sizeIcon} /> : <MdOutlineDarkMode style={sizeIcon} />}</Button></Nav.Item>   */}
            {/* <Nav.Item style={styleNavItem} className='px-2'><Button className='p-0' variant={checkTheme()}><SlBasket style={sizeIcon}/></Button></Nav.Item> */}
            <Nav.Link style={styleNav} className='px-2' onClick={handleThemeChange}>{(checkTheme()) ? <MdOutlineLightMode style={sizeIcon} /> : <MdOutlineDarkMode style={sizeIcon} />}</Nav.Link>
            <Nav.Link style={styleNav} className='px-2'><SlBasket style={sizeIcon}/></Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Offcanvas  show={canvas.showOffcanvas} onHide={canvas.closeOffcanvas} placement="start">
        <Offcanvas.Header closeButton>
          <Navbar.Brand  href="/" className="brand-text" style={{ 'color':'#32BF6F' }}>E-Shop</Navbar.Brand>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className=" flex-grow-1">

          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

export default NavigationBar