const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const stockRoutes = express.Router();
const PORT = 4000;
const API = process.env.REACT_APP_IEX;

let Stonk = require('./stonk.model');

app.use(cors());
app.use(bodyParser.json());

var stocks = [];

mongoose.connect('mongodb://127.0.0.1:27017/todos', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

stockRoutes.route('/').get(function(req, res) {
    Stonk.find(function(err, args) {
        if (err) {
            console.log(err);
        } else {
            res.json(args);
        }
    });
});

// retrieve by ID
stockRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Stonk.findById(id, function(err, args) {
        res.json(args);
    });
});

// add
stockRoutes.route('/add').post(function(req, res) {
    let newAlert = new Stonk(req.body);
    newAlert.save()
        .then(newAlert => {
            res.status(200).json({'alert': 'added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding failed');
        });
});

// list

app.use('/todos',stockRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});