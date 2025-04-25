import React from "react";
// import { Link } from 'react-router-dom';
import Hero from "../components/Herosection/Hero";
import About from "../components/About/about";
import Partners from "../components/Partners/partners";
import References from "../components/Services/References/References";
import ContactForm from "../components/Contact/contact";
export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <References />
      <ContactForm />
      <Partners />
    </>
  );
}
