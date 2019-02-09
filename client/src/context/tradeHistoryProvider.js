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
            symbolsTraded: [],
            symbolsTradesCount: [],
            totalTrades: [0],
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

    getTrades = (callback) => {
        axios.get(`/trades`).then(response => {
            let data = response.data
            let allTrades  = []

            data.forEach(trade => {
                if(trade.Action === "Buy" || trade.Action === "Sell"){
                    allTrades.push(trade)
                }
            });
            this.setState({ trades: allTrades } , () => callback(this.state.trades))
            //this.calculatePairs()
        })
    }

    calculatePairs = () => {
        let allTrades = this.state.trades;

        let symbolsTradedArr = []
        //let totalTradesCount = allTrades.length

        allTrades.forEach(trade => {
            symbolsTradedArr.push(trade.Symbol)
        })

        let symbols = this.state.symbolsTraded
        let count = symbols.reduce(function(r, e) {
            if(!r[e]) r[e] = {'symbol': e, 'total': 1}
            else r[e].total += 1
            return r;

        }, {})
        var result = Object.keys(count).map(e => count[e])

        this.setState({
            symbolsTraded:  symbolsTradedArr,
            symbolsTradesCount: result
        })
    }

    resetChartToDefault = () => {
        this.setState({
            showBubbleChartCurrencyQuantity: false,
            showBubbleChartTotalTrades: false,
            trades: [],
            symbolsTraded: [],
            symbolsTradesCount: [],
            totalTrades: [0],
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
                    getTrades: this.getTrades,
                    symbolsTradesCount: this.state.symbolsTradesCount,
                    totalTrades: this.state.totalTrades,
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


