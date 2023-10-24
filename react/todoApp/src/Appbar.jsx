import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { userInfo } from "./assets/Atoms/userinfo";
import { useRecoilValue, useSetRecoilState } from "recoil";

// Define CSS styles
const appBarStyles = {
  backgroundColor: "#161616",
  height: 110,
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
};

const titleStyles = {
  color: "white",
  margin: 30,
};

const buttonStyles = {
  backgroundColor: "#eeeeee",
  fontWeight: "bold",
  color: "black",
  marginRight: 10,
};

function Appbar() {
  const user = useRecoilValue(userInfo);
  const setUser = useSetRecoilState(userInfo);
  const navigate = useNavigate();

  if (user.isLoading) {
    return <></>;
  }

  if (user.username) {
    return (
      <div style={appBarStyles}>
        <div>
          <Typography variant="h4" style={titleStyles}>
            MY TODO LIST
          </Typography>
        </div>

        <div style={{ display: "flex", margin: 30 }}>
          <div style={{ marginRight: 10 }}>
            <Button variant="contained" style={buttonStyles}
            onClick={()=>{
              navigate("/todos")
            }}
            >
              MY TODOS
            </Button>
            <Button
              variant="contained"
              style={buttonStyles}
              onClick={() => {
                navigate("/");
              }}
            >
              HOME
            </Button>

            <Button
              variant={"contained"}
              onClick={() => {
                localStorage.setItem("token", null);
                setUser({
                  username: null,
                  password: null,
                });
                window.location = "/";
              }}
              style={buttonStyles}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={appBarStyles}>
      <div>
        <Typography variant="h4" style={titleStyles}>
          MY TODO LIST
        </Typography>
      </div>

      <div style={{ display: "flex", margin: 30 }}>
        <div style={{ marginRight: 10 }}>
          <Button
            variant="contained"
            style={buttonStyles}
            onClick={() => {
              navigate("/signup");
            }}
          >
            SIGN UP
          </Button>
        </div>
        <div>
          <Button
            variant="contained"
            style={buttonStyles}
            onClick={() => {
              navigate("/signin");
            }}
          >
            SIGN IN
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Appbar;
