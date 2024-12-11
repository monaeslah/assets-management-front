import React from "react";

const LandingPage: React.FC = () => {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Simplify Asset Management with Ease</h1>
          <p>
            Track, manage, and optimize your office assets seamlessly. Stay
            organized and efficient with our all-in-one tool.
          </p>
          <div className="hero-buttons">
            <button className="cta-button">Get Started</button>
            <button className="secondary-button">Learn More</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
