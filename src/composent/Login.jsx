import axios from 'axios'
import React, { useState } from 'react'
import './login.css';
import { useNavigate } from 'react-router-dom'



function Login(props) {
  

  const [cin, setCin] = useState('')
  const [pass, setPass] = useState('')
  const navigate = useNavigate();


  const clickbutton = async (e) => {
    e.preventDefault();



    try {
      const resp = await axios.post('/login', {
        cin: cin,
        password: pass
      })
  
      localStorage.setItem("token", resp.data.token);
      localStorage.setItem("username", `${resp.data.user.first_name} ${resp.data.user.last_name}`);
      props.setIsConected(true)
      navigate('/notes');
    }
    catch (error) {
      console.error("Login error:", error.response ? error.response.data : error.message);
      alert("Login failed. Please check your credentials.");
    }

  }



  return (

    <div className='login'>
      <h1>LOGIN</h1>
      <form >
        <label>CIN</label>
        <input type='text' value={cin} onChange={(e) => setCin(e.target.value)} /><br></br>
        <label>PASSWORD</label>
        <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} /><br></br>
        <button onClick={clickbutton}>Login</button>
      </form>
    </div>
  )
}

export default Login