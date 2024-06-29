import { Button, Form } from 'react-bootstrap'
import LanguageDropdown from '../../components/global/LanguageDropdown'
import { useTranslation } from 'react-i18next'

// sposti
// googlella

// Todo
// sähköposti comp
// salasana comp
// salasana varmistus comp
// tee teemaan sopiva tyyli
// kieli

// 8-20
// isokirjain, erikoismerkki, ei välilöyntejä

// ehdot
// communikointi ja tallentaa kirjautuminen
// näyttää väärän ja oikean dialogi

function SignIn({ i18n }) {
  const { t } = useTranslation()
  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('hello')
  }

  return (
    <div className="register_window" style={{ 'backgroundColor': 'rgba(72, 72, 72, 0.2)' }}>
      <div className="container pt-5">
        <div className="row justify-content-center">
          <div className="col-6">
            <Form className="bg-white  rounded-2 shadow-5-strong p-4" onSubmit={handleSubmit}>
              <div className="row justify-content-end">
                <div className="col-3">
                  <LanguageDropdown i18n={i18n}/>
                </div>
              </div>
              <h3>Kirjaudu E-Shop käyttäjätilille</h3>
              <span className="text-start">Aloita syöttämällä sähköpostiosoite.</span>
              <div className="row pt-3">
                <div className="col-12">
                  <input type="text" className="form-control" id="email" placeholder="Sähköposti"/>
                </div>
              </div>
              <div className="row pt-5">
                <div className="col-12">
                  <Button type="submit">
                    Jatka
                  </Button>
                </div>
              </div>
              <div className="row pt-5">
                <div className="col-12">
                  <Button type="submit">
                    Salasanalla
                  </Button>
                </div>
              </div>
              <div className="row pt-5">
                <div className="col-12">
                  <Button type="submit">
                    Google
                  </Button>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn