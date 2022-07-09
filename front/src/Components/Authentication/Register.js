
import './Register.css'
import Button from '../UI/Button'
import axios from 'axios'
import React from 'react'

const Register = () => {
    const [userInfo, setUserInfo] = React.useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    })
    const [confirmPassword, setConfirmPassword] = React.useState({
        conf_password: ""
    })

    const handleChange = (event) => {
        const {name, value} = event.target
        setUserInfo(preInfo => {
            return {
                ...preInfo,
                [name]: value
            }
        })
    }

    const handleConfPassChange = (event) => {
        const {value} = event.target
        setConfirmPassword(value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post("http://localhost:3000/signup", userInfo)
            .then(data => {
                window.location.href = '/'
                window.localStorage.setItem('userToken', data.data.token)
            }).catch(err => {
                return
            })
    }

    return <form onSubmit={handleSubmit} className='register-container'>
        <p className="register__heading">Login or Creat an Account</p>
        <p className="register__info">Personal Inforation</p>
        <small className="register__instruction">Pleaes enter following information to create your account.</small>
        <div className='first-row'>
            <div className="lable__input">
                <label htmlFor="f_name">First Name *</label>
                <br></br>
                <input onChange={handleChange} value={userInfo.firstName} name="firstName" type="text" required></input>
            </div>
            <div className="lable__input">
                <label htmlFor="f_name">Last Name *</label>
                <br></br>
                <input type="text" onChange={handleChange} value={userInfo.lastName} name="lastName" required={true}></input>
            </div>
        </div>
        <div className="register__email">
            <label htmlFor="email">Email address *</label>
            <br></br>
            <input onChange={handleChange} value={userInfo.email} name="email" type="email" required={true}></input>
        </div>
        <div className='second-row'>
            <div className='lable__input'>
                <label htmlFor="password">Password *</label>
                <br></br>
                <input onChange={handleChange} value={userInfo.password} name="password" type='password' required={true}></input>
            </div>
            <div className='lable__input'>
                <label htmlFor="conf_password">Confirm Password *</label>
                <br></br>
                <input name="conf_password" onChange={handleConfPassChange} value={confirmPassword.conf_password} type='password' required={true}></input>
            </div>
        </div>
        <Button style={{width: "136px"}} type="submit">Register</Button>
    </form>
}

export default Register
