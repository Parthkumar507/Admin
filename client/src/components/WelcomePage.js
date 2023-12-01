import axios from 'axios'
import React, { useEffect, useState } from 'react'
axios.defaults.withCredentials=true;

const WelcomePage = () => {
const [user, setuser] = useState();
  const sendRequest=async ()=>{
    const resp=await axios.get('http://localhost:8000/welcome',{
      withCredentials:true
    }).catch(err=>console.log(err))
    // console.log("resp in welcome page is ",resp)
    const data=await resp.data;
    return data;
  }
  useEffect(()=>{
    sendRequest().then((data)=>setuser(data.user))
  },[])
  
  return (

    <div>Welcome {user && <h1>{user.name}</h1>}</div>
  )
}

export default WelcomePage