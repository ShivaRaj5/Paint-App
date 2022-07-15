import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from './App';

const Login = () => {
  const {state,dispatch}=useContext(UserContext)
  const navigate=useNavigate();
  const [userData,setUserData]=useState({
    email:"",
    password:""
  });
  const inputEvent=(e)=>{
    const name=e.target.name;
    const value=e.target.value;
    setUserData({...userData,[name]:value})
  }
  const matchData=async (e)=>{
    e.preventDefault();
    const {email,password}=userData;
    try{
      if(!email || !password)
        return alert("Please enter all the details!")
      const postData=await fetch("/login",{
        method:'POST',
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({email,password})
      })
      if(postData.status===200){
        dispatch({type:'USER',payload:true})
        alert("Login successfull!")
        navigate('/');
      }
      else if(postData.status===401 || postData.status===409){
        alert("Invalid Credentials")
      }
    }catch(err){
      alert(err);
    }
  }
  return (
    <>
      <div className="loginContainer">
        <div className="loginContent">
          <form method='POST'>
            <h1>Log IN</h1>
            <input type="text" placeholder='Email' name='email' value={userData.email} onChange={inputEvent}/>
            <input type="text" placeholder='Password' name='password' value={userData.password} onChange={inputEvent}/>
            <button onClick={matchData}>Log IN</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login