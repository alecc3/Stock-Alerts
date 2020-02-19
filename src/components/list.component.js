import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Clock from 'react-live-clock';

const API = process.env.REACT_APP_IEX;

const Stock = props => (
    <tr>
        <td>{props.tickers}</td>
        <td>{props.prices}</td>
    </tr>
)

var zone = Intl.DateTimeFormat().resolvedOptions().timeZone
var open = false

export default class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stocks: [],
            prices: []
        };
    }
    componentDidMount() {
        axios.get(`https://cloud.iexapis.com/stable/stock/aapl/quote/?token=${API}`)
        .then(response=>{
            console.log(response.data)
            var res = "$" + response.data.symbol + " - " + "Apple"
            var price = "$" + response.data.latestPrice.toFixed(2)
            open = response.data.isUSMarketOpen
            this.setState({stocks: [...this.state.stocks, res], prices: [...this.state.prices, price]})
        })
        .catch(err => {
            console.log(err)
        })
        // `https://cloud.iexapis.com/stable/tops?token=${API}&symbols=aapl,fb,amzn,googl`
        // .then(response => {
        //     console.log(response.data)
            // var res = "$" + response.data[0].symbol + " - " + "Apple"
            // var price = "$" + response.data[0].lastSalePrice.toFixed(2)
            // this.setState({stocks: [...this.state.stocks, res], prices: [...this.state.prices, price]})
        //     var res = "$" + response.data[1].symbol + " - " + "Facebook"
        //     var price = "$" + response.data[1].lastSalePrice.toFixed(2)
        //     this.setState({stocks: [...this.state.stocks, res], prices: [...this.state.prices, price]})
        //     var res = "$" + response.data[2].symbol + " - " + "Amazon"
        //     var price = "$" + response.data[2].lastSalePrice.toFixed(2)
        //     this.setState({stocks: [...this.state.stocks, res], prices: [...this.state.prices, price]})
        //     var res = "$" + response.data[3].symbol + " - " + "Alphabet"
        //     var price = "$" + response.data[3].lastSalePrice.toFixed(2)
        //     this.setState({stocks: [...this.state.stocks, res], prices: [...this.state.prices, price]})
        // })

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