import { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import '../../assets/components/Dropdown.css'

function LanguageDropdown({ i18n }) {

  const [locale, setLocale] = useState([{ value:'en', id:1, text:'English' }, { value:'fi', id:2,text:'Suomi' }, { value:'sv', id:3, text:'Svenska' }])

  const handleChangeLanguage = (event) => {
    window.localStorage.setItem('language', event.target.value)
    i18n.changeLanguage(event.target.value)
  }

  return(
    <Form.Select style={{}}  value={i18n.language} aria-label="Select language" onChange={handleChangeLanguage}>
      {locale.map(language =>
        <option value={language.value} key={language.id}>{language.value.toLocaleUpperCase()}</option>
      )}
    </Form.Select>
  )
}

export default LanguageDropdown