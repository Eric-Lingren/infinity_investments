const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tradeSchema = new Schema({
    Ticket : {type: Number},
    OpenDate : {type: String},
    CloseDate : {type: String},
    Symbol : {type: String},
    Action : {type: String},
    Lots : {type: Number},
    SL : {type: Number},
    TP : {type: Number},
    OpenPrice : {type: Number},
    ClosePrice : {type: Number},
    Comission : {type: Number},
    Swap : {type: Number},
    Pips : {type: Number},
    Profit : {type: Number},
    Gain : {type: Number},
    Comment : {type: String},
    MagicNumber : {type: Number},
    Duration : {type: Number},
    ProfitablePercent : {type: Number},
    ProfitableTime : {type: String},
    Drawdown : {type: Number},
    RiskReward : {type: Number},
    MaxPips : {type: Number},
    MaxUSD : {type: Number},
    MinPips : {type: Number},
    MinUSD : {type: Number},
    EntryAccuracyPercent : {type: Number},
    ExitAccuracyPercent : {type: Number},
    ProfitMissedPips : {type: Number},
    ProfitMissedUSD : {type: Number},

})

module.exports = mongoose.model("Trade", tradeSchema)