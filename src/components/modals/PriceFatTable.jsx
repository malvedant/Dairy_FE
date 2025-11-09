import React, { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { AppContext } from "../../Context/AppContext";

const PriceFatTable = () => {
  const { milkPriceHistory, getmilkPriceHistory } = useContext(AppContext);
  const { t } = useTranslation();

  useEffect(() => {
    getmilkPriceHistory();
  }, []);

  const today = new Date().toISOString().split("T")[0];

  const todaysRecords = milkPriceHistory.filter((record) => {
    const recordDate = new Date(record.date).toISOString().split("T")[0];
    return recordDate === today;
  });

  console.log(todaysRecords[0]?.price); // ✅ safe access

  const fatCategories = [2, 3, 4, 4.5, 5, 5.5, 6, 7, 8, 9, 10];

  return (
    <div className="container mt-4 mb-5">
      <h5 className="text-center mb-3">{t("price_according_fat")}</h5>

      <div className="table-responsive p-2">
        <table className="table table-bordered table-striped table-hover text-center align-middle shadow-sm">
          <thead className="table-dark">
            <tr>
              <th>{t("date")}</th>
              <th>{t("fat")}</th>
              <th>{t("price")}</th>
            </tr>
          </thead>
          <tbody>
            {fatCategories.map((fat, index) => (
              <tr key={index}>
                <td>{today}</td>
                <td>{fat}%</td>
                <td>
                  {todaysRecords.length > 0 ? (
                    <span className="fw-bold text-primary">
                      ₹{(todaysRecords[0].price * fat).toFixed(2)}
                    </span>
                  ) : (
                    <span className="text-muted">{t("no_data")}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PriceFatTable;
