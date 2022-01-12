import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'

const Login = (props) => {
    let history = useNavigate();
    const [credentials, setCredentials] = useState({email:'',password:''})
    const onChange = (e) => {
        // Using spread operator. persist the value of notes but add these values to it meaning change the name according to it's value.
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
      };

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password}) 
          });
          const json = await response.json()
          console.log(json)
          if(json.authtoken){
            //Save the authtoken and redirect
            localStorage.setItem("token",json.authtoken)
            props.showAlert("Login Successful","success")
            history("/");

          }
          else{
            props.showAlert("Please Enter Valid Credentials","danger")
          }
    }
    return (
        <div className='mt-3'>
            <h2>Login to Continue to Noter</h2>
            <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" value={credentials.email} id="email" name='email' onChange={onChange} aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" value={credentials.password} id="password" onChange={onChange} name='password'/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
        </div>
    )
}

export default Login
