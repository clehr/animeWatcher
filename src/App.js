import React from 'react';
import './App.css';
import firebase from './config/firebase';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      episodeToWatch: '',
      episodeToWatchFairyTail: '',
      episodeToWatchBoruto: '',
      lastEpisode: '',
      lastEpisodeFairyTail: '',
      lastEpisodeBoruto: '',
      background: '',
      activeSeries: 'fairy_tail',
      auth: 'IWantToWatchAnime',
      password: ''
    };
    this.setEpisodeToWatch = this.setEpisodeToWatch.bind(this)
    this.setLastWatchedEpisode = this.setLastWatchedEpisode.bind(this)
    this.setActiveSeries = this.setActiveSeries.bind(this)
    this.setPassword = this.setPassword.bind(this)
  }

  render() {
    return (
      <div className={"vh-100 dt w-100 " + (this.state.background)}>
        <div className="dtc v-mid tc">
          <p className="avenir b">Enter password:</p>
          <input className="mb3" onChange={this.setPassword} />
          {this.state.password == this.state.auth &&
            <div>
              <select onChange={this.setActiveSeries} name="series">
                <option value="fairy_tail">Fairy Tail</option>
                <option value="boruto">Boruto</option>
                <option value="one_piece">One Piece</option>
              </select>

              {this.state.activeSeries === 'fairy_tail' && <div>
                <p className="avenir b">All episodes can be found <a target="_blank" rel="noopener noreferrer" href="http://fairytail-tube.org/episoden-streams">here</a></p>
                <p className="avenir i b">Last Episode of {this.state.activeSeries} was:
             <input type="text" value={this.state.lastEpisodeFairyTail} onChange={this.setLastWatchedEpisode} style={{ width: '50px' }} /></p>
                <p className="avenir i b">Enter episode you like to watch: </p>
                <form className="pb3" target="_blank" action={'http://fairytail-tube.org/folge/' + this.state.episodeToWatchFairyTail}>
                  <input value={this.state.episodeToWatchFairyTail} onChange={this.setEpisodeToWatch} style={{ width: '50px' }} />
                </form>
                <a target="_blank" rel="noopener noreferrer" href={'http://fairytail-tube.org/folge/' + this.state.episodeToWatchFairyTail} className="f6 link dim ph3 pv1 mb2 dib white bg-light-purple b avenir i">Start Watching!</a>
              </div>
              }

              {this.state.activeSeries === 'boruto' && <div>
                <p className="avenir b">All episodes can be found <a target="_blank" rel="noopener noreferrer" href="http://anisenpai.net/boruto/">here</a></p>
                <p className="avenir i b">Last Episode of {this.state.activeSeries} was: <input type="text" value={this.state.lastEpisodeBoruto} onChange={this.setLastWatchedEpisode} style={{ width: '50px' }} /></p>
                <p className="avenir i b">Enter episode you like to watch:</p>
                <form className="pb3" target="_blank" action={'http://anisenpai.net/boruto-folge-' + this.state.episodeToWatchBoruto + '-ger-sub/'}>
                  <input value={this.state.episodeToWatchBoruto} onChange={this.setEpisodeToWatch} style={{ width: '50px' }} />
                </form>
                <a target="_blank" rel="noopener noreferrer" href={'http://anisenpai.net/boruto-folge-' + this.state.episodeToWatchBoruto + '-ger-sub/'} className="f6 link dim ph3 pv1 mb2 dib white bg-light-purple b avenir i">Start Watching!</a>
              </div>
              }

              {this.state.activeSeries === 'one_piece' && <div>
                <p className="avenir b">All episodes can be found <a target="_blank" rel="noopener noreferrer" href="http://onepiece-tube.com/episoden-streams">here</a></p>
                <p className="avenir i b">Last Episode of {this.state.activeSeries} was: <input type="text" value={this.state.lastEpisode} onChange={this.setLastWatchedEpisode} style={{ width: '50px' }} /></p>
                <p className="avenir i b">Enter episode you like to watch:</p>
                <form className="pb3" target="_blank" action={'http://onepiece-tube.com/folge/' + this.state.episodeToWatch}>
                  <input value={this.state.episodeToWatch} onChange={this.setEpisodeToWatch} style={{ width: '50px' }} />
                </form>
                <a target="_blank" rel="noopener noreferrer" href={'http://onepiece-tube.com/folge/' + this.state.episodeToWatch} className="f6 link dim ph3 pv1 mb2 dib white bg-light-purple b avenir i">Start Watching!</a>
              </div>
              }
            </div>

          }
        </div>
      </div>
    );
  }

  componentDidMount() {
    firebase.database().ref('last_episode').child("one_piece").once('value', storedValue => this.setState({ lastEpisode: storedValue.val() }));
    firebase.database().ref('last_episode').child("one_piece").once('value', storedValue => this.setState({ episodeToWatch: parseInt(storedValue.val()) + 1 }));

    firebase.database().ref('last_episode_boruto').child("boruto").once('value', storedValue => this.setState({ lastEpisodeBoruto: storedValue.val() }));
    firebase.database().ref('last_episode_boruto').child("boruto").once('value', storedValue => this.setState({ episodeToWatchBoruto: parseInt(storedValue.val()) + 1 }));

    firebase.database().ref('last_episode_fairy_tail').child("fairy_tail").once('value', storedValue => this.setState({ lastEpisodeFairyTail: storedValue.val() }));
    firebase.database().ref('last_episode_fairy_tail').child("fairy_tail").once('value', storedValue => this.setState({ episodeToWatchFairyTail: parseInt(storedValue.val()) + 1 }));


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

  setPassword(event) {
    const enteredPassword = event.target.value;

    this.setState({
      password: enteredPassword
    })
  }

  setActiveSeries(event) {
    const series = event.target.value;

    this.setState({
      activeSeries: series
    })
  }

  setEpisodeToWatch(event) {
    const episode = event.target.value;

    if (this.state.activeSeries === 'one_piece') {
      this.setState({
        episodeToWatch: episode
      })
    }

    if (this.state.activeSeries === 'fairy_tail') {
      this.setState({
        episodeToWatchFairyTail: episode
      })
    }

    if (this.state.activeSeries === 'boruto') {
      this.setState({
        episodeToWatchBoruto: episode
      })
    }

  }

  setLastWatchedEpisode(event) {
    const inputValue = event.target.value;

    if (this.state.activeSeries === 'one_piece') {
      firebase.database().ref('last_episode').set({
        one_piece: inputValue
      });

      this.setState({
        lastEpisode: inputValue
      })
    }

    if (this.state.activeSeries === 'boruto') {
      firebase.database().ref('last_episode_boruto').set({
        boruto: inputValue
      });

      this.setState({
        lastEpisodeBoruto: inputValue
      })
    }

    if (this.state.activeSeries === 'fairy_tail') {
      firebase.database().ref('last_episode_fairy_tail').set({
        fairy_tail: inputValue
      });

      this.setState({
        lastEpisodeFairyTail: inputValue
      })
    }
  }

}

export default App;
