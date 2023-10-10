const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();
const jwt = require("jsonwebtoken");
app.use(cors());
app.use(express.json());

const port = 3000;

const SECRET = "SECRETKEY";


//username is an object of {username: name}
const generateToken = (username) => {
  return jwt.sign({username}, SECRET, { expiresIn: "1h" });
};


const authenticateJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

app.post("/signup", (req,res)=>{
  const user = req.body;
  fs.readFile("USERS.json","utf-8",(err,data)=>{
    if(err) throw err;

    var USERS = JSON.parse(data);
    user["id"] = USERS.length+1;
    const userIndex = USERS.find(e => e.username == user.username && e.password == user.password);

    if(!userIndex){
      USERS.push(user);
      fs.writeFileSync("USERS.json",JSON.stringify(USERS));
      const token = generateToken(user.username);
      res.json({
        message: "user createad",
        token: token
      });
    }
    else{
      res.send({message: "USER ALREADY EXIST"});
    }
  })
})

app.post("/signin", (req,res)=>{
  const {username, password} = req.body;
  fs.readFile("USERS.json","utf-8",(err,data)=>{
    if(err) throw err;

    var USERS = JSON.parse(data);
    var user = USERS.find(u=> u.username == username && u.password == password);
    if(user){
      const token = generateToken(username);
      res.json({ message: "User logged in successfully", token: token });
      
    }
    else{
      res.send({message: "No user of this email and password"});
    }
  })
})

app.get("/me",authenticateJwt, (req,res)=>{
 res.json({username:req.user.username});
})

app.get("/", (req, res) => {
  res.send("HEllO KARAN");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
