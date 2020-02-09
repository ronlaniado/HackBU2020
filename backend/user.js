const mongoose = require('mongoose');
const crypto = require('crypto');
const fs = require('fs');
const express = require('express');
const app = express();

mongoose.connect('mongodb://localhost/stock_market')
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.log('Could not connect to MongoDB...'));

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    shares: [{
        symbol: String,
        total_spent: Number,
        total_shares: Number,
        average_spent: Number
    }],
    transactions: [{
        t_symbol: String,
        t_date: Date,
        t_price: Number,
        t_shares_amount: Number
    }],
    balance: Number
});

const User = mongoose.model('User', userSchema);

async function newUser(username_, password_, balance_){
    const user = new User({
        username: username_,
        //password: crypto.createHash('sha3').update(password_).digest('hex'),
        balance: balance_
    });
    const result = await user.save();
    console.log(result);
}

async function deleteUser(id){
    const result = await User.deleteOne({_id: id});
    return result;
}

async function buyShare(id, share){
    const user = await User.findById(id);
    if(!course) return;
    const share_exists = user.shares.find(user.shares.symbol === symbol_);
    if(!share_exists){
        user.shares.push(share);
        updateBalance(id, -1 * share.total_shares() * get_prince(share.symbol))
    }
    else{
        user.shares[share_exists].total_shares += share.total_shares; 
        user.shares[share_exists].total_spent += share.total_shares * get_price(share.symbol); //PLACEHOLDER FOR API
        updateBalance(id, -1 * share.total_shares * get_price(share.symbol)) //PLACEHOLDER FOR API
    }
    const result = await user.save();
    return result;
}

async function sellShare(id, share){
    const user = await User.findById(id);
    if(!course) return;
    const share_exists = user.shares.find(user.shares.symbol === symbol_); 
    if(!share_exists){
        return;
    }
    else{
        if(share.total_shares > user.shares[share_exists]){
            user.shares[share_exists].splice(share_exists, 1);
            user.balance = updateBalance(share.total_shares * share.total_spent);
        }
        else{
            user.shares[share_exists].total_shares -= share.total_shares; 
            user.shares[share_exists].total_spent -= share.total_shares * get_price(share.symbol); //PLACEHOLDER FOR API
            updateBalance(id, share.total_shares * get_price(share.symbol)) //PLACEHOLDER FOR API
        }
    }
    const result = await user.save();
    return result;
}

async function updateBalance(id, balance_){
    const user = await User.findById(id);
    if(!course) return;
    user.balance += balance_;
    const result = await user.save();
    return result;
}

function getUserQuery(username_){
    var query = User.find({username: username_})
    if(query === undefined) return -1;
    return query;
}

app.use(express.json());


app.get('/:username', (req, res) => {
    getUserQuery(req.params.username).exec(function(err, users) {
        if(err) return;
        console.log(users);
        if(users.length === 0) res.status(404).send("User not found");
        users.forEach(function(user){
            console.log(req.params.user);
            res.send(user);
        });    
    });
});

app.post('/:username/:password/:balance', (req, res) => {
    getUserQuery(req.params.username).exec(function(err, users) {
        if(err) return;
        console.log(users);
        if(users.length === 0) res.status(404).send("User not found");
        users.forEach(function(user){
            console.log(req.params.user);
            res.send(user);
        });    
    });
});

app.put('/:username', (req, res) => {
    res.send(user);
});

app.delete('/', (req, res) => {
    res.send(user);
});

const port = process.env.PORT || 666;

app.listen(port, () => {
    console.log(`Listening port ${port}...`)
});

//newUser('kmanriq1', '12345', 10000);