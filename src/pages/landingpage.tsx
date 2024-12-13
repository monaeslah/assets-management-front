import React from "react";
import { useNavigate } from "react-router-dom";
import main from "../assets/images/slide/3.png";
const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate("/login");
  };

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content-main">
          <div className="hero-content">
            <h1>Simplify Asset Management with Ease</h1>
            <p>
              Track, manage, and optimize your office assets seamlessly. Stay
              organized and efficient with our all-in-one tool.
            </p>
            <div className="hero-buttons">
              <button className="cta-button" onClick={handleGetStartedClick}>
                Get Started
              </button>
              <button className="secondary-button">Learn More</button>
            </div>
          </div>
          <div className="image-content">
            <img
              src={main}
              alt="Streamlined Asset Management"
              className="responsive-image"
            />
          </div>
        </div>

        <br />
        <div className="text-content">
          <h2>Discover the Power of Streamlined Asset Management</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
            lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod
            malesuada. Proin non odio sed eros ultricies bibendum. Praesent non
            quam a magna luctus aliquet. Integer in orci sed sapien cursus
            laoreet sit amet a nisl.
          </p>
        </div>
      </section>

      {/* New Section: Image and Text Side by Side */}
      <section className="image-text-section">
        <div className="image-text-container">
          {/* Text Content */}

          {/* Image */}
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
