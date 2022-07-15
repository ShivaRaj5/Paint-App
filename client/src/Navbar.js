import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import './index.css'
import { UserContext } from './App';
const Navbar = () => {
  const { state, dispatch } = useContext(UserContext)
  const RenderMenu = () => {
    if (state) {
      return (
        <>
          <li><Link to='/' style={{ textDecoration: 'none', color: 'white', fontSize: '20px' }}>Home</Link></li>
          <li><Link to='/artboard' style={{ textDecoration: 'none', color: 'white', fontSize: '20px' }}>Artboard</Link></li>
          <li><Link to='/logout' style={{ textDecoration: 'none', color: 'white', fontSize: '20px' }}>Logout</Link></li>
        </>
      )
    }
    else {
      return (
        <>
          <li><Link to='/' style={{ textDecoration: 'none', color: 'white', fontSize: '20px' }}>Home</Link></li>
          <li><Link to='/artboard' style={{ textDecoration: 'none', color: 'white', fontSize: '20px' }}>Artboard</Link></li>
          <li><Link to='/signup' style={{ textDecoration: 'none', color: 'white', fontSize: '20px' }}>Sign Up</Link></li>
          <li><Link to='/login' style={{ textDecoration: 'none', color: 'white', fontSize: '20px' }}>Log IN</Link></li>
        </>
      )
    }
  }
  return (
    <>
      <header>
        <nav>
          <ul>
            <RenderMenu />
          </ul>
        </nav>
      </header>
    </>
  )
}

export default Navbar