import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import TradeHistoryProvider from './context/tradeHistoryProvider';

ReactDOM.render(
    <BrowserRouter>
        <TradeHistoryProvider>
            <App />
        </TradeHistoryProvider>
    </BrowserRouter>
, document.getElementById('root'));
