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
        }
    }

    componentDidMount(){
        // axios.get('https://vschool-cors.herokuapp.com?url=https://www.myfxbook.com/api/login.json?email=ericlingren@gmail.com&password=1J@ck@roo0').then(response => {
        //     this.setState({
        //         establishedSession: response.data.session
        //     })
            this.getMyAccounts()
            console.log(this.state.establishedSession)
        // })
    }

    getMyAccounts = () => {
        axios.get(`https://vschool-cors.herokuapp.com?url=https://www.myfxbook.com/api/get-my-accounts.json?session=${this.state.establishedSession}`).then(response => { 
            this.setState({
                accounts: response.data.accounts,
                liveAccountId: response.data.accounts[0].id,
                demoAccountId: response.data.accounts[3].id,
                })
            this.getTradeHistoryLiveAccount()
        })
    }

    getTradeHistoryLiveAccount = () => {
        axios.get(`https://vschool-cors.herokuapp.com?url=https://www.myfxbook.com/api/get-history.json?session=${this.state.establishedSession}&id=${this.state.liveAccountId}`).then(response => {
            console.log(response.data.history)    
        this.setState({
            })
        })
    }

    render(){
        return (
            <TradeHistoryContext.Provider 
                value={{
                    establishedSession: this.state.establishedSession,
                    accounts: this.state.accounts,
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


