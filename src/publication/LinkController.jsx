import React, { Component } from 'react';
import YouTube from 'react-youtube';


 class LinkController extends Component {

    renderSwitch = (link,opts)=>{
        const regex = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/;
        if(regex.test(link.trim())){
        return(<>
        <YouTube videoId={this.getVideoId(link)} opts={opts} onReady={this._onReady} />
        
       </>)

        }else{
        return(<><a href={link} target="_blank" rel="noopener noreferrer"></a>Material de apoyo <i className="fa fa-file"></i></>)
        }
    }

    getVideoId = (url)=>{
        let aux1 = url.split("&");
        let aux2 = aux1[0];
        let cad = aux2.split("=");
        let cad2= cad[1];


        return cad2;
    }
    _onReady(event) {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
      }
     
    render() {
        const {link} = this.props;
        const opts = {
            height: '300',
            width: '100%',
            playerVars: {
              // https://developers.google.com/youtube/player_parameters
              autoplay: 1,
            },
        }
        return (
            <div>
                {this.renderSwitch(link,opts)}
            </div>
        )
    }
}

export default LinkController;