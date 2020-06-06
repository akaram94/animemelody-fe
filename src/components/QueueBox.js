import React, { Component } from 'react';
import {Table} from 'reactstrap';
import {Button} from 'reactstrap';
import MovieBox from './MovieBox';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class QueueTable extends Component {
    constructor(props){
        super(props);
        this.state = {queue: this.props.data, currentVideo: 0, waiting: false};
        this.onEndHandler = this.onEndHandler.bind(this);
    }

    componentDidMount(){
        document.getElementById("videoPlayer").addEventListener("ended", this.onEndHandler, false);
    }

    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.data !== prevState.queue){
            return { queue: nextProps.data }
        }

        else return null;
    }


    loadVideo(index){

        this.setState({waiting: true})

        var isForward = index > this.state.currentVideo;

        if((this.state.currentVideo + 1) < this.state.queue.length && isForward){
        
            this.setState({currentVideo: index});

            var activeSongs = document.getElementsByClassName("activeSong");
            while (activeSongs.length)
                activeSongs[0].className = activeSongs[0].className.replace(/\bactiveSong\b/g, "");

            var d = document.getElementById("queueTable").rows[index + 1];
            d.className += " activeSong";

            const element = <MovieBox data={this.state.queue[index]} />;

            ReactDOM.render(element,
                document.getElementById('videoContainer')
            );

            setTimeout(function(){
                document.getElementById("videoPlayer").play();
            }, 1000);

        }

        else if(this.state.currentVideo > 0 && !isForward){
        
            this.setState({currentVideo: index});

            var activeSongs = document.getElementsByClassName("activeSong");
            while (activeSongs.length)
                activeSongs[0].className = activeSongs[0].className.replace(/\bactiveSong\b/g, "");

            var d = document.getElementById("queueTable").rows[index + 1];
            d.className += " activeSong";

            const element = <MovieBox data={this.state.queue[index]} />;

            ReactDOM.render(element,
                document.getElementById('videoContainer')
            );

            setTimeout(function(){
                document.getElementById("videoPlayer").play();
            }, 1000);

        }

        // Save context so we can still save the state.
        var that = this;

        setTimeout(function(){
            that.setState({waiting: false});
        }, 1000);

    }

    onEndHandler(){
        if((this.state.currentVideo + 1) < this.state.queue.length){
            this.loadVideo(this.state.currentVideo + 1);
        }
    }

    removeVideo(index){
        var currentQueue = this.props.data;
        var d = document.getElementById("queueTable").rows[index + 1];
        d.className.replace(/\bactiveSong\b/g, "");
        
        if(index > -1){
            currentQueue.splice(index, 1);
        }

        this.setState({queue: currentQueue});

        if(currentQueue.length <= 0){
            document.getElementById('queueTable').style.display = "none";
        }
    }

    render(){
        let rows = [];
        for (var i = 0; i < this.state.queue.length; i++){
            rows.push(<tr key={i}>
                <td>{this.state.queue[i].name}</td>
                <td>{this.state.queue[i].show_name}</td>
                <td><Button key={i} onClick={this.loadVideo.bind(this, i)} block><FontAwesomeIcon icon="play" size="1x" /></Button></td>
                <td><Button key={i} onClick={this.removeVideo.bind(this, i)} block><FontAwesomeIcon icon="minus" size="1x" /></Button></td>
            </tr>);
        }

        return (
            <Table id="queueTable" bordered condensed responsive>
                <thead>
                    <tr>
                        <th colSpan="2">Playlist</th>
                        <th colSpan="1"><Button disabled={this.state.waiting} onClick={this.loadVideo.bind(this, this.state.currentVideo - 1)} block><FontAwesomeIcon icon="backward" size="1x" /></Button></th>
                        <th colSpan="1"><Button disabled={this.state.waiting} onClick={this.loadVideo.bind(this, this.state.currentVideo + 1)} block><FontAwesomeIcon icon="forward" size="1x" /></Button></th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </Table>
        );
    }
}

export default QueueTable;