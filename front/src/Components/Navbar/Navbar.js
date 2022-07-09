
import companyLogo from '../logos/company_logo.png'
import './Navbar.css'
import {Link} from 'react-router-dom'
import { FaShoppingCart } from 'react-icons/fa'
import React from 'react'
import axios from 'axios'
import AuthContext from '../Context/auth_context'

const Navbar = () => {
    const ctx = React.useContext(AuthContext)

    const [isLoggedIn, setIsLoggedIn] = React.useState(false)
    React.useEffect(() => {
        const userToken = localStorage.getItem('userToken')
        if(userToken){
            axios.get('http://localhost:3000/profile', {
                headers: {
                    Authorization: userToken
                }
            })
        }
    })

    return <nav className="navbar">
        <img className="nav__logo" src={companyLogo} alt="company logo" />
        <div className='links'>
            {!ctx.isLoggedIn ? 
                <React.Fragment>
                    <Link className='nav__links' to="/login">Login</Link>
                    <span>|</span>
                    <Link className='nav__links' to="/register">Register</Link>
                </React.Fragment> 
            :
                <Link to='/cart' style={{
                    color: "#f14d54",
                    background: "transparent",
                    border: "1px solid #f14d54",
                    textDecoration: 'none',
                    padding: "12px 40px",
                    fontSize: "1.1rem"
                }}><FaShoppingCart /> <b>{ctx.totalItems}</b> Cart</Link>
            }
        </div>
    </nav>
}

export default Navbar
