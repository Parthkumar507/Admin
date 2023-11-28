import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../style/Login_page.css'


const Loginpage = () => {

    const [loginData,setLoginData]= useState({
        email:'',
        password:''
    });


    const handleloginSubmit=async(e)=>{
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:8000/login',loginData);
            console.log(response.data)
            const {success,message} = response.data;

            if(success){
                console.log('Login Successfully')
              }
              else{
                console.log(message);
              }
            
        }
        catch(error){
            console.error('Login error',error)
        }
        setLoginData({
            email:'',
            password:''
        })
    }

    const handleloginChange=(e)=>{
        // console.log(e)
        const{name,value}=e.target;
        setLoginData((prevData)=>({
            ...prevData,
            [name]:value

        }))

    }

  return (
    <div className="container">
    <h1>
    Login Page
    </h1>
    <form onSubmit={handleloginSubmit}>
        <input
            type='text'
            name='email'
            placeholder='Enter your Email .....'
            value={loginData.email}
            onChange={handleloginChange}
            required
        />
        <input
            type='password'
            name='password'
            placeholder='Enter your password .....'
            value={loginData.password}
            onChange={handleloginChange}
            required
        />
        <button type="submit">
            Login
        </button>

        <p>
          Not registered yet? <Link to ='/Register'>Register Here</Link>
        </p>

    </form>
    </div>
  )
}

export default Loginpage