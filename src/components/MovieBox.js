import React, { Component } from 'react';
import {Jumbotron} from 'reactstrap';

class MovieBox extends Component {
    constructor(props){
        super(props);
        this.state = {currentVideo: this.props.data}
    }

    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.data !== prevState.currentVideo){
            return { currentVideo: nextProps.data }
        }

        else return null;
    }

    changeStateVideo(){
        var video = document.getElementById('videoPlayer');
        video.addEventListener('click', function(){
            this.paused ? this.play() : this.pause();
        }, false);

    }

    render(){
        var data = this.state.currentVideo;
        var show = data.show_name;
        var song = data.name;
       
        var display = `${show} — ${data.theme_type}`

        return(
            <div>
                <Jumbotron id="movieInfoBox">
                    <div>
                    <h3>{song}</h3>
                    </div>
                    <div>
                        <h5>{display}</h5>
                    </div>
                </Jumbotron>
                <Jumbotron id="videoPlayerContainer" className="embed-responsive embed-responsive-16by9">
                    <video id="videoPlayer" className="embed-responsive-item" src={this.state.currentVideo.url} onEnded={this.handleEndEvent} onClick={this.changeStateVideo} controls>
                    </video>
                </Jumbotron>
            </div>
        );
    }
}

export default MovieBox;
