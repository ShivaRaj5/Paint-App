import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from './App';
const Logout = () => {
  const navigate=useNavigate();
  const {state,dispatch}=useContext(UserContext)
  const logoutUser=async ()=>{
    try{
      const logData=await fetch('/logout',{
        method:'GET',
        headers:{
          "Accept":"application/json",
          "Content-Type":"application/json"
        },
        credentials:"include"
      })
      if(!logData.status===200)
        alert("Logout unsuccessfull!")
      dispatch({type:'USER',payload:false})
      alert("Logged out succesfully")
      navigate('/')
    }catch(err){
      // console.log(err);
      navigate('/')
    }
  }
  useEffect(()=>{
    logoutUser();
  },[])
  return (
    <div>Logout</div>
  )
}

export default Logout