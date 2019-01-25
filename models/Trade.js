const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tradeSchema = new Schema({
    Action: {
        type: String,
    },
    closePrice: {
        type: Number,
    },
    closeTime: {
        type: String,
    },
    openPrice: {
        type: Number,
    },
    openTime: {
        type: String,
    },
    Pips: {
        type: Number,
    },
    Profit: {
        type: Number,
    },
    Symbol: {
        type: String,
    }
})

module.exports = mongoose.model("Trade", tradeSchema)