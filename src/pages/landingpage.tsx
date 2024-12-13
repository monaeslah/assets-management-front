import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate("/login");
  };

  return (
    <div className="landing-page">
      <section className="hero">
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
      </section>
    </div>
  );
};

export default LandingPage;
