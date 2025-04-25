import React from "react";
import { motion } from "framer-motion";
import "./about.css";
import imgAbout from "../../assets/images/imagesinPlacement/homePageMainImage.png";

export default function About() {
  return (
    <div id="About">
      <div className="aboutMain">
        <img src={imgAbout} alt="About Talent-Bridge" className="imgAbout" />
      </div>
      <div className="aboutheader">
        <h2 className="aboutheading">About Talent-Bridge</h2>
        <p>
          At Talent Bridge, we are dedicated to empowering students by providing
          exceptional job opportunities and career growth. Our platform serves
          as a bridge between talented college students and top companies,
          ensuring seamless connections that lead to promising careers.<br></br>
          <br></br>In collaboration with colleges, we offer comprehensive career
          guidance, valuable resources, and access to quality placements. With a
          strong commitment to student success, Talent Bridge has successfully
          placed numerous candidates in reputed firms, helping them transition
          smoothly from education to employment.
          <br></br>
          <br></br>Our mission is to shape the future workforce by offering a
          dynamic, AI-integrated placement platform that enhances employability,
          fosters professional growth, and turns career aspirations into
          reality.
        </p>
      </div>
    </div>
  );
}
