import React, { Component } from 'react';
import axios from 'axios'

const TradeHistoryContext = React.createContext()

class TradeHistoryProvider extends Component {
    constructor(){
        super()
        this.state = {
            establishedSession: 'DDY5sAaCWPmneYrCsyQi140055',
            accounts: [],
            liveAccountId: '',
            demoAccountId: '',
            trades: [],
            symbolsTradesCount: [],
            symbols2019TradesCount: [],
            symbols2018TradesCount: [],
            symbols2017TradesCount: [],
            all2019Trades: [],
            all2018Trades: [],
            all2017Trades: [],
            daily2017Gains: [],
            daily2018Gains: [],
            daily2019Gains: [],
            allDailyGains: [],
            whichChartToShow: 'TotalTradeQuantityChart',
        }
    }

    getMyAccounts = () => {
        // axios.get(`https://vschool-cors.herokuapp.com?url=https://www.myfxbook.com/api/get-my-accounts.json?session=${this.state.establishedSession}`).then(response => { 
        //     this.setState({
        //         accounts: response.data.accounts,
        //         liveAccountId: response.data.accounts[0].id,
        //         demoAccountId: response.data.accounts[3].id,
        //         })
        //     //this.getTradeHistoryLiveAccount()
        // })
    }

    getAllTrades = () => {
        axios.get(`/trades`).then(response => {
            let data = response.data
            let allTrades  = []

            data.forEach(trade => {
                if(trade.Action === "Buy" || trade.Action === "Sell"){
                    allTrades.push(trade)
                }
            });

            this.setState({ trades: allTrades }, () => this.getAllTradesGrowth() )
        })
    }

    getAllTradesGrowth = () => {
        let allTrades = this.state.trades
        let dailyTradesArr = []
        let cumulativeGains = 0

        allTrades.forEach(trade => { 
            cumulativeGains += trade.Gain
            let myDataObjectPair = {}
            myDataObjectPair['y'] = cumulativeGains
            dailyTradesArr.push(myDataObjectPair) 
        })
        this.setState({allDailyGains: dailyTradesArr})
    }

    getAll2019Trades = () => {
        let allTrades = this.state.trades
        let all2019Trades = []

        allTrades.forEach(trade => {
            if(trade.CloseDate.includes('2019')){
                all2019Trades.push(trade)
            }
        })

        this.setState({ all2019Trades: all2019Trades }, () => this.get2019Growth() )
    }

    get2019Growth = () => {
        let all2019Trades = this.state.all2019Trades
        let dailyTradesArr = []
        let cumulativeGains = 0

        all2019Trades.forEach(trade => { 
            cumulativeGains += trade.Gain
            let myDataObjectPair = {}
            myDataObjectPair['y'] = cumulativeGains
            dailyTradesArr.push(myDataObjectPair) 
        })
        this.setState({daily2019Gains: dailyTradesArr})
    }


    getAll2018Trades = () => {
        let allTrades = this.state.trades
        let all2018Trades = []

        allTrades.forEach(trade => {
            if(trade.CloseDate.includes('2018')){
                all2018Trades.push(trade)
            }
        })

        this.setState({ all2018Trades: all2018Trades }, () => this.get2018Growth() )
    }

    get2018Growth = () => {
        let all2018Trades = this.state.all2018Trades
        let dailyTradesArr = []
        let cumulativeGains = 0

        all2018Trades.forEach(trade => { 
            cumulativeGains += trade.Gain
            let myDataObjectPair = {}
            myDataObjectPair['y'] = cumulativeGains
            dailyTradesArr.push(myDataObjectPair) 
        })
        this.setState({daily2018Gains: dailyTradesArr})
    }

    getAll2017Trades = () => {
        let allTrades = this.state.trades
        let all2017Trades = []

        allTrades.forEach(trade => {
            if(trade.CloseDate.includes('2017')){
                all2017Trades.push(trade)
            }
        })

        this.setState({ all2017Trades: all2017Trades } , () => this.get2017Growth() )
    }

    get2017Growth = () => {
        let all2017Trades = this.state.all2017Trades
        let dailyTradesArr = []
        let cumulativeGains = 0

        all2017Trades.forEach(trade => { 
            cumulativeGains += trade.Gain
            let myObjectPair = {}
            myObjectPair['y'] = cumulativeGains
            dailyTradesArr.push(myObjectPair) 
        })
        this.setState({daily2017Gains: dailyTradesArr})

        // let countDailyGain = dailyTradesArr.reduce(function(r, e) {
        //     if(!r[e.date]) r[e.date] =  e.gain
        //     else r[e.date] += e.gain
        //     return r;
        // }, {})
        // //this.setState({daily2017Gains: countDailyGain})
    }

    calculateAllPairs = () => {
        let allTrades = this.state.trades;
        let symbolsTradedArr = []
        
        allTrades.forEach(trade => { symbolsTradedArr.push(trade.Symbol) })

        let countTotals = symbolsTradedArr.reduce(function(r, e) {
            if(!r[e]) r[e] = {'symbol': e, 'total': 1}
            else r[e].total += 1
            return r;
        }, {})

        let pairsQuantityResult = Object.keys(countTotals).map(e => countTotals[e])

        this.setState({ symbolsTradesCount: pairsQuantityResult })
    }

    calculate2019Pairs = () => {
        let all2019Trades = this.state.all2019Trades
        let symbolsTradedArr = []
        
        all2019Trades.forEach(trade => { symbolsTradedArr.push(trade.Symbol) })

        let countTotals = symbolsTradedArr.reduce(function(r, e) {
            if(!r[e]) r[e] = {'symbol': e, 'total': 1}
            else r[e].total += 1
            return r;
        }, {})

        let pairsQuantityResult = Object.keys(countTotals).map(e => countTotals[e])

        this.setState({ symbols2019TradesCount: pairsQuantityResult })
    }

    calculate2018Pairs = () => {
        let all2018Trades = this.state.all2018Trades
        let symbolsTradedArr = []
        
        all2018Trades.forEach(trade => { symbolsTradedArr.push(trade.Symbol) })

        let countTotals = symbolsTradedArr.reduce(function(r, e) {
            if(!r[e]) r[e] = {'symbol': e, 'total': 1}
            else r[e].total += 1
            return r;
        }, {})

        let pairsQuantityResult = Object.keys(countTotals).map(e => countTotals[e])

        this.setState({ symbols2018TradesCount: pairsQuantityResult })
    }

    calculate2017Pairs = () => {
        let all2017Trades = this.state.all2017Trades
        let symbolsTradedArr = []
        
        all2017Trades.forEach(trade => { symbolsTradedArr.push(trade.Symbol) })

        let countTotals = symbolsTradedArr.reduce(function(r, e) {
            if(!r[e]) r[e] = {'symbol': e, 'total': 1}
            else r[e].total += 1
            return r;
        }, {})

        let pairsQuantityResult = Object.keys(countTotals).map(e => countTotals[e])

        this.setState({ symbols2017TradesCount: pairsQuantityResult })
    }

    resetChartToDefault = () => {
        this.setState({
            showBubbleChartCurrencyQuantity: false,
            showBubbleChartTotalTrades: false,
            trades: [],
            symbolsTradesCount: [],
        })
    }

    setWhichChartToShow = (e) => {
        this.setState({
            whichChartToShow: e
        })
    }

    render(){
        return (
            <TradeHistoryContext.Provider 
                value={{
                    establishedSession: this.state.establishedSession,
                    accounts: this.state.accounts,
                    trades: this.state.trades,
                    getAllTrades: this.getAllTrades,
                    calculateAllPairs: this.calculateAllPairs,
                    symbolsTradesCount: this.state.symbolsTradesCount,
                    calculate2019Pairs: this.calculate2019Pairs,
                    symbols2019TradesCount: this.state.symbols2019TradesCount,
                    calculate2018Pairs: this.calculate2018Pairs,
                    symbols2018TradesCount: this.state.symbols2018TradesCount,
                    calculate2017Pairs: this.calculate2017Pairs,
                    symbols2017TradesCount: this.state.symbols2017TradesCount,
                    getAll2019Trades: this.getAll2019Trades,
                    all2019Trades: this.state.all2019Trades,
                    getAll2018Trades: this.getAll2018Trades,
                    all2018Trades: this.state.all2018Trades,
                    getAll2017Trades: this.getAll2017Trades,
                    all2017Trades: this.state.all2017Trades,
                    get2017Growth: this.get2017Growth,
                    daily2017Gains: this.state.daily2017Gains,
                    daily2018Gains: this.state.daily2018Gains,
                    daily2019Gains: this.state.daily2019Gains,
                    allDailyGains: this.state.allDailyGains,
                    setWhichChartToShow: this.setWhichChartToShow,
                    whichChartToShow: this.state.whichChartToShow,
                    // showBubbleChartTotalTrades: this.state.showBubbleChartTotalTrades,
                    // showBubbleChartCurrencyQuantity: this.state.showBubbleChartCurrencyQuantity,
                    // toggleChartFromTotalTradesToCurrencyTotals: this.toggleChartFromTotalTradesToCurrencyTotals,
                    resetChartToDefault: this.resetChartToDefault,
                }}>
                { this.props.children }
            </TradeHistoryContext.Provider>
        )
    }
}

export default TradeHistoryProvider

export const withTradeHistory = C => props => (
    <TradeHistoryContext.Consumer>
        {value => <C {...props} {...value}/>}
    </TradeHistoryContext.Consumer>
)


