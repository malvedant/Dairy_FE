import React from 'react'
import twitter from '../assetes/twitter.png'
import facebook from '../assetes/facebook.png'
import instagram from '../assetes/instagram.png'


function Footer() {
  return (
    <footer className='container-fluid footer-div d-flex flex-row flex-wrap justify-content-center' style={{backgroundColor:"#DCDCDC"}}>
        <section className='col-md-4 p-2'>
            <div className="conatainer">
                <img className='img-fluid social-img hover' src={twitter} alt="" />
                <img className='img-fluid social-img hover' src={facebook} alt="" />
                <img className='img-fluid social-img hover' src={instagram} alt="" />
            </div>
            <div className="conatiner m-0 p-0">
                <p className='hover m-0 p-0'>Copyright © 2024 by</p>
                <br />
                <p className='hover m-0 p-0'>FarmDairy,All rights reserved.</p>
            </div>
        </section>
        <section className='col-md-4 p-2'>
            <h6>Contact us</h6>
            <p className='hover m-0 p-0'>FarmDairy, Chatarapati complex, 2nd Floor, Barshi, Solapur 431411</p>
            <p className='hover m-0 p-0'>9834935898</p>
            <p className='hover m-0 p-0'>hello@FarmDairy.com</p>
        </section>
        <section className='col-md-4 p-2'>
        <h6>Account</h6>
            <p className='hover m-0 p-0'>Create Account</p>
            <p className='hover m-0 p-0'>Sign In</p>
            <p className='hover m-0 p-0'>Android App</p>
            <p className='hover m-0 p-0'>iOS App</p>
        </section>
    </footer>
  )
}

export default Footer