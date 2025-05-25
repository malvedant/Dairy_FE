import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "../Context/AppContext";

const FeedCard = () => {
  const { cowFeedData } = useContext(AppContext);
  const [cowFeed, setCowFeed] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    let storedData = localStorage.getItem("cowFeedData");
    
    if (Array.isArray(cowFeedData)) {
      setCowFeed(cowFeedData);
    } else if (storedData) {
      setCowFeed(JSON.parse(storedData) || []);
    } else {
      setCowFeed([]); // Ensure it's an array
    }
  }, [cowFeedData]);

  return (
    <div className="container mt-4">
      <div className="row justify-content-center gap-4">
        {cowFeed.length > 0 ? (
          cowFeed.map((data, index) => (
            <div key={index} className="col-lg-3 col-md-4 col-sm-6 d-flex">
              <div
                className="card shadow-lg p-4 h-100 w-100 d-flex flex-column m-2"
                style={{ minHeight: "260px", minWidth: "230px" }}
              >
                <div className="card-body flex-grow-1 text-center">
                  <h5 className="card-title">
                    <strong>{data.cowFeedName || "N/A"}</strong>
                  </h5>
                  <p>Stock: <strong>{data.stock || "N/A"}</strong></p>
                  <p>Price: <strong>{data.price || "N/A"}</strong></p>
                </div>
                <div className="mt-auto text-center">
                  <button
                    onClick={() => navigate("/update-cow-feed", { state: { index } })}
                    className="btn btn-success w-100 py-2"
                  >
                    Update Stock
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-lg-3 col-md-4 col-sm-6 d-flex">
            <div
              className="card shadow-lg p-4 h-100 w-100 d-flex flex-column m-2"
              style={{ minHeight: "260px", minWidth: "230px", textAlign: "center" }}
            >
              <div className="card-body flex-grow-1 text-center">
                <h5 className="card-title">
                  <strong>No Data Available</strong>
                </h5>
                <p>Please add cow feed data.</p>
              </div>
              <div className="mt-auto text-center">
                
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedCard;
