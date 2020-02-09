const mongoose = require('mongoose');
const crypto = require('crypto');
const fs = require('fs');

mongoose.connect('mongodb://localhost/stock_market')
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.log('Could not connect to MongoDB...'));

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    shares: [{
        symbol: String,
        total_spent: Number,
        total_shares: Number
    }],
    transactions: [{
        t_symbol: String,
        t_date: Date,
        t_price: Number,
        t_shares_amount: Number
    }],
    balance: Number
});

async function newUser(username_, password_, balance_){
    const user = new User({
            username: username_,
            password: crypto.createHash('sha3').update(password_).digest('hex'),
            balance: balance_
    });
    const result = await user.save();
    console.log(result);
}

async function buyShare(id, share){
    const user = await User.findById(id);
    if(!course) return;
    const share_exists = user.shares.find(user.shares.symbol === symbol_);
    if(!share_exists){
        user.shares.push(share);
    }
    else{
        user.shares[share_exists].total_shares += share.total_shares; 
        user.shares[share_exists].total_spent += share.total_spent;
    }
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
            balance = updateBalance(share.total_shares * share.total_spent);
        }
        else{
            user.shares[share_exists].total_shares -= share.total_shares; 
            user.shares[share_exists].total_spent -= share.total_spent;
            updateBalance(id, share.total_shares * get_price(share.symbol))
        }
    }
}

async function updateBalanceFrom(id, balance_){
    const user = await User.findById(id);
    if(!course) return;
    const share_exists = user.shares.find(user.shares.symbol === symbol_);
}
