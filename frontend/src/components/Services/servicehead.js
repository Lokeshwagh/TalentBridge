import React from "react";
import breadcrumbImg from "../../assets/images/Breadcrump/breadcrumb.png";
import "./servicehead.css"
export default function ServiceHead(){
    return(
        <div className="services-container">
        <div className="breadcrumb-section">
                <img
                  src={breadcrumbImg}
                  alt="Breadcrumb Banner"
                  className="breadcrumb-photo"
                />
                <div className="breadcrumb-overlay"></div>
              </div>
              </div>
    )
}