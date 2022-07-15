import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const navigate=useNavigate();
  const [userData,setUserData]=useState({
    name:"",
    email:"",
    phone:"",
    password:"",
    cpassword:""
  })
  const inputEvent=(e)=>{
    const name=e.target.name;
    const value=e.target.value;
    setUserData({...userData,[name]:value});
  }
  const postData=async (e)=>{
    e.preventDefault();
    const {name,email,phone,password,cpassword}=userData;
    try{
      if(!name || !email || !phone || !password || !cpassword)
        return alert("Please enter all the details!")
      const userData=await fetch("http://localhost:5000/signup",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({name,email,phone,password,cpassword})
      })
      if(userData.status===200){
        alert("Signup successfull!");
        navigate('/login');
      }
      else if(userData.status===401){
        alert("Passwords do not match!")
      }
      else  
        alert("Signup unsuccssfull")
    }catch(err){
      alert(err);
    }
  }
  return (
    <>
      <div className="signupContainer">
        <div className="signupContent">
          <form method='POST'>
            <h1>Sign Up</h1>
            <input type="text" placeholder='Name' name='name' value={userData.name} onChange={inputEvent}/>
            <input type="text" placeholder='Email' name='email' value={userData.email} onChange={inputEvent}/>
            <input type="text" placeholder='Phone' name='phone' value={userData.phone} onChange={inputEvent}/>
            <input type="text" placeholder='Password' name='password' value={userData.password} onChange={inputEvent}/>
            <input type="text" placeholder='Confirm Password' name='cpassword' value={userData.cpassword} onChange={inputEvent}/>
            <button onClick={postData}>Sign Up</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Signup