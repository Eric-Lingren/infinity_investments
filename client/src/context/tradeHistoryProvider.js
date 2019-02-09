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

    getTrades = () => {
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
                    getTrades: this.getTrades,
                    calculatePairs: this.calculatePairs,

                    symbolsTradesCount: this.state.symbolsTradesCount,
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


