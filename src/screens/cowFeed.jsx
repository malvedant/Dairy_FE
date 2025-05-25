import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import UserNavbar from "../components/UserNavbar";
 import FeedCard from "../components/CowFeedCard";

function CowFeed() {
  const navigate = useNavigate();

  return (
    <div>
      <UserNavbar />
      <div className="back-arrow position-absolute top-5 start-0 p-3">
        <FontAwesomeIcon
          icon={faArrowLeft}
          size="2x"
          onClick={() => navigate(-1)}
          style={{ cursor: "pointer" }}
        />
      </div>
      <h2 className="mt-5 p-3 text-center">
          Check The <strong>Feed</strong> Availability Here
        </h2>
      <div className="d-flex  align-items-center justify-content-center">
       
        <button
          className="btn btn-outline-success me-2"
         
          onClick={() => navigate("/add-new-cowFeed")}
        >
          Add new CowFeed
        </button>

        <button
          className="btn btn-outline-primary me-2"
          
          onClick={() => navigate("/allocate-cowfeed")}
        >
          Allocate CowFeed
        </button>
      </div>

      <div className="container d-flex flex-wrap">
        <FeedCard />
      </div>
    </div>
  );
}

export default CowFeed;
