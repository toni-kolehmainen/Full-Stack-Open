import { Button, Form } from 'react-bootstrap'
import LanguageDropdown from '../../components/global/LanguageDropdown'
import { useTranslation } from 'react-i18next'
import { useSignInMutation } from '../../services/api'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './signin.css'
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
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const handleEmail = (event) => { setEmail(event.target.value) }
  const handlePassword = (event) => { setPassword(event.target.value) }
  const [
    signinPost, // This is the mutation trigger
    { isLoading: isUpdating }, // This is the destructured mutation result
  ] = useSignInMutation()
  const { t } = useTranslation()

  const handleSubmit = (event) => {
    event.preventDefault()
    signinPost({ email, password })
  }
  const handleBack = (event) => {
    event.preventDefault()
    if (showPassword) {
      setShowPassword(false)
    } else {
      navigate("/")
    }
  }
  const handleNext = (event) => {
    event.preventDefault()
    setShowPassword(true)
    console.log('handleNext')
  }
  return (
    <div className="sigin_window" style={{}}>
      <div className="container pt-sm-5">
        <div className="row justify-content-center">
          <div className="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9 col-12 p-0">
            <Form className="bg-transparent rounded-2 shadow-5-strong p-4 border-sm-0" onSubmit={handleSubmit}>
              <div className="row justify-content-end">
                <div className="col-4">
                  <LanguageDropdown i18n={i18n} />
                </div>
              </div>
              <div className='text-start'>
                <h3 className='title'>{t("loginTitle")}</h3>
                <span className="sub-title">{t("loginSubTitle")}</span>
              </div>
              <div className="row pt-3">
                <div className="col-12">
                  <input onChange={handleEmail} type="email" className="form-control" placeholder={t("email")} />
                </div>
              </div>
              <div className="row pt-3" style={{ "display": showPassword ? "block" : "none" }}>
                <div className="col-12">
                  <input onChange={handlePassword} type="password" className="form-control" placeholder={t("password")} />
                </div>
              </div>
              <div className="row pt-5">
                <div className="col-12">
                  {showPassword ?
                    <Button type="submit" className="submit w-100 rounded-4">
                      {t("signin")}
                    </Button> :
                    <Button onClick={handleNext} type="button" className="submit w-100 rounded-4">
                      {t("continue")}
                    </Button>}
                </div>
              </div>
              <div className="row pt-3">
                <div className="col-12">
                  <Button type="button" className="back w-100 rounded-4" onClick={handleBack}>
                    {t("cancel")}
                  </Button>
                </div>
              </div>
              
              <div className="hr pt-3" style={{"display":"flex", "alignItems":"center", "textAlign":"center", "content":""}}>Tai</div>
              <div className="row pt-3">
                <div className="col-12">
                  <Button variant='outline-info' type="submit" className="w-100 rounded-4">
                    Google
                  </Button>
                </div>
              </div>
              <div className="row pt-5">
                <div className="col-12">
                  <span>{t("loginFooter")} <Link to="/signup">{t("loginFooterLink")}</Link></span>
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