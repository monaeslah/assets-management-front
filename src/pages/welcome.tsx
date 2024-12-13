import React from "react";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import { useNavigate } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Button from "../components/button";
import celebrationImage from "../assets/images/celebrationImage.png"; // Add a relevant celebratory image

const SignUpSuccessPage: React.FC = () => {
  const { width, height } = useWindowSize();
  const navigate = useNavigate();

  const handleGoToLogin = () => {
    navigate("/dashboard");
  };

  const handleExplore = () => {
    navigate("/");
  };

  return (
    <div style={styles.container}>
      <Confetti width={width} height={height} />
      <div style={styles.content}>
        <CheckCircleIcon style={styles.icon} />
        <h1 style={styles.title}>Account Created Successfully!</h1>
        <p style={styles.message}>
          Welcome to our community! Your account has been created, and you're
          all set to get started. You will receive a welcome page from the HR
          department soon.
        </p>
        <div style={styles.buttonContainer}>
          <Button
            label="Go to Dashboard"
            enable={true}
            size="medium"
            className="primary-btn"
            onClick={handleGoToLogin}
          />
          <Button
            label="Explore Now"
            enable={true}
            size="medium"
            className="secondary-btn"
            onClick={handleExplore}
          />
        </div>
      </div>
      <div style={styles.imageContainer}>
        <img src={celebrationImage} alt="Celebration" style={styles.image} />
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    textAlign: "center",
    height: "100vh",
    backgroundColor: "#f7f9fc",
  },
  content: {
    maxWidth: "600px",
  },
  icon: {
    fontSize: "4rem",
    color: "#4caf50",
    marginBottom: "20px",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    margin: "10px 0",
  },
  message: {
    fontSize: "1.2rem",
    color: "#555",
    margin: "10px 0 20px",
  },
  buttonContainer: {
    display: "flex",
    gap: "15px",
    justifyContent: "center",
  },
  imageContainer: {
    marginTop: "20px",
  },
  image: {
    maxWidth: "100%",
    height: "auto",
    borderRadius: "10px",
  },
};

export default SignUpSuccessPage;
