import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import TradeHistoryProvider from './context/tradeHistoryProvider';
import TradeDataProvider from './context/tradeDataProvider'

ReactDOM.render(
    <BrowserRouter>
        <TradeDataProvider>
            <TradeHistoryProvider>
                <App />
            </TradeHistoryProvider>
        </TradeDataProvider>
    </BrowserRouter>
, document.getElementById('root'));
