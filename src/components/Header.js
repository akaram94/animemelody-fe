import React, { Component } from "react";
import { Button } from 'reactstrap';
import AsyncSelect from 'react-select/async';
import ShowTable from './Show';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { API_URL } from "../constants";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

var loadOptions = function(inputValue, callback) {
    if(inputValue.length < 3){
        callback([]);
    }

    // Get results using Axios
    axios.get(`${API_URL}shows/${inputValue}/?format=json`)
            .then(resp => {
                var results = [];
                var data = resp.data;
                for(var i = 0; i < data.length; i++){
                    var current = data[i];
                    var label = `${current.name} (${current.year})`;
                    results.push({label: label, value: current.mal_id});  
                }

                // Filter results
                callback(results);
            });
};

var selectShow = function(show){

    // Have to verify welcome message is deleted
    if(document.getElementById('welcomeText')){
        document.getElementById('welcomeText').remove();
    }

    // Get results using Axios
    axios.get(`${API_URL}themes/${show.value}/?format=json`)
        .then(resp => {
            var results = [];
            var data = resp.data;
            for(var i = 0; i < data.length; i++){
                var current = data[i];
                results.push(current);
            }

            const element = <ShowTable data={results} />;

            ReactDOM.render(element,
                document.getElementById('tableContainer')
            );

        });

    return show;
};

class Header extends Component {
    state = { inputValue: '' };
    handleInputChange = (newValue) => {
        const inputValue = newValue;
        this.setState({ inputValue });
        return inputValue;
    };

    togglePlaylist(){
        var queue = document.getElementById('queueTableContainer');

        if(queue.classList.contains('hide')){
            queue.classList.add('show');
            queue.classList.remove('hide');
        }

        else if(queue.classList.contains('show')){
            queue.classList.add('hide');
            queue.classList.remove('show');
        }

        if(document.body.classList.contains('hide-scroll')){
            document.body.classList.remove('hide-scroll');
        }

        else{
            document.body.classList.add('hide-scroll');
        }

    }

    render() {
        return (
        <header className="container-fluid">
            <div className="row">
                <div className="col-md-2 col-sm-3 mt-2 d-none d-md-block">
                    <h5 id="headerText" title="Created by akaram94 on GitHub.">AnimeMelody</h5>
                </div>
                <div className="col-md-8 col-10">
                    <div id="searchBar">
                        <AsyncSelect
                            placeholder="Search for an anime (e.g. Dragon Ball)"
                            cacheOptions
                            loadOptions={loadOptions}
                            onInputChange={this.handleInputChange}
                            onChange={selectShow}
                        />
                    </div>
                </div>
                <div className="col-2 playlist-button">
                    <Button className="float-right" title="Playlist" onClick={this.togglePlaylist} block><FontAwesomeIcon icon="bars" size="1x" /></Button>
                </div>
            </div>
        </header>
        );
    }
}
  
export default Header;