import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const Artboard = () => {
  const navigate=useNavigate();
  const callArtboardPage=async ()=>{
    try{
      const res=await fetch('/artboard',{
        method:'GET',
        headers:{
          "Accept":"application/json",
          "Content-Type":"application/json"
        },
        credentials:"include"
      })
      const data=await res.json();
      console.log(data)
      if(!res.status===200)
        throw new Error("Can not get data!")
    }catch(err){
      console.log(err);
      navigate('/login')
    }
  }
  useEffect(()=>{
    callArtboardPage();
  },[])
  return (
    <>
      <form method='GET'>
        <h1>This is artboard page</h1>
      </form>
    </>
  )
}

export default Artboard