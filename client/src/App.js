import React, { createContext,useReducer } from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Navbar from './Navbar';
import Artboard from './Artboard';
import Login from './Login';
import Signup from './Signup';
import './index.css'
import Logout from './Logout';
import { initialState,reducer } from './reducer/useReducer';
export const UserContext = createContext();
const App = () => {
  const [state, dispatch] = useReducer(reducer,initialState)
  return (
    <>
      <UserContext.Provider value={{state,dispatch}}>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/artboard' element={<Artboard />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/logout' element={<Logout />} />
        </Routes>
      </UserContext.Provider>
    </>
  )
}

export default App