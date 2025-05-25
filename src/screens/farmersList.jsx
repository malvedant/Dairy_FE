import React, { useContext, useState } from "react";
import UserNavbar from "../components/UserNavbar";
import { AppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";
import farmerImg from "../assetes/farmer.png";
import FarmerModal from "../components/farmerModal";

const FarmersList = () => {
  const navigate = useNavigate();
  const { farmersData,getFarmersData} = useContext(AppContext); 
  const [visiblePin, setVisiblePin] = useState(false);
  const [currenrIndex, setCurrenrIndex] = useState(0);

  return (
    <div>
      <UserNavbar />
      
      <FarmerModal 
        visiblePin={visiblePin} 
        setVisiblePin={setVisiblePin} 
        farmerData={farmersData[currenrIndex]} 
        onDeleteSuccess={async ()=>{
          await getFarmersData()
        }} 
      />

      <div className="container">
      <button
          className="btn btn-outline-success me-2"
         
          onClick={() => navigate("/add-farmer")}
        >
          Add Farmer
        </button>
       
        <div className="row" >
          {farmersData.map((item, index) => (
            <div key={index} className="col-md-3" style={{ padding: "0" }}>
              <div
                className="card border border-green rounded overflow-hidden cursor-pointer shadow-sm"
                onClick={()=>{
                  setVisiblePin(true)
                  setCurrenrIndex(index)
                }}
                style={{
                  width: "250px", 
                  height: "300px", 
                  transition: "transform 0.5s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "translateY(-5px)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "translateY(0)")
                }
              >
        
                <img
                  className="bg-blue-50 mx-auto mt-2"
                  src={farmerImg}
                  alt=""
                  style={{
                    width: "100px", 
                    height: "120px", 
                  }}
                />

                <div className="card-body p-2 text-center">
                  <div className="d-flex align-items-center justify-content-center gap-2 text-success small">
                    
                  </div>
                  <h6 className="card-title text-dark mb-1"> Name : {item.name}</h6>
                  <p className="text-muted small">Mobile No:{item.phone}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FarmersList;
