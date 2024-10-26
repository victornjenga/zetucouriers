import React from "react";

const InfoCard = ({ title, icon, quantity, background }) => {
  return (
    <div
      className={`info-box ${background} rounded-lg justify-center items-center`}
    >
      <span className="info-box-icon">{icon}</span>

      <div className="info-box-content">
        <span className="info-box-text">{title}</span>
        <span className="info-box-number firstBoxCount">{quantity}</span>
      </div>
    </div>
  );
};

export default InfoCard;
