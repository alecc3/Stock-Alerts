import React, { Component } from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import { sizing } from '@material-ui/system';
import DynamicSelect from './DynamicSelect';

const myAPI = process.env.REACT_APP_ALPHA_API;

const useStyles = makeStyles({
    option: {
      fontSize: 15,
      '& > span': {
        marginRight: 10,
        fontSize: 18,
      },
    },
  });

function Stock(ticker, name, type, region){
    this.ticker = ticker;
    this.name = name;
    this.type = type;
    this.region = region;
}

let suggestions = new Set();

export default class Create extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            ticker: '',
            price: '',
            suggestions: [],
            done: false
        }
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    autocomplete(){
        axios.get(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords= ${this.state.name} &apikey= ${myAPI}`)
            .then(res => {
                const data = res.data.bestMatches;
                for (var i=0;i<4;i++){
                    var add = new Stock(data[i]["1. symbol"],data[i]["2. name"],data[i]["3. type"],data[i]["4. region"])
                    this.state.suggestions.push(add);
                }
                // for (var i=0;i<4;i++){
                //     console.log(this.state.suggestions[i].ticker);
                // }

            })
            .catch(function (error){
                console.log(error);
            })
    }
    onChangeName(e) {
        if (this.state.name.length >= 2){
            this.autocomplete();
        }
        this.setState({
            name: e.target.value
        });
        this.forceUpdate();
    }
    onChangePrice(e) {
        this.setState({
            price: e.target.value
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
            price: this.state.price
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
                        <label>Ticker: </label>
                        <input  type="text"
                                style={{ width:"300px" }}
                                className="form-control"
                                value={this.state.name}
                                onChange={this.onChangeName}
                                />
                    </div>
                    <div>
                        {/* {this.state.suggestions.map((stock, index) => (
                        <p key={index}>${stock.ticker} - {stock.name}</p>
                        ))} */}
                    </div>
                    <div className="form-group"> 
                        <label>Alert Price: </label>
                        <input  type="text"
                                style={{ width:"300px" }}
                                className="form-control"
                                value={this.state.price}
                                onChange={this.onChangeBuy}
                                />
                    </div>
                <div className="form-group">
                    <input type="submit" value="Add" className="btn btn-primary" />
                </div>
            </form>
            
            </div>
        )
    }
}