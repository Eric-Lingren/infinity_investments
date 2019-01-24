const express = require('express')
const tradesRouter = express.Router()
const Trades = require("../models/Trade")


// Get all
tradesRouter.get('/', (req, res, next) => {
    Trades.find((err, trades) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(trades)
    })
})


// Get one
tradesRouter.get('/:id', (req, res, next) => {
    Trade.findOne({_id: req.params.id} , (err, trade) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(trade)
    })
})


// Add One
tradesRouter.post('/', (req, res, next) => {
    console.log('post request got hit')
    const newTrade = new Trade(req.body)
    newTrade.save((err, trade) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(201).send(trade)
    })
})


module.exports = tradesRouter