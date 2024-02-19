
// Title
// name
// password
// link to register screen and back to home button
// Forgot Password?
import { useEffect, useState } from 'react';
import SignButton from '../../components/sign_button'
import SignForm from '../../components/sign_form'
import axios from 'axios'
import loginService from '../../services/login'


function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [data, setData] = useState([])

  useEffect(() => {
    console.log('effect')
    loginService
    .getAll()
    .then(response => {
      console.log('promise fulfilled')
      setData(response)
    })
  }, [])

  const contents = [
    {value:username, set:setUsername, type:"text", name:"username", id:1}, 
    {value:password, set:setPassword, type:"password", name:"password", id:2}
  ]

  const handleLogin = (event) => {
    event.preventDefault()
    const noteObject = {
      username:username,
      password:password
    }
    loginService
      .create(noteObject)
      .then(response => {
        console.log(response)
        setData(data.concat(response))
        setUsername('')
        setPassword('')
      })
    console.log('logging in with', username, password)
  }

  // const props = {text : "Login", handleClick: handle_login}
  const props = {text : "Login", handleClick: handleLogin}

  return (
    <div className="Login">
      test
      <div>
        {/* <SignButton text={props.text} handleClick={props.handleClick}/> */}
        <SignForm text={props.text} contents={contents} handleLogin={handleLogin}/>
        {data.map(value => 
        
        <div key={value.id}>
          {value.username} {value.password}
        </div>)}
      </div>
    </div>
  );
}

export default Login;