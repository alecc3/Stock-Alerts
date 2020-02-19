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

export default class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stocks: [],
            prices: []
        };
    }
    componentDidMount() {
        axios.get(`https://cloud.iexapis.com/stable/tops?token=${API}&symbols=aapl,fb,amzn,googl`).then(response => {
            var res = "$" + response.data[0].symbol + " - " + "Apple"
            var price = "$" + response.data[0].lastSalePrice.toFixed(2)
            this.setState({stocks: [...this.state.stocks, res], prices: [...this.state.prices, price]})
            var res = "$" + response.data[1].symbol + " - " + "Facebook"
            var price = "$" + response.data[1].lastSalePrice.toFixed(2)
            this.setState({stocks: [...this.state.stocks, res], prices: [...this.state.prices, price]})
            var res = "$" + response.data[2].symbol + " - " + "Amazon"
            var price = "$" + response.data[2].lastSalePrice.toFixed(2)
            this.setState({stocks: [...this.state.stocks, res], prices: [...this.state.prices, price]})
            var res = "$" + response.data[3].symbol + " - " + "Alphabet"
            var price = "$" + response.data[3].lastSalePrice.toFixed(2)
            this.setState({stocks: [...this.state.stocks, res], prices: [...this.state.prices, price]})
        })

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
        var date = new Date();
        let hours = date.getHours();
        var ampm = hours >= 12 ? 'pm' : 'am';
        if (hours > 1 && ampm == "pm"){
            return <p>Market is Closed</p>
        }
        return <p>Market is Open</p>
    }
    render() {
        return (
            <div>
                Time - <Clock format={'h:mm:ss'} ticking={true} timezone={zone}/> {new Date().toString().match(/\(([A-Za-z\s].*)\)/)[1]}
                {this.marketStatus()}
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