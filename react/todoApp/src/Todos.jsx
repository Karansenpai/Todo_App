import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography, Button, TextField } from "@mui/material";
import { BASE_URL } from "./config";

function Todos() {
  const [Todo, setTodo] = useState("");
  const [Todos, setTodos] = useState([]);

  useEffect(() => {
    const init = async () => {
      const response = await axios.get(`${BASE_URL}/todos`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setTodos(response.data.todos);
    };

    init();
  });

  return (
    <div style={mainContainerStyle}>
      <div style={headerContainerStyle}>
        <Typography variant="h3" style={headerTextStyle}>
          TODOS
        </Typography>
      </div>

      <div style={inputContainerStyle}>
        <TextField
          id="filled-basic"
          label="What do you need to do?"
          variant="filled"
          onChange={(e) => setTodo(e.target.value)}
          style={textFieldStyle}
        />
        <Button
          variant="contained"
          onClick={async () => {
            if (Todo.length === 0) {
              alert("Enter what you want to do");
            } else {
              const response = await axios.post(
                `${BASE_URL}/addTodo`,
                {
                  Todo,
                },
                {
                  headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                  },
                }
              );
              alert(response.data.message);
            }
          }}
          style={buttonStyle}
        >
          ADD
        </Button>
      </div>

      <div style={todosContainerStyle}>
        {Todos.map((todo, index) => (
          <div key={index} style={todoItemStyle}>
            <Typography variant="h5" style={todoTextStyle}>
              {todo}
            </Typography>
            <div style={actionContainerStyle}>
              <input type="checkbox" style={checkboxStyle} />
              <Button variant="contained" style={deleteButtonStyle}>
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Todos;

const mainContainerStyle = {
  textAlign: "center",
};

const headerContainerStyle = {
  margin: "30px",
};

const headerTextStyle = {
  color: "#3f51b5",
};

const inputContainerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "20px",
};

const textFieldStyle = {
  width: "300px",
};

const buttonStyle = {
  marginLeft: "10px",
  backgroundColor: "#3f51b5",
  color: "white",
};

const todosContainerStyle = {
  width: "100%",
  background: "url('your-image-url')", // Add your background image or color
  backgroundSize: "cover",
};

const todoItemStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "500px", // Broader width
  margin: "10px auto",
  padding: "20px", // Increased padding
  backgroundColor: "rgba(255, 255, 255, 0.9)", // A semi-transparent white background
  borderRadius: "10px", // Increased border radius
};

const todoTextStyle = {
  textAlign: "left",
};

const actionContainerStyle = {
  display: "flex",
  alignItems: "center",
};

const checkboxStyle = {
  marginLeft: "10px",
};

const deleteButtonStyle = {
  backgroundColor: "#f44336",
  color: "white",
};
