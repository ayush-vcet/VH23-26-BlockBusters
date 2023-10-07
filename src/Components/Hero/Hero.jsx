import React from 'react';
import "./index.css";
import img1 from './Images/verifimg.png';
import { Link } from "react-router-dom";

function Hero() {
    return (
        <>
    <div class="hero">
      <section class="hero-left" style={{ marginLeft: "60px" }}>
        <h1>Empowering Trust: Blockchain-Based Certificate Generation & Verification</h1>
        <p>
        Revolutionizing Credentials: Immutable, Transparent, and Tamper-Proof Certificates for the Digital Age.
        </p>

        <Link to="/register">Get Started</Link>
      </section>

      <section class="right">
        <img src={img1} alt="Hero illustration" />
      </section>
    </div>
        </>
    )
}

export default Hero;
