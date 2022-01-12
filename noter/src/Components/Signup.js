import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
    let history = useNavigate();
    const [credentials, setCredentials] = useState({name: '', email:'',password:'', cpassword:''})
    const onChange = (e) => {
        // Using spread operator. persist the value of notes but add these values to it meaning change the name according to it's value.
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
      };

      const handleSubmit = async (e)=>{
        e.preventDefault();
        const {name, email, password} = credentials;
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({name,email,password}) 
          });
          const json = await response.json()
          console.log(json)
          if(json.authtoken){
            //Save the authtoken and redirect
            localStorage.setItem("token",json.authtoken)
            history("/");
            props.showAlert("Account Created Successfully","primary")

          }
          else{
              props.showAlert("Invalid Credentials","danger")
          }
    }
    return (
        <div className='container mt-2'>
            <h2>Signup For your Account on Noter</h2>
  <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="fullname" className="form-label">Enter Your Full Name</label>
    <input type="text" className="form-control" value={credentials.name} id="name" name='name' onChange={onChange} aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" value={credentials.email} id="email" name='email' onChange={onChange} aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" value={credentials.password} id="password" onChange={onChange} name='password' minLength={5} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" value={credentials.cpassword} id="cpassword" onChange={onChange} name='cpassword' minLength={5} required/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
        </div>
    )
}

export default Signup
