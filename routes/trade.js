const express = require('express')
const tradesRouter = express.Router()
const Trade = require("../models/trade")


// Get all
tradesRouter.get('/', (req, res, next) => {
    console.log('trades route got hit')
    Trade.find((err, trade) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(trade)
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
    console.log(req.body)
    newTrade.save((err, trade) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(201).send(trade)
    })
})


module.exports = tradesRouter