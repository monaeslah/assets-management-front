import React from "react";
import { useNavigate } from "react-router-dom";
import DreamButton from "../components/button";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  // Define styles with TypeScript type annotations
  const styles: {
    container: React.CSSProperties;
    heading: React.CSSProperties;
    paragraph: React.CSSProperties;
  } = {
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "80vh",
      textAlign: "center",
      backgroundColor: "#f8f9fa",
      color: "#333",
      margin: "auto",
      width: "100%",
    },
    heading: {
      fontSize: "2rem",
      marginBottom: "1rem",
    },
    paragraph: {
      fontSize: "1rem",
      color: "#555",
    },
  };

  // Handle redirection to the desired page
  const handleRedirect = () => {
    navigate("/mine-dreams");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>404 - Page Not Found</h1>
      <p style={styles.paragraph}>
        Sorry, the page you're looking for doesn't exist.
      </p>
      <DreamButton
        label={"Back to your Dreams"}
        enable={true}
        size="medium"
        className={"primary-btn margin-top"}
        onClick={handleRedirect}
      />
    </div>
  );
};

export default NotFound;
