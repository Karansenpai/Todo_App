import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Appbar from "./Appbar";
import Signup from "./Signup";
import Signin from "./Signin";
import Landing from "./Landing";
import Todos from "./Todos";
import axios from "axios";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";


import { useSetRecoilState } from "recoil";

import { userInfo } from "./assets/Atoms/userinfo";
import { BASE_URL } from "./config";
import { useEffect } from "react";

function App() {
  return (
    <RecoilRoot>
      <div>
        <Router>
          <Appbar />
          <InitUser />
          <Routes>
            <Route path="/" element={<Landing />}></Route>
            <Route path="/todos" element={<Todos />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/signin" element={<Signin/>}></Route>
          </Routes>
        </Router>
      </div>
    </RecoilRoot>
  );
}


export function InitUser() {
  const setUser = useSetRecoilState(userInfo);
  const init = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/me`, {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token"),
        },
      });
      if (response.data.username) {
        setUser({
          username: response.data.username,
          password: null,
          isLoading: false,
        });
      } else {
        setUser({
          username: null,
          password: null,
          isLoading: false,
        });
      }
    } catch (e) {
        setUser({
          username: null,
          password: null,
          isLoading: false,
        })
    }
    } 
  ;

  useEffect(() => {
    init();
  },[]);

  return <></>;
}
export default App;
