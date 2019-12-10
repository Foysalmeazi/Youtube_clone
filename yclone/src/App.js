import React, { Component } from 'react'
import {Grid} from '@material-ui/core'
import {SearchBar,VideoDetails,VideoList} from './Component';
//import {VideoList} from './Component/VideoList';


import youtube from './Api/youtube';

export default class App  extends Component {
    state=
    {
        videos:[],
        selectedVideo:null,
    }

    componentDidMount()
    {
        this.handleSubmit('pdf generation with react and node')
    }

    onVideoSelect= (video) =>
    {
        this.setState({selectedVideo:video});
    }
    handleSubmit=async(searchTerm)=>
    {
        const response = await youtube.get('search',
        {
            params:
            {
                part: 'snippet',
                maxResults:5,
                key:'AIzaSyBZ-HTBYPLfbJ2G7LfanDDIkB5NUivOomo',
                q:searchTerm,
            }
        
        });
        //console.log(response.data.items);
        this.setState({videos:response.data.items,selectedVideo:response.data.items[0]});
        
    }
    render() {
        const {selectedVideo,videos}=this.state;
        return (
           <Grid justify="center" container spacing={10}>
               <Grid item xs={12}>
                   <Grid container spacing={10}>
                       <Grid item xs={12}>
                           <SearchBar onFormSubmit={this.handleSubmit}></SearchBar>
                       </Grid>
                       <Grid item xs={8}>
                           <VideoDetails video={selectedVideo}></VideoDetails>
                       </Grid>

                       <Grid item xs={4}>
                           <VideoList videos={videos} onVideoSelect={this.onVideoSelect}/>
                       </Grid>

                   </Grid>

               </Grid>
           </Grid>
        )
    }
}
