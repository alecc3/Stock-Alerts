import React, { Component } from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import { sizing } from '@material-ui/system';
import Sync from './synch';

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

export default class Create extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            ticker: '',
            price: '',
            buy: '',
            sell: '',
            suggestions: [],
            done: false
        }
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeBuy = this.onChangeBuy.bind(this);
        this.onChangeSell = this.onChangeSell.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    autocomplete(){
        axios.get(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords= ${this.state.name} &apikey= ${myAPI}`)
            .then(res => {
                const data = res.data.bestMatches;
                for (var i=0;i<data.length;i++){
                    var add = new Stock(data[i]["1. symbol"],data[i]["2. name"],data[i]["3. type"],data[i]["4. region"])
                    this.state.suggestions.push(add);
                }
                
                this.state.suggestions.forEach(item=>{
                var x = item.name;
                console.log(x);
                })
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
                    <div>
                        {/* {this.state.suggestions.map((stock, index) => (
                        <p key={index}>${stock.ticker} - {stock.name}</p>
                        ))} */}
                    </div>
                    <div>
                        <Sync></Sync>
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