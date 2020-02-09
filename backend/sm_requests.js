const Joi = require('joi');
const user = require('./user')
const express = require('express');
const app = express();

app.use(express.json());

app.get('/buy/', (req, res) => {
    res.send(user)
});

app.post(){
    
}