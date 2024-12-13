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

      {/* New Section: Image and Explanation Side by Side */}
      <div style={styles.newSection}>
        <div style={styles.textSection}>
          <h2 style={styles.subTitle}>Discover Your Potential</h2>
          <p style={styles.loremText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
            tincidunt, urna in dignissim pharetra, elit sapien tempus purus, in
            pretium metus ex vitae orci. Curabitur vehicula, felis nec vulputate
            tincidunt, tortor eros auctor sapien, et feugiat nisi urna non
            lorem.
          </p>
        </div>
        <div style={styles.sideImageContainer}>
          <img
            src={celebrationImage}
            alt="Potential Celebration"
            style={styles.sideImage}
          />
        </div>
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
  newSection: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "40px",
    padding: "20px",
    gap: "20px",
    width: "100%",
    maxWidth: "800px",
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  },
  textSection: {
    flex: 1,
    textAlign: "left",
  },
  loremText: {
    fontSize: "1rem",
    color: "#666",
    lineHeight: "1.6",
  },
  subTitle: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  sideImageContainer: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  sideImage: {
    maxWidth: "100%",
    height: "auto",
    borderRadius: "10px",
  },
};

export default SignUpSuccessPage;
