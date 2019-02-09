import React, { Component } from 'react';
//import TradeHistoryProvider from './tradeHistoryProvider';

const TradeDataContext = React.createContext()

class TradeDataProvider extends Component {
    constructor(){
        super()
        this.state = {
            sampleData: [1,2,3],
            //totalTradesTaken: []
        }
    }

    // pullAllTradeData = (trades) => {
    //     this.setState({totalTradesTaken: [trades.length]} )
    // }

    render(){
        return (
            <TradeDataContext.Provider 
                value={{
                    sampleData: this.state.sampleData,
                    // pullAllTradeData: this.pullAllTradeData,
                    // totalTradesTaken: this.state.totalTradesTaken,
                }}>
                { this.props.children }
            </TradeDataContext.Provider>
        )
    }
}

export default TradeDataProvider

export const withTradeData = C => props => (
    <TradeDataContext.Consumer>
        {value => <C {...props} {...value}/>}
    </TradeDataContext.Consumer>
)


