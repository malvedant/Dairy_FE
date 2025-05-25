import React from 'react'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Footer from '../components/Footer'

function Contact() {
    const navigate = useNavigate();
    return (
        <div className="container-fluid">
            <Navbar />
            <div className="back-arrow position-absolute top-5 start-0 p-3">
                <FontAwesomeIcon icon={faArrowLeft} size="2x" onClick={() => navigate(-1)} style={{ cursor: 'pointer' }} />
            </div>
            <div className="container">
                <h1>About <strong>FarmDairy</strong></h1>
                <p className="lead">Your trusted platform for seamless and efficient dairy management.</p>
                <div className='text-end'>
                    <img src="https://cdni.iconscout.com/illustration/free/thumb/free-about-us-2061897-1740019.png" alt="" />
                </div>
                <section className="mt-4">
                    <h2><strong>Our</strong> Mission</h2>
                    <p>
                        At DairyHub, our mission is to empower farmers with modern tools to manage their dairy operations efficiently. 
                        We aim to simplify processes, track collections, and maximize productivity, enabling farmers to focus on what truly matters—quality milk production.
                    </p>
                    <div className="text-start">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhby3zuqh4Ez-L_aU7W8Fs7j6G-TOJNUj20Q&s" alt="" />
                    </div>
                </section>

                <section className="mt-4">
                    <h2>Our <strong>Vision</strong></h2>
                    <p>
                        We envision a future where every farmer has access to cutting-edge technology to optimize their dairy business. 
                        By bridging the gap between tradition and innovation, DairyHub strives to create a sustainable and profitable ecosystem for farmers worldwide.
                    </p>
                    <div className="text-end">
                        <img src="https://roland.ac.in/site/wp-content/uploads/2019/04/Vision.png" alt="" />
                    </div>
                </section>

                <section className="mt-4">
                    <h2><strong>Our</strong> Team</h2>
                    <p>
                        Our team is a passionate group of agricultural experts, technologists, and developers dedicated to transforming the dairy industry. 
                        We work closely with farmers to understand their challenges and create solutions that drive efficiency and growth.
                    </p>
                    <div className="text-start">
                        <img src="https://cdni.iconscout.com/illustration/premium/thumb/join-our-team-4880594-4062783.png?f=webp" alt="" />
                    </div>
                </section>

                <section className="mt-4">
                    <h2>Contact <strong>Us</strong></h2>
                    <p>
                        Have questions or suggestions? We’re here to help! Reach out to us at <a href="mailto:support@dairyhub.com">support@dairyhub.com</a>. 
                        Let’s build a better future for dairy farmers together.
                    </p>
                </section>
            </div>
            <Footer />
        </div>
    )
}

export default Contact
