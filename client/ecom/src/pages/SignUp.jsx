import { Button, Form } from 'react-bootstrap'
import LanguageDropdown from '../components/global/LanguageDropdown'
import { useState } from 'react'
import './signup.css'
import { useSignUpMutation } from '../services/api'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'

function Steps({ step, handler, value, type, placeholder }) {
  const handleDefault = (event) => { event.preventDefault() }
  const { t } = useTranslation()
  if (step === 'email') {
    return (
      <div className="col-12">
        <input onChange={handler} value={value} type={type} className="form-control" placeholder={placeholder} required />
        <div className="invalid-feedback">
          Please provide a valid email.
        </div>
      </div>
    )
  } else if (step === 'password') {
    return (
      <div className="col-12">
        <input onCopy={handleDefault} onPaste={handleDefault} onChange={handler} value={value} type={type} className="form-control" placeholder={placeholder} required />
        <div className="invalid-tooltip">
          Please provide a valid zip.
        </div>
      </div>
    )
  }
}

function SignUp({ i18n }) {
  const { t } = useTranslation()
  const [
    signupPost, // This is the mutation trigger
    { isLoading: isUpdating }, // This is the destructured mutation result
  ] = useSignUpMutation()

  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [step, setStep] = useState('email')

  const handleEmail = (event) => { setEmail(event.target.value) }
  const handlePassword = (event) => { setPassword(event.target.value) }
  const handleConfirm = (event) => { setConfirm(event.target.value) }
  const handleSteps = (event) => {
    event.preventDefault()
    if (step === 'email') {
      setStep('password')
    }
  }

  const handleBack = (event) => {
    event.preventDefault()
    if (step === 'email') {
      navigate('/')
    } else {
      setStep('email')
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('handleSubmit')
    if (password === confirm) {
      signupPost({ email, password })
    } else {
      alert('password and confirm no match')
    }
  }
  return (
    <div className="sigup_window" style={{}}>
      <div className="container pt-5">
        <div className="row justify-content-center">
          <div className="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-8 col-7">
            <Form className="bg-transparent rounded-2 shadow-5-strong p-4 border border-1" style={{}} onSubmit={handleSubmit}>
              <div className="row justify-content-end">
                <div className="col-4">
                  <LanguageDropdown i18n={i18n} />
                </div>
              </div>
              <div className='text-start'>
                <h3 className='title'>{t('registerTitle')}</h3>
                <span className="sub-title">{t('registerSubTitle')}</span>
              </div>
              {step === 'email' ?
                <div className="row pt-3">
                  <Steps step={step} handler={handleEmail} value={email} type={'email'} placeholder={t('email')} />
                </div> : null}
              {step === 'password' ?
                <div className="row pt-3">
                  <Steps step={step} handler={handlePassword} value={password} type={'password'} placeholder={t('password')} />
                </div> : null}
              {step === 'password' ?
                <div className="row pt-3">
                  <Steps step={step} handler={handleConfirm} value={confirm} type={'password'} placeholder={t('confirm')} />
                </div> : null}
              <div className="row pt-5">
                <div className="col-12">
                  {step === 'password' ?
                    <Button className='submit w-100 rounded-4' type="submit">
                      {t('signup')}
                    </Button> :
                    <Button onClick={handleSteps} className='submit w-100 rounded-4' type="button">
                      {t('continue')}
                    </Button>}
                </div>
              </div>
              <div className="row pt-3">
                <div className="col-12">
                  <Button className='back w-100 rounded-4' onClick={handleBack} type="button">
                    {t('cancel')}
                  </Button>
                </div>
              </div>
              <div className="row pt-5">
                <div className="col-12">
                  <span>{t('registerFooter')} <Link to="/signin">{t('registerFooterLink')}</Link></span>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp