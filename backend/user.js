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

/*
============ User functions ============
- newUser(): creates new document in database 
- deleteUser(): removes document from database 
- buyShare(): adds a share to user's list of shares, changes 
    recalculate user balance (balance - total spent in transaction)
- sellShare(): subtracts number of shares from user's list of shares 
    recalculate user balance 
- updateBalance(): add value (+/-) to user's balance
- NOTE: for all functions above, check if username exists in database. Otherwise, do not execute the transaction 
- getUserQuery(): checks if a user exists in database by username
*/

//async function newUser(username_, password_, balance_){

async function deleteUser(id){
    const result = await User.deleteOne({_id: id});
    return result;
}

async function buyShare(total_shares_, current_price_){
    const user = await User.findById(id);
    if(!user) return;
    const share_exists = user.shares.find(user.shares.symbol === symbol_);
    if(!share_exists){
        user.shares.push(share);
        user.shares[user.shares.length - 1].average_spent = current_price;
        updateBalance(id, -1 * total_shares_ * current_price_);
    }
    else{
        user.shares[share_exists].total_shares += total_shares_; 
        user.shares[share_exists].total_spent += total_shares_ * current_price_; //PLACEHOLDER FOR API
        user.shares[share_exists].average_spent = total_spent / total_shares;
        updateBalance(id, -1 * total_shares_ * current_price_); //PLACEHOLDER FOR API
    }
    const result = await user.save();
    return result;
}

async function sellShare(id, total_shares_, current_price_){
    const user = await User.findById(id);
    if(!user) return;
    const share_exists = user.shares.find(user.shares.symbol === symbol_); 
    if(!share_exists){
        return;
    }
    else{
        if(share.total_shares > user.shares[share_exists]){
            user.shares[share_exists].splice(share_exists, 1);
            updateBalance(total_shares * current_price_);
        }
        else{
            user.shares[share_exists].total_shares -= total_shares_; 
            user.shares[share_exists].total_spent -= total_shares_ * current_price_; //PLACEHOLDER FOR API
            user.shares[share_exists].average_spent = user.total_spent / user.total_shares 
            updateBalance(username, total_shares_ * current_price_) //PLACEHOLDER FOR API
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

/*
============ REQUESTS ============ 
GET: used to get info about user and pass it to frontend. Pass info in a JSON
POST: create new user and save it in database (info passed from frontend to backend in a JSON)
PUT: when user buys shares (info passed from frontend to backend in a JSON)
PUT: when user sells shares (info passed from frontend to backend in a JSON)
PUT: when user wants to withdraw money from balance (info passed from frontend to backend in a JSON)
PUT: when user wants to deposit money to balance (info passed from frontend to backend in a JSON)
PUT: when user wants to modify password (info passed from frontend to backend in a JSON)
DELETE: when user wants to delete its account (info passed from frontend to backend in a JSON)
*/

//send entire user
app.get('/:username', (req, res) => {
    getUserQuery(req.params.username).exec(function(err, users) {
        if(err) return;
        console.log(users);
        if(users.length === 0) res.status(404).send("User not found");
        users.forEach((user) => {
            res.send(user);
        });    
    });
});

//create user
//NOTE: check this link to implement password
//https://www.thepolyglotdeveloper.com/2019/02/hash-password-data-mongodb-mongoose-bcrypt/

app.post('/', (req, res) => {
    getUserQuery(req.body.username).exec((err, users) => {
        if(err) return;
        if(users.length !== 0){
            res.status(400).send("Username already exists");
        } 
        else {
            var data_u = new User(req.body);
            data_u.save()
                .then(item => {
                    res.send(data_u);
                })
                .catch(err => {
                    res.status(400).send("Unable to save data");
                });
        }
    });
});

//buy/sell shares
app.put('/', (req, res) => { 
    getUserQuery(req.params.username).exec(function(err, users) {
        if(err) return;
        console.log(users);
        if(users.length === 0) res.status(404).send("User not found");
        users.forEach(function(user){
            console.log(req.body.username);
        });    
    });
});

//remove username
app.delete('/:username', (req, res) => {
    var user_del = null;
    getUserQuery(req.body.username).exec((err, users) => {
        if(err) return;
        if(users.length === 0){
            res.status(400).send("Username does not exist");
        }
        users.forEach((user) => {
            user_del = new User(user);
        });
    });
    User.findOneAndDelete({username: req.params.username}, (err) => {
        res.send(user_del);
    });
});

const port = process.env.PORT || 666;

app.listen(port, () => {
    console.log(`Listening port ${port}...`)
});

let val = 0;
if (val = 0) {
    newUser('kmanriq1', 10000);
    val++;
}
//