const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cors());


const UserController = require("./controllers/UserController");
const FoodTypeContoller = require("./controllers/FoodTypeContoller");

app.post('/api/user/signIn', (req, res) => UserController.signIn(req, res));
app.post('/api/foodType/create', (req, res) => FoodTypeContoller.create(req, res));
app.get('/api/foodType/list', (req, res) => FoodTypeContoller.list(req, res));
app.delete('/api/foodType/remove/:id', (req, res) => FoodTypeContoller.remove(req, res));
app.put('/api/foodType/update', (req, res) => FoodTypeContoller.update(req, res));

app.listen(3001, ()=> {
    console.log("API Server Running on Port 3001");
})