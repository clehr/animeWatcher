import React from 'react';
import './App.css';
import firebase from './config/firebase';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      episodeToWatch: '',
      lastEpisode: '',
      anime: '',
      background: ''
    };
    this.setEpisodeToWatch = this.setEpisodeToWatch.bind(this)
    this.setLastWatchedEpisode = this.setLastWatchedEpisode.bind(this)
  }

  render() {
    return (
      <div className={"vh-100 dt w-100 " + (this.state.background)}>
        <div className="dtc v-mid tc">
          <p className="avenir b">All episodes can be found <a target="_blank" rel="noopener noreferrer" href="http://onepiece-tube.com/episoden-streams">here</a></p>
          <p className="avenir i b">Last Episode of {this.state.anime} was: <input type="text" value={this.state.lastEpisode} onChange={this.setLastWatchedEpisode} style={{ width: '50px' }} /></p>
          <p className="avenir i b">Enter episode you like to watch:</p>
          <form className="pb3" target="_blank" action={'http://onepiece-tube.com/folge/' + this.state.episodeToWatch}>
            <input value={this.state.episodeToWatch} onChange={this.setEpisodeToWatch} style={{ width: '50px' }} />
          </form>
          <a target="_blank" rel="noopener noreferrer" href={'http://onepiece-tube.com/folge/' + this.state.episodeToWatch} className="f6 link dim ph3 pv1 mb2 dib white bg-light-purple b avenir i">Start Watching!</a>
        </div>
      </div>

    );
  }

  componentDidMount() {
    firebase.database().ref('last_episode').child("one_piece").once('value', storedValue => this.setState({ lastEpisode: storedValue.val() }));
    firebase.database().ref('last_episode').child("one_piece").once('value', storedValue => this.setState({ episodeToWatch: parseInt(storedValue.val()) + 1 }));
    firebase.database().ref('last_episode').child("one_piece").once('value', storedValue => this.setState({ anime: storedValue.key }));

    var backgrounds = [
      'Background_one',
      'Background_two',
      'Background_three',
      'Background_four',
      'Background_five',
      'Background_six',
      'Background_seven',
      'Background_eight',
      'Background_nine',
    ];

    this.setState({
      background: backgrounds[Math.floor(Math.random() * backgrounds.length)]
    });
  }

  setEpisodeToWatch(event) {
    const inputValue = event.target.value;

    this.setState({
      episodeToWatch: inputValue
    })
  }

  setLastWatchedEpisode(event) {
    const inputValue = event.target.value;

    firebase.database().ref('last_episode').set({
      one_piece: inputValue
    });

    this.setState({
      lastEpisode: inputValue
    })
  }

}

export default App;
