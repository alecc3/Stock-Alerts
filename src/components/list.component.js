import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API = process.env.REACT_APP_IEX;

const Stock = props => (
    <tr>
        <td>{props.tickers}</td>
        <td>{props.prices}</td>
    </tr>
)

const Price = props => (
    <tr>
        <td>{props.prices}</td>
    </tr>
)


export default class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stocks: [],
            prices: []
        };
    }
    componentDidMount() {
        axios.get(`https://cloud.iexapis.com/stable/tops?token=${API}&symbols=aapl`).then(response => {
            var res = response.data[0].symbol + " - " + "Apple"
            var price = "$" + response.data[0].lastSalePrice.toFixed(2)
            this.setState({stocks: [...this.state.stocks, res], prices: [...this.state.prices, price]})
        })

        axios.get(`https://cloud.iexapis.com/stable/tops?token=${API}&symbols=fb`).then(response => {
            var res = response.data[0].symbol + " - " + "Facebook"
            var price = "$" + response.data[0].lastSalePrice.toFixed(2)
            this.setState({stocks: [...this.state.stocks, res], prices: [...this.state.prices, price]})
        })

        axios.get(`https://cloud.iexapis.com/stable/tops?token=${API}&symbols=amzn`).then(response => {
            var res = response.data[0].symbol + " - " + "Amazon"
            var price = "$" + response.data[0].lastSalePrice.toFixed(2)
            this.setState({stocks: [...this.state.stocks, res], prices: [...this.state.prices, price]})
        })

        axios.get(`https://cloud.iexapis.com/stable/tops?token=${API}&symbols=msft`).then(response => {
            var res = response.data[0].symbol + " - " + "Microsoft"
            var price = "$" + response.data[0].lastSalePrice.toFixed(2)
            this.setState({stocks: [...this.state.stocks, res], prices: [...this.state.prices, price]})
        })

        // axios.get('http://localhost:4000/todos/')
        //     .then(response => {
        //         this.setState({ stocks: response.data });
        //     })
        //     .catch(function (error){
        //         console.log(error);
        //     })
        console.log(this.state.stocks)
    }
    display() {
        return this.state.stocks.map((t,i)=>{
            return <Stock tickers={t} prices={this.state.prices[i]}/>;
        })
    }
    render() {
        return (
            <div>
                <h3>Alerts</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Ticker</th>
                            <th>Price</th>
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