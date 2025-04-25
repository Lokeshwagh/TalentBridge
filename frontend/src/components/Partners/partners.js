import React from "react";
import Marquee from "react-fast-marquee";
import "./partners.css";

import img1 from "../../assets/images/imagesinPlacement/client/client-1.png";
import img2 from "../../assets/images/imagesinPlacement/client/client-2.png";
import img3 from "../../assets/images/imagesinPlacement/client/client-3.png";
import img4 from "../../assets/images/imagesinPlacement/client/client-4.png";
import img5 from "../../assets/images/imagesinPlacement/client/client-5.png";
import img6 from "../../assets/images/imagesinPlacement/client/client-6.png";
import img7 from "../../assets/images/imagesinPlacement/client/client-7.png";
import img8 from "../../assets/images/imagesinPlacement/client/client-8.png";
import img9 from "../../assets/images/imagesinPlacement/client/client-9.png";
import img10 from "../../assets/images/imagesinPlacement/client/clinet-10.png";
import img11 from "../../assets/images/imagesinPlacement/client/clinet-11.png";
import img12 from "../../assets/images/imagesinPlacement/client/clinet-12.png";

export default function Partners() {
  return (
    <div className="partnersSection">
      <center>
        <h2 className="partnersHeader">OUR TECHNICAL PARTNER</h2>
        <p className="partnersSubText">
          Make Your Future With Us With 50+ Companies
        </p>
      </center>

      <div className="marqueeDiv">
        <Marquee pauseOnHover speed={40}>
          <div className="allImages">
            <img src={img1} alt="Partner 1" className="imgPartner" />
            <img src={img2} alt="Partner 2" className="imgPartner" />
            <img src={img3} alt="Partner 3" className="imgPartner" />
            <img src={img4} alt="Partner 4" className="imgPartner" />
            <img src={img10} alt="Partner 10" className="imgPartner" />
            <img src={img6} alt="Partner 6" className="imgPartner" />
            <img src={img7} alt="Partner 7" className="imgPartner" />
          </div>
        </Marquee>

        <center>
          <Marquee
            direction="right"
            speed={50}
            pauseOnHover
            style={{ width: "80%" }}
          >
            <div className="allImages2">
              <img src={img8} alt="Partner 8" className="imgPartner2" />
              <img src={img9} alt="Partner 9" className="imgPartner2" />
              <img src={img10} alt="Partner 10" className="imgPartner2" />
              <img src={img11} alt="Partner 11" className="imgPartner2" />
              <img src={img12} alt="Partner 12" className="imgPartner2" />
              <img src={img5} alt="Partner 5" className="imgPartner2" />
              <img src={img9} alt="Partner 9" className="imgPartner2" />
            </div>
          </Marquee>
        </center>
      </div>
    </div>
  );
}
