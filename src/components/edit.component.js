import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Stock = props => (
    <tr>
        <td>{props.todo.name}</td>
        <td>{props.todo.buy}</td>
        <td>{props.todo.sell}</td>
    </tr>
)

export default class List extends Component {
    constructor(props) {
        super(props);
        this.state = {stocks: []};
    }
    componentDidMount() {
        axios.get('http://localhost:4000/todos/')
            .then(response => {
                this.setState({ stocks: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }
    display() {
        return this.state.stocks.map(function(currentTodo, i){
            return <Stock todo={currentTodo} key={i} />;
        })
    }
    render() {
        return (
            <div>
                <h3>Alerts</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Ticker</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.display() }
                    </tbody>
                </table>
            </div>
        )
    }
}