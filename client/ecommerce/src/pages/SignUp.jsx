import { Button, Form } from "react-bootstrap";
import {BsDisplay, BsLockFill, MenuItem} from 'react-icons/bs';
// Todo
// sposti
// googlella
// kieli

// salasana ja varmistus
function SignUp() {

  const register = () => {
    console.log("register")
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("hello");
}
  return(
    <div className="register_window" style={{"backgroundColor":"rgba(72, 72, 72, 0.2)"}}>
      <div className="container"> 
      <div className="row justify-content-center">
          <div className="col-xxl-4 col-xl-5 col-lg-6 col-md-8 col-sm-10 col-10">
          <Form className="bg-white  rounded-4 shadow-5-strong p-4" onSubmit={handleSubmit}>
            <h2>Register</h2>
              <h5 className="text-start">{" "} <BsLockFill/> Create your account{" "}</h5>       
              <div className="row pt-3">
                  <div className="col-6">
                      <input type="text" className="form-control" id="usernameregister" placeholder="Username"/>
                  </div>
              </div>

              <div className="row pt-3">
                  <div className="col-6">
                      <input type="password" className="form-control" id="psregister" placeholder="Password"/>
                  </div>
                  <div className="col-6">
                      <input type="password" className="form-control" id="psconregister" placeholder="Confirm Password"/>
                  </div>
              </div>

              <div className="row pt-3">
                  <div className="col-6">
                      <input type="text" className="form-control" id="firstname" placeholder="First Name"/>
                  </div>
                  <div className="col-6">
                      <input type="text" className="form-control" id="lastname" placeholder="Last Name"/>
                  </div>
              </div>
              <div className="row pt-5">
                  <div className="col-12">
                      <Button onClick={() => {register()}}>
                          Register
                      </Button>
                  </div>
              </div>
              {/* {!(this.state.isActiveupload) ? <img id="target" src={this.state.upload} /> : null} */}
          </Form>
          </div>
      </div>
      </div> 
  </div>
  );
}

export default SignUp