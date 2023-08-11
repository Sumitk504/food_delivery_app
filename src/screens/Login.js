import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [Credentials, setCredentials] = useState({email:"", password:""})
  let navigate = useNavigate(); 
    const handleSubmit = async(e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/loginuser", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email:Credentials.email, password:Credentials.password})
        });
        const json = await response.json()
        console.log(json);

        if(!json.success){
            alert("Enter Valid Credentials")
        }

        if(json.success){
          localStorage.setItem("userEmail", Credentials.email);
          localStorage.setItem("authToken", json.authToken);
          console.log(localStorage.getItem("authToken"));
          navigate("/")
      }
    }

    const onChange = (event) => {
        setCredentials({...Credentials,[event.target.name]:event.target.value})
    }

  return (
  <>
    <div className="container">     
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" name='email' value={Credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" name='password' value={Credentials.password} onChange={onChange} id="exampleInputPassword1" />
            </div>

            <button type="submit" className="m-3 btn btn-primary">Submit</button>
            <Link to="/createuser" className='m-3 btn btn-danger'>I'm a new user</Link>
        </form>
    </div>
  </>
  )
}
