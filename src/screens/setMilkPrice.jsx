import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PushSpinner } from "react-spinners-kit";
import UserNavbar from "../components/UserNavbar";
import setPriceIcon from "../assetes/Dairy/setPrice.webp";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { AppContext } from "../Context/AppContext";
import axios from "axios";
import { useTranslation } from "react-i18next";

function SetMilkPrice() {
  const navigate = useNavigate();
  const { backendUrl, userData } = useContext(AppContext);
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [fat] = useState("1");
  const [price, setPrice] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.post(
          `${backendUrl}/api/D_owner/get-milk-price-as-per-date`,
          { D_owner_id: userData.id, date }
        );

        if (data.success) {
          setIsEditMode(true);
          setPrice(data.data.price);
        } else {
          setIsEditMode(false);
          setPrice("");
        }
      } catch (error) {
        toast.error(error.response?.data?.message || t("error_fetching_data"));
      }
    };

    if (date) getData();
  }, [date, backendUrl, userData, t]);

  const handleError = (error, defaultMessage) => {
    toast.error(error.response?.data?.message || defaultMessage);
  };

  const handleSubmit = async () => {
    if (!date || !price) {
      toast.error(t("fill_all_fields"));
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/D_owner/set-milk-price`,
        { date, fat, price, D_owner_id: userData.id }
      );

      if (data.success) {
        toast.success(data.message);
        setIsEditMode(true);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      handleError(error, t("failed_set_price"));
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async () => {
    if (!date || !price) {
      toast.error(t("fill_all_fields"));
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/D_owner/edit-milk-price`,
        { date, fat, newPrice: price, D_owner_id: userData.id }
      );

      if (data.success) {
        toast.success(data.message);
        setIsEditMode(true);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      handleError(error, t("failed_edit_price"));
    } finally {
      setLoading(false);
    }
  };

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
      <ToastContainer />
      <div className="shadow rounded m-4 p-4 d-flex flex-row">
        <div className="container col-md-7">
          <div className="form-floating mb-3">
            <input
              type="date"
              className="form-control"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <label>{t("date")}</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="number"
              className="form-control"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <label>{t("milk_rate")}</label>
          </div>

          <div className="form-floating mb-3">
            <input type="number" className="form-control" value={fat} readOnly />
            <label>{t("fat")}</label>
          </div>

          <div className="text-center my-2">
            {isEditMode ? (
              <button
                className="btn btn-primary w-75"
                onClick={handleEdit}
                disabled={loading}
              >
                {loading ? (
                  <PushSpinner size={30} color="white" />
                ) : (
                  t("edit_milk_price")
                )}
              </button>
            ) : (
              <button
                className="btn btn-success w-75"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? (
                  <PushSpinner size={30} color="white" />
                ) : (
                  t("set_milk_price")
                )}
              </button>
            )}
          </div>
        </div>

        <div className="container">
          <img src={setPriceIcon} className="img-fluid" alt="Set Price Background" />
        </div>
      </div>
    </div>
  );
}

export default SetMilkPrice;
