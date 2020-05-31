import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { Table } from 'reactstrap';
import ReactDOM from 'react-dom';
import MovieBox from './MovieBox';
import QueueTable from './QueueBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class ShowTable extends Component {
    constructor(props){
        super(props);
        this.state = {data: this.props.data, queue: []}
    } 

    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.data !== prevState.data){
            return { data: nextProps.data };
        }

        else return null;
    }

    loadVideo(index){
        const element = <MovieBox data={this.state.data[index]} />;

        ReactDOM.render(element,
            document.getElementById('videoContainer')
        );

        setTimeout(function(){
            document.getElementById("videoPlayer").play();
        }, 1000);

    }

    queueVideo(index){
        var queueUpdated = this.state.queue;
        queueUpdated.push(this.state.data[index]);
        this.setState({queue: queueUpdated});

        var element = <QueueTable id="queueTable" data={this.state.queue} />;

        if(document.getElementById('queueTable') != null){
            ReactDOM.render(element,
                document.getElementById('queueTableContainer')
            );
        }

        else{
            element = <QueueTable id="queueTable" data={this.state.queue}/>;
            this.loadVideo(index);
            ReactDOM.render(element,
                document.getElementById('queueTableContainer')
            );

            var l = document.getElementById("queueTable").rows.length;
            var d = document.getElementById("queueTable").rows[l - 1];
            d.className += " activeSong";
        }

        document.getElementById('queueTable').style.display = "table";
    }

    render(){
        let rows = [];
        for (var i = 0; i < this.state.data.length; i++){
            rows.push(<tr key={i}>
                <td>{this.state.data[i].name} - {this.state.data[i].theme_type}</td>
                <td><Button key={i} onClick={this.loadVideo.bind(this, i)}  block><FontAwesomeIcon icon="play" size="1x" /></Button></td>
                <td><Button key={i} onClick={this.queueVideo.bind(this, i)}  block><FontAwesomeIcon icon="plus" size="1x" /></Button></td>
            </tr>);
        }
        return (
            <div>
                <Table id="showTable" bordered condensed responsive>
                    <thead>
                        <tr>
                            <th colSpan="3">Songs — {this.state.data[0].show_name}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default ShowTable;