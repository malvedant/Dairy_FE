import React from 'react'
import img from '../assetes/Dairy/homeOne.png'
import recharge from '../assetes/Dairy/cardOne.jpg'
import transaction from '../assetes/Dairy/cardTwo.png'
import account from '../assetes/Dairy/cardThree.webp'
import { useNavigate } from 'react-router-dom'
function HomeInfo() {
  const navigate = useNavigate();
  const gotToSignUp = () => {
    navigate('/signup');
  }
  return (
    <div className="container">
      <div className="col-md-12 homeInfo d-flex justify-content-center align-items-center">
        <div data-aos="fade-right" className=' p-3'>
          <h2 className='my-4'>Dairy Management Made for <strong>Modern </strong> Farmers</h2>
          <p className='my-4'>Streamline your dairy operations with tools designed to simplify tracking milk production, rates, and earnings.</p>
          <button onClick={gotToSignUp} className='btn btn-success rounded w-50 '>Sign Up Now!</button>
        </div>
        <div data-aos="fade-left" className=' p-3'>
          <img className='img-fluid' src={img} alt="Bank Image" />
        </div>
      </div>
      <div className="container my-3 row">
        <h2 className='text-center my-3'>Take your <strong>Dairy Business</strong> to the next level!</h2>
        <div data-aos="fade-up" className="col-md-4 mb-4">
          <div  className="card mx-auto rounded shadow p-3 border border-none" style={{ width: '25rem' }}>
            <img src={transaction} className="card-img-top" alt="Milk Status" />
            <h4>Milk Collection Status</h4>
            <p>Track daily milk collections, shifts, and overall quantities with ease, all in one place.</p>
          </div>
        </div>

        <div data-aos="fade-up" className="col-md-4 mb-4">
          <div className="card mx-auto rounded shadow p-3 my-3 border border-none" style={{ width: '25rem' }}>
            <img src={account} className="card-img-top" alt="Simple UI" />
            <h4>Farmer-Friendly Interface</h4>
            <p>Navigate with ease using a simple and intuitive interface designed for seamless dairy management.</p>
          </div>
        </div>

        <div data-aos="fade-up" className="col-md-4 mb-4">
          <div className="card mx-auto rounded shadow p-3 border border-none" style={{ width: '25rem' }}>
            <img src={recharge} className="card-img-top" alt="Record Handling" />
            <h4>Effortless Record Management</h4>
            <p>Maintain and access detailed records of milk rates, quantities, and earnings in just a few clicks.</p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default HomeInfo