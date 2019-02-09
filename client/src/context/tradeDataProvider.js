import React, { Component } from 'react';

const TradeDataContext = React.createContext()

class TradeDataProvider extends Component {
    constructor(){
        super()
        this.state = {
            sampleData: [1,2,3]
        }
    }



    render(){
        return (
            <TradeDataContext.Provider 
                value={{
                    sampleData: this.state.sampleData,
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


