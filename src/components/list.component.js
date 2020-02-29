import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Clock from 'react-live-clock';

const API = process.env.REACT_APP_IEX;

const Stock = props => (
    <tr>
        <td>{props.tickers}</td>
        <td>{props.prices}</td>
        <td><button type="button" class="btn btn-dark">Set</button></td>
    </tr>
)

var zone = Intl.DateTimeFormat().resolvedOptions().timeZone
var open = false

var FAANG = '?symbols=fb,aapl,amzn,nflx,goog'

export default class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stocks: [],
            prices: []
        };
    }
    componentDidMount() {
        axios.get(`https://cloud.iexapis.com/stable/stock/market/batch${FAANG}&types=quote&filter=symbol,latestPrice,isUSMarketOpen&token=${API}`).then(response =>{
            console.log(response.data)
            for (var s in response.data){
                console.log(response.data[s]["quote"])
                var symbol = '$ - ' + response.data[s]["quote"]["symbol"]
                var price = '$ ' + response.data[s]["quote"]["latestPrice"]
                this.setState({stocks: [...this.state.stocks, symbol], prices: [...this.state.prices, price]})
                open = response.data.isUSMarketOpen
            }
        })
        
        // # add to DB
        // axios.get('http://localhost:4000/todos/')
        //     .then(response => {
        //         this.setState({ stocks: response.data });
        //     })
        //     .catch(function (error){
        //         console.log(error);
        //     })
    }
    display() {
        return this.state.stocks.map((t,i)=>{
            return <Stock tickers={t} prices={this.state.prices[i]}/>;
        })
    }
    marketStatus(){
        var res;
        res = open ? "Open" : "Closed"
        return res
    }
    render() {
        return (
            <div>
                Time - <Clock format={'h:mm:ss'} ticking={true} timezone={zone}/> {new Date().toString().match(/\(([A-Za-z\s].*)\)/)[1]}
                <p>Market is {this.marketStatus()}</p>
                <h3>Alerts</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Ticker</th>
                            <th>Current Price</th>
                            <th>Alert</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.display()}
                    </tbody>
                </table>
            </div>
        )
    }
}