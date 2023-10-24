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

      if(response.data.todos){
        setTodos(response.data.todos);
      }
    };
    init();
    
  },[]); 

  const addTodo = async () => {
    if (Todo.length === 0) {
      alert("Enter what you want to do");
    } else {
      const response = await axios.post(
        `${BASE_URL}/addTodo`,
        { Todo },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      alert(response.data.message);
      setTodos([...Todos, Todo]);
      setTodo(""); 
    }
  };

  const deleteTodo = async (index) => {
    console.log(index);
    const response = await axios.delete(`${BASE_URL}/deleteTodo/${index}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    if (response.data.message) {
      const updatedTodos = [...Todos];
      updatedTodos.splice(index, 1);
      setTodos(updatedTodos);
      alert(response.data.message);
    } else {
      alert("Failed to delete the todo.");
    }
  };

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
          value={Todo}
          onChange={(e) => setTodo(e.target.value)}
          style={textFieldStyle}
        />
        <Button
          variant="contained"
          onClick={addTodo}
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
              <Button
                variant="contained"
                style={deleteButtonStyle}
                onClick={() => deleteTodo(index)}
              >
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
  background: "url('your-image-url')",
  backgroundSize: "cover",
};

const todoItemStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "500px",
  margin: "10px auto",
  padding: "20px",
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  borderRadius: "10px",
};

const todoTextStyle = {
  textAlign: "left",
};

const actionContainerStyle = {
  display: "flex",
  alignItems: "center",
};

const deleteButtonStyle = {
  backgroundColor: "#f44336",
  color: "white",
};
