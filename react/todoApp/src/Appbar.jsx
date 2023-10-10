import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { userInfo } from "./assets/Atoms/userinfo";
import { useRecoilValue, useSetRecoilState } from "recoil";

function Appbar() {
  const user = useRecoilValue(userInfo);
  const setUser = useSetRecoilState(userInfo);
  const navigate = useNavigate();
  if(user.isLoading){
    return <></>
  }
  if (user.username) {
    return (
      <div
        style={{
          backgroundColor: "#161616",
          height: 110,
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <Typography variant="h4" style={{ color: "white", margin: 30 }}>
            MY TODO LIST
          </Typography>
        </div>

        <div style={{ display: "flex", margin: 30 }}>
          <div style={{ marginRight: 10 }}>
            <Button
              variant="contained"
              style={{
                backgroundColor: "#eeeeee",
                fontWeight: "bold",
                color: "black",
              }}
            >
              MY TODOS
            </Button>
            <Button
              variant="contained"
              style={{
                backgroundColor: "#eeeeee",
                fontWeight: "bold",
                color: "black",
              }}
              onClick={() => {
                navigate("/signup");
              }}
            >
              ADD TODOS
            </Button>

            <Button
              variant={"contained"}
              onClick={() => {
                localStorage.setItem("token", null);
                setUser({
                  username: null,
                  password: null,
                });
                window.location="/";
              }}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div
      style={{
        backgroundColor: "#161616",
        height: 110,
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div>
        <Typography variant="h4" style={{ color: "white", margin: 30 }}>
          MY TODO LIST
        </Typography>
      </div>

      <div style={{ display: "flex", margin: 30 }}>
        <div style={{ marginRight: 10 }}>
          <Button
            variant="contained"
            style={{
              backgroundColor: "#eeeeee",
              fontWeight: "bold",
              color: "black",
            }}
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
            style={{
              backgroundColor: "#eeeeee",
              fontWeight: "bold",
              color: "black",
            }}
            onClick={()=>{
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
