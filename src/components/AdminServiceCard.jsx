import React, { useState } from 'react';
import setPriceIcon from '../assetes/Dairy/setPrice.webp';
import feedAvailabilityIcon from '../assetes/Dairy/cowFeed.jpg';
import milkCountIcon from '../assetes/Dairy/farmerDairy.webp';
import { useNavigate } from 'react-router-dom';

const cardData = [
    {
        img: setPriceIcon,
        title: "Set Milk Price",
        buttonText: "Set Price",
        pageRoute: "/set-milk-price",
        text: "Update the milk pricing for farmers based on current market rates.",
    },
    {
        img: feedAvailabilityIcon,
        title: "Cow Feed Availability",
        buttonText: "Check Availability",
        pageRoute: "/cow-feed-availability",
        text: "Manage the stock of cow feed and ensure sufficient availability.",
    },
    {
        img: milkCountIcon,
        title: "Add Farmer Milk Count",
        buttonText: "Add Count",
        pageRoute: "/add-milk-count",
        text: "Farmer Milk Count tracks the total milk supplied by each farmer.",
    },
    {
        img: setPriceIcon,
        title: "Bill Payment",
        buttonText: "bill",
        pageRoute: "/bill-payment",
        text: "Update the milk pricing for farmers based on current market rates.",
    },
    {
        img: milkCountIcon,
        title: "Advance payment",
        buttonText: "Advance payment",
        pageRoute: "/make-advance-payment",
        text: "Advance Payment tracks and manages early payments to farmers.",
    },
    {
        img: milkCountIcon,
        title: "Farmer's List",
        buttonText: "List",
        pageRoute: "/farmers-list",
        text: "Farmer's List displays and manages all registered farmers. ",
    },
    {
        img: milkCountIcon,
        title: "Dairy Data",
        buttonText: "List",
        pageRoute: "/dairy-data-screen",
        text: "All Dairy Records stores and tracks dairy activities.  ",
    },
];

function AdminServicesCard() {
    const [index, setIndex] = useState(0);
    const navigate = useNavigate();

    const handlePrev = () => {
        const newIndex = index === 0 ? cardData.length - 1 : index - 1;
        setIndex(newIndex);
    };

    const handleNext = () => {
        const newIndex = index === cardData.length - 1 ? 0 : index + 1;
        setIndex(newIndex);
    };

    const visibleCards = [
        cardData[(index - 1 + cardData.length) % cardData.length],
        cardData[index],
        cardData[(index + 1) % cardData.length],
    ];

    return (
        <div className="carousel-container mt-3 p-4">
            <button className="carousel-control prev" onClick={handlePrev}>‹</button>
            <div className="carousel-inner p-1 d-flex justify-content-center">
                {visibleCards.map((card, i) => (
                    <div data-aos="fade-up" key={i} className={`card-container ${i === 1 ? 'active' : ''}`}>
                        <div className="card rounded shadow p-3 border-0" style={{ width: '20rem' }}>
                            <img
                                src={card.img}
                                className="card-img-top"
                                alt={card.title}
                                style={{ height: '10rem', objectFit: 'contain' }}
                            />
                            <div className="card-body text-center">
                                <h5 className="card-title">{card.title}</h5>
                                <p className="card-text">{card.text}</p>
                                <button
                                    className="btn btn-success w-100"
                                    onClick={() => navigate(card.pageRoute)}
                                >
                                    {card.buttonText}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <button className="carousel-control next" onClick={handleNext}>›</button>
        </div>
    );
}

export default AdminServicesCard;
