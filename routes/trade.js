const express = require('express')
const tradesRouter = express.Router()
const Trade = require("../models/Trade")


// Get all
tradesRouter.get('/', (req, res, next) => {
    console.log('get all route got hit')
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

// Delete one
tradesRouter.delete('/:id', (req, res, next) => {
    Trade.findOneAndRemove({_id: req.params.id} , (err, deletedTrade) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(deletedTrade + ' was succesfully removed.')
    })
})


module.exports = tradesRouter