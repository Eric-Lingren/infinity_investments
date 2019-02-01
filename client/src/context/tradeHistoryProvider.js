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

    getTrades = () => {
        axios.get(`/trades`).then(response => {
            let data = response.data
            data.forEach(element => {
                if(element.Action === "Buy" || element.Action === "Sell"){
                    this.setState( prevState => ({
                        trades: [...prevState.trades, element]
                    }))
                }
            });
            this.calculatePairs()
        })
    }

    calculatePairs = () => {
        let allTrades = this.state.trades;
        allTrades.forEach(trade => {
            this.setState(prevState => ({
                symbolsTraded:  [...prevState.symbolsTraded, trade.Symbol],
                totalTrades: [allTrades.length]
            }))
        })
        
        let symbols = this.state.symbolsTraded
        let count = symbols.reduce(function(r, e) {
            if(!r[e]) r[e] = {'symbol': e, 'total': 1}
            else r[e].total += 1
            return r;

        }, {})
        var result = Object.keys(count).map(e => count[e])
        //console.log(result)

        this.setState({
            symbolsTradesCount: result
        })
    }

    toggleChartFromTotalTradesToCurrencyTotals = () => {

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


