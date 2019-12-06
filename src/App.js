import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { episodeToWatch: 903 };
    this.setEpisodeToWatch = this.setEpisodeToWatch.bind(this)
  }

  render() {
    return (
      <div className="vh-100 dt w-100">
        <div className="dtc v-mid tc">
          <p className="avenir i b">Last Episode was: 905</p>
          <p className="avenir i b">Enter episode you like to watch:</p>
          <input onChange={this.setEpisodeToWatch}></input>
          <a target="_blank" rel="noopener noreferrer" href={'http://onepiece-tube.com/folge/' + this.state.episodeToWatch} className="f6 link dim ph3 pv1 mb2 dib white bg-light-purple b avenir i">Start Watching!</a>
        </div>
      </div>

    );
  }

  setEpisodeToWatch(event) {
    const inputValue = event.target.value;

    this.setState({
      episodeToWatch: inputValue
    })
  }

}

export default App;
