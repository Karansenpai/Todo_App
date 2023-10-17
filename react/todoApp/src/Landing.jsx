import React from "react";
import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom"; // Assuming you're using React Router for navigation
import { userInfo } from "./assets/Atoms/userinfo";
import { useRecoilValue, useSetRecoilState } from "recoil";

function Landing() {
  const user = useRecoilValue(userInfo);
  const setUser = useSetRecoilState(userInfo);

  if (user.isLoading) {
    return <></>;
  }


  if (!user.username){
  return (
    <div style={{ textAlign: "center", padding: "20px", margin: "100px" }}>
      <Typography variant="h2" component="h1" gutterBottom>
        Welcome to TODO PAGE
      </Typography>
      <Typography variant="h5" component="h2" color="textSecondary">
        Stay organized and get things done with our simple ToDo app.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        size="large"
        style={{ marginTop: "20px" }}
        component={Link}
        to="/signup" // Assuming "/todos" is the route to your ToDo list
      >
        SIGN UP
      </Button>
    </div>
  );
  }
  else{
    return (
      <div style={{ textAlign: "center", padding: "20px", margin: "100px" }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to TODO PAGE
        </Typography>
        <Typography variant="h5" component="h2" color="textSecondary">
          Stay organized and get things done with our simple ToDo app.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          style={{ marginTop: "20px" }}
          component={Link}
          to="/todos" // Assuming "/todos" is the route to your ToDo list
        >
          MY TODOS
        </Button>
      </div>
    );
  }
}

export default Landing;
