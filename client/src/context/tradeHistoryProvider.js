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
            all2019Trades: [],
            all2018Trades: [],
            all2017Trades: [],
            daily2017Gains: [],
            showBubbleChartTotalTrades: true,
            showBubbleChartCurrencyQuantity: false,
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

            this.setState({ trades: allTrades })
        })
    }

    getAll2019Trades = () => {
        let allTrades = this.state.trades
        let all2019Trades = []

        allTrades.forEach(trade => {
            if(trade.CloseDate.includes('2019')){
                all2019Trades.push(trade)
            }
        })

        this.setState({ all2019Trades: all2019Trades })
    }

    getAll2018Trades = () => {
        let allTrades = this.state.trades
        let all2018Trades = []

        allTrades.forEach(trade => {
            if(trade.CloseDate.includes('2018')){
                all2018Trades.push(trade)
            }
        })

        this.setState({ all2018Trades: all2018Trades })
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


        let countDailyGain = dailyTradesArr.reduce(function(r, e) {
            if(!r[e.date]) r[e.date] =  e.gain
            else r[e.date] += e.gain
            return r;
            
        }, {})
        //this.setState({daily2017Gains: countDailyGain})
        
    }

    calculatePairs = () => {
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

    resetChartToDefault = () => {
        this.setState({
            showBubbleChartCurrencyQuantity: false,
            showBubbleChartTotalTrades: false,
            trades: [],
            symbolsTradesCount: [],
        })
    }

    toggleChartFromTotalTradesToCurrencyTotals = () => {
        this.setState({
            showBubbleChartTotalTrades: false,
            showBubbleChartCurrencyQuantity: true,
            
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
                    calculatePairs: this.calculatePairs,
                    symbolsTradesCount: this.state.symbolsTradesCount,
                    getAll2019Trades: this.getAll2019Trades,
                    all2019Trades: this.state.all2019Trades,
                    getAll2018Trades: this.getAll2018Trades,
                    all2018Trades: this.state.all2018Trades,
                    getAll2017Trades: this.getAll2017Trades,
                    all2017Trades: this.state.all2017Trades,
                    get2017Growth: this.get2017Growth,
                    daily2017Gains: this.state.daily2017Gains,

                    showBubbleChartTotalTrades: this.state.showBubbleChartTotalTrades,
                    showBubbleChartCurrencyQuantity: this.state.showBubbleChartCurrencyQuantity,
                    toggleChartFromTotalTradesToCurrencyTotals: this.toggleChartFromTotalTradesToCurrencyTotals,
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


