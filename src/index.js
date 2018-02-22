import React, { Component } from 'react'
import { render } from 'react-dom'
import { debounce } from 'lodash'
import YTSearch from 'youtube-api-search'
import SearchBar from './components/search-bar'
import VideoList from './components/video-list'
import VideoDetail from './components/video-detail'

const API_KEY = process.env.API_KEY

// Create a new component. This component should produce some HTML
class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      videos: [],
      selectedVideo: null,
      initialTerm: 'reactjs'
    }

    this.videoSearch(this.state.initialTerm)
  }

  videoSearch (term) {
    YTSearch({
      key: API_KEY,
      term: term
    }, (videos) => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
      })
    })
  }

  render () {
    const videoSearch = debounce((term) => { this.videoSearch(term) }, 300)

    return (
      <div>
        <SearchBar onSearchTermChange={ videoSearch } initial={ this.state.initialTerm } />
        <VideoDetail video={ this.state.selectedVideo } />
        <VideoList
          onVideoSelect={ selectedVideo => this.setState({ selectedVideo } )}
          videos={ this.state.videos } />
      </div>
    )
  }
}

// Take this component's generated HTML and put it on the page
render(<App />, document.querySelector('.app'));
