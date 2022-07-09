
import Button from '../UI/Button'
import './Login.css'

const Login = () => {
    return <>
    <p className="login__heading">Login or Create an Account</p>
        <div className='login'>
            <div>
                <p className="login__description">New Customer</p>
                <small style={{
                    fontSize: "15px",
                    color: "#838383"
                }}>Registration is free and easy.</small>
                <ul className="login__items">
                    <li>Fater checkout</li>
                    <li>Save multiple shipping address</li>
                    <li>View and track orders and more</li>
                </ul>
                <Button type="button" style={{marginTop: "165px", width: "220px", height: "45px"}}>Create an Account</Button>
            </div>
            <div>
                <p className="login__description">Registered Customers</p>
                <small style={{
                    fontSize: "15px",
                    color: "#838383",
                    margin: 0
                }}>Registration is free and easy.</small>
                <div className="login__labels">
                    <label htmlFor="email">Email Address*</label><br></br>
                    <input className="login__input" type="email"></input>
                </div>
                <div className="login__labels">
                    <label htmlFor="password">Password*</label><br></br>
                    <input className="login__input" type="password"></input>
                </div>
                <Button
                    type="submit"
                    style={{marginTop: "40px"}}
                >Login</Button>
            </div>
        </div>
    </>
}

export default Login
