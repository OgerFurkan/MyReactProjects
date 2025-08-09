import React from 'react'
import { Link } from 'react-router-dom'
Link
import "../css/footer.css"
import { FaGithub,FaInstagram,FaLinkedin } from "react-icons/fa";



function Footer() {
  return (
    <footer>
        <ul className="footer-nav">
            <li><a href="https://github.com/OgerFurkan" target='_blank'><FaGithub className='footer-icon' />GitHub</a></li>
             <li><a href="https://www.instagram.com/ogr.furkan" target='_blank'><FaInstagram className='footer-icon' />Instagram</a></li>
              <li><a href="https://www.linkedin.com/in/furkan-öger-767b7534a" target='_blank'><FaLinkedin  className='footer-icon'/>Linkedin</a></li>
          
        </ul>
        <div className="footer-info">
            &copy; {new Date().getFullYear()} CineHub. All rights reserved.
        </div>
    </footer>
  )
}

export default Footer