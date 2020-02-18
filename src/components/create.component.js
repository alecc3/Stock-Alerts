import React, { Component } from 'react';
import axios from 'axios';

const myAPI = process.env.REACT_APP_ALPHA_API;

export default class Create extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            ticker: '',
            price: '',
            buy: '',
            sell: '',
            suggestions: {
                name: '',
                ticker: '',
                type: '',
                region: '',
            },
            done: false
        }
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeBuy = this.onChangeBuy.bind(this);
        this.onChangeSell = this.onChangeSell.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChangeName(e) {
        this.setState({
            name: e.target.value
        });

        if (this.state.name.length > 3){
            axios.get(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords= ${this.state.name} &apikey= ${myAPI}`)
            .then(res => {
                const data = res.data.bestMatches;
                for (var i=0;i<5;i++){
                    this.state.suggestions[i] = data[i];
                }
                console.log(this.state.suggestions[0]);
                console.log(this.state.suggestions[1]["1. symbol"]);
            })
            .catch(function (error){
                console.log(error);
            })
        }
    }
    onChangeBuy(e) {
        this.setState({
            buy: e.target.value
        });
    }
    onChangeSell(e) {
        this.setState({
            sell: e.target.value
        });
    }
    onSubmit(e) {
        e.preventDefault(); // ensure that the default HTML form submit behaviour is prevented

        console.log(`Form submitted:`);
        console.log(`Name: ${this.state.name}`);
        console.log(`Buy: ${this.state.buy}`);
        console.log(`Sell: ${this.state.sell}`);
        
        const alert = {
            name: this.state.name,
            buy: this.state.buy,
            sell: this.state.sell
        }

        //add to mongoDB
        // axios.post('http://localhost:4000/todos/add', alert)
        // .then(res => console.log(res.data));

        this.setState({
            name: '',
            ticker: '',
            price: '',
            buy: '',
            sell: '',
            done: false
        })
    }
    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Create New Alert</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Name: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.name}
                                onChange={this.onChangeName}
                                />
                    </div>
                    <div className="form-group"> 
                        <label>Buy Price: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.buy}
                                onChange={this.onChangeBuy}
                                />
                    </div>
                    <div className="form-group"> 
                        <label>Sell Price: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.sell}
                                onChange={this.onChangeSell}
                                />
                    </div>
                <div className="form-group">
                    <input type="submit" value="yeet" className="btn btn-primary" />
                </div>
                </form>
            </div>
        )
    }
}