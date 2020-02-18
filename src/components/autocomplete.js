import React, {Component} from 'react';
import PropTypes from 'prop-types';

export class Autocomplete extends Component{
    static proptypes = {};

    static defaultProperty = {
        suggestions:[]
    };

    constructor(props){
        this.state = {
            activeS: 0,
            filteredS: [],
            showS: false,
            userInput: ''
        };
    }

    render(){
        return(
        <React.Fragment>
            <input
            type="text"
            onChange={onChange}
            onKeyDown={onKeyDown}
            value={userInput}
            />
            {suggestionsListComponent}
      </React.Fragment>
        )
    }
}