
import company_logo from '../logos/company_logo.png'
import './Footer.css'

const Footer = () => {
    return <div className='footer'>
        <img style={{height: "60px"}} src={company_logo} alt='company logo' />
        <br></br>
        <small style={{color: "rgba(0, 0, 0, 0.5)"}}>@ 2015 Tatvasoft.com. All rights reserved.</small>
    </div>
}

export default Footer
