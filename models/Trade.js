const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tradeSchema = new Schema({
    action: {
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
    pips: {
        type: Number,
    },
    profit: {
        type: Number,
    },
    symbol: {
        type: String,
    }
})

module.exports = mongoose.model("Trade", tradeSchema)