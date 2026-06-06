import { FaInstagram, FaLinkedinIn, FaTwitter, FaYoutube } from 'react-icons/fa'
import '../footer/footer.scss'

export const Footer = () => {
    return (
        <footer className="footer">
            <div className="footerTop">
                <h2 className="logo">REAL<span>NET</span></h2>
                <div className="links">
                    <p>Terms & Conditions</p>
                    <p>Privacy Policy</p>
                    <p>Refund & Cancellation</p>
                </div>
                <div>
                    <div className="socials">
                        <FaYoutube className='icon' />
                        <FaTwitter className='icon' />
                        <FaInstagram className='icon' />
                        <FaLinkedinIn className='icon' />
                    </div>
                    <p className="copy">© 2026 REALNET. All rights reserved.</p>
                </div>
            </div>

            <h1 className="bigText">REALNET</h1>
        </footer>
    )
}
