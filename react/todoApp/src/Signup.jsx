import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useSetRecoilState } from "recoil";
import { userInfo } from "./assets/Atoms/userinfo";
import { BASE_URL } from "./config.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

// Define CSS styles
const containerStyles = {
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  margin: "100px auto",
  textAlign: "center",
  backgroundColor: "#f5f5f5",
  borderRadius: "8px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  maxWidth: "1200px",
  padding: "20px",
};

const leftContentStyles = {
  flex: 1,
  padding: "20px",
  margin: "20px",
};

const rightContentStyles = {
  flex: 1,
  padding: "20px",
  margin: "20px",
  marginRight: "20px",
};

const formContainerStyles = {
  backgroundColor: "white",
  borderRadius: "8px",
  padding: "20px",
  height: 300,
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
};

const formTitleStyles = {
  textAlign: "center",
  fontWeight: "bold",
  color: "#007bff",
};

const inputStyles = {
  width: "100%",
};

const signupButtonStyles = {
  backgroundColor: "#007bff",
  color: "white",
  width: "100%",
  marginTop: "20px",
};

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setUser = useSetRecoilState(userInfo);
  const navigate = useNavigate();

  const handleSignup = async () => {
    const response = await axios.post(`${BASE_URL}/signup`, {
      username: email,
      password: password,
    });
    let data = response.data;
    if (data.token) {
      localStorage.setItem("token", data.token);
      setUser({ username: email, password: password, isLoading: false });
      navigate("/");
    }
    else alert(data.message);
  };

  return (
    <div style={containerStyles}>
      <div style={leftContentStyles}>
        <Typography variant="h4" component="h4" style={{ color: "#007bff" }}>
          <b>Create An Account</b>
        </Typography>
        <br />
        <Typography
          variant="h5"
          component="h5"
          style={{ textAlign: "center", color: "#555" }}
        >
          We're glad you're here. <br /> Let's get started by
          <br /> creating your account.
        </Typography>
      </div>
      <div style={rightContentStyles}>
        <div style={formContainerStyles}>
          <Typography variant="h5" component="h5" style={formTitleStyles}>
            Sign Up
          </Typography>
          <br />
          <TextField
            id="filled-basic"
            style={inputStyles}
            label="Email"
            variant="filled"
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <br />
          <TextField
            id="filled-basic"
            label="Password"
            variant="filled"
            style={inputStyles}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          <Button
            variant="contained"
            onClick={handleSignup}
            style={signupButtonStyles}
          >
            SIGN UP
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
