import { useEffect, useState } from 'react'
import { Button, Form, Navbar, Offcanvas } from 'react-bootstrap'
import Nav from 'react-bootstrap/Nav'
import { IoPersonOutline } from '../../assets/icons/icons'
import '../../assets/components/loginbutton.css'
import { useTranslation } from 'react-i18next'
import { useCanvas } from '../../hooks'
// add style

function LoginButton({ collapseNavbar }) {
  const { t } = useTranslation()
  const canvas = useCanvas()
  const sizeIcon = { 'height':'24', 'width':'24', 'marginRight':2, 'verticalAlign':'middle' }
  const styleNav = { 'display':'inline-flex', 'alignItems':'center', 'whiteSpace': 'nowrap' }
  return(
    <>
      <Nav.Link onClick={canvas.openOffcanvas} style={styleNav} ><IoPersonOutline style={sizeIcon} />{collapseNavbar ? null : t('login')}</Nav.Link>
      <Offcanvas show={canvas.showOffcanvas} onHide={canvas.closeOffcanvas} placement="end">
        <Offcanvas.Header closeButton>

        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-grow-1">
            <Navbar.Brand  className="brand-text align-self-center" style={{ 'color':'#32BF6F','fontSize':'2rem' }}>E-Shop</Navbar.Brand>
            <h3>
            Kirjautuneena saat myös Bonusta
            </h3>
            <span>
            Tunnistaudu asiakasomistajaksi S-käyttäjätililläsi ja saat kaikki palvelumme käyttöösi.
              <br/>
            Kun olet liittänyt S-Etukortin jäsennumeron tiliisi, saat ostoksista myös Bonusta.
            </span>
            <Button style={{ 'backgroundColor':'#19875400', 'color':'#198754' }} className="m-1" variant="success" href="/">Lue lisää</Button>
            <Button style={{ 'backgroundColor':'#198754ff' }}  className="m-1" variant="success"  href="/signin">Kirjaudu</Button>
            <Button style={{ 'borderColor':'#19875440','backgroundColor':'#19875440', 'color':'#198754' }}  className="m-1" variant="success" href="/signup">Rekisteröidy</Button>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>

  )
}

export default LoginButton