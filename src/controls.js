import React, { Component, View, Text, Image, StyleSheet } from 'react-native';
import store from 'react-native-simple-store';

import ControlButton from './components/control_button';
import Button from './components/button';
import WebSocketRails from './lib/websocket_rails';

class Controls extends Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.state = {settings: {host: ''}, dispatcher: {}, status: 'stop'};

    store.get('settings').then((data) => {
      if (data === null) {
        data = {};
      } else {
        var dispatcher = new WebSocketRails(data.host + '/websocket');

        this.setState({settings: data, dispatcher: dispatcher}, () => {
          this.state.dispatcher.trigger('now', {now: 'I want it now!'});
          this.listen();
        });
      }
    });
  }

  findDvd(playing) {
    var dvd = this.state.dvds.map((dvd, index) => {
      if (dvd.id == playing.dvd_id) {
        return dvd;
      }
      return false;
    })
    return dvd[0];
  }

  listen() {
    this.state.dispatcher.bind('dvds', (dvds) => {
      // console.log('dispatcher.bind callback...');
      // console.log('successfully connected... dvds:', dvds);
      this.setState({dvds: dvds});
    });

    this.state.dispatcher.bind('now_playing', (playing) => {
      console.log('playing:', playing);

      var dvd = this.findDvd(playing);
      this.setState({playing: playing, dvd: dvd, status: playing.status});
    });

    this.state.dispatcher.bind('pause_success', (playing) => {
      console.log('paused_success from server...');
    });

    var channel = this.state.dispatcher.subscribe('browser');
    channel.bind('play_now', (playing) => {
      console.log('channel bind playing:', playing);
      var dvd = this.findDvd(playing);
      this.setState({playing: playing, dvd: dvd, status: playing.status});
    });

    channel.bind('pause_now', (playing) => {
      console.log('channel bind playing:', playing);
      var dvd = this.findDvd(playing);
      this.setState({playing: playing, dvd: dvd, status: playing.status});
    });

    channel.bind('stop_now', (playing) => {
      console.log('channel bind playing:', playing);
      var dvd = this.findDvd(playing);
      this.setState({playing: playing, dvd: dvd, status: playing.status});
    });
  }

  settings() {
    this.props.navigator.push({name: 'settings'});
  }

  changePlay() {
    if (this.state.status != 'play') {
      this.state.dispatcher.trigger('remote_play', {id: this.state.dvd.id, type: 'dvd'});
      this.setState({status: 'play'});
    } else {
      this.state.dispatcher.trigger('remote_pause', {id: this.state.dvd.id, type: 'dvd'});
      this.setState({status: 'pause'});
    }
  }

  previous() {
    this.state.dispatcher.trigger('remote_previous', {id: this.state.dvd.id, type: 'dvd'});
  }

  advance() {
    this.state.dispatcher.trigger('remote_advance', {id: this.state.dvd.id, type: 'dvd'});
  }

  render() {
    var title, dvdImage, playControl;
    if (this.state.dvd) {
      console.log('this.state.dvd:', this.state.dvd);
      // console.log('image_web_url:', 'http://' + this.state.settings.host + this.state.dvd.image_web_url)
      title = <Text style={styles.dvdTitle}>{this.state.dvd.title}</Text>;
      dvdImage = <Image source={{uri: 'http://' + this.state.settings.host + this.state.dvd.image_web_url}} style={styles.dvdImage}/>;
    } else {
      title = <Text style={styles.dvdTitle}>No DVD Playing...</Text>;
      dvdImage = <View/>;
    }

    if (this.state.status == 'stop' || this.state.status == 'pause') {
      playControl = <ControlButton src={require('./img/play-white-icon.png')} onPress={this.changePlay.bind(this)} />;
    } else {
      playControl = <ControlButton src={require('./img/pause-white-icon.png')} onPress={this.changePlay.bind(this)} />;
    }

    return (
      <View style={styles.container}>
        <Text style={styles.title}>DVD Pila! Remote</Text>
        <View style={styles.dvd}>
          {title}
          <View style={styles.imageWrapper}>
            {dvdImage}
          </View>
        </View>

        <View style={styles.buttons}>
          <ControlButton src={require('./img/previous-white-icon.png')} buttonStyle={styles.smallerButton} onPress={this.previous.bind(this)} />

          {playControl}

          <ControlButton src={require('./img/next-white-icon.png')} buttonStyle={styles.smallerButton} onPress={this.advance.bind(this)} />
        </View>

        <View style={styles.divider} />
        <Button text={'Settings'} src={require('./img/gear-white-icon.png')} onPress={this.settings.bind(this)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#475333',
  },

  buttons: {
    marginTop: 20,
    flexDirection: 'row',
  },

  smallerButton: {
    marginBottom: 15,
    marginTop: 15,
    padding: 10,
  },

  title: {
    fontSize: 38,
    color: 'white',
    marginBottom: 30,
    marginTop: 10
  },

  divider: {
    borderBottomWidth: 1,
    padding: 1,
    width: 300,
    borderColor: '#9F4115',
    marginTop: 55,
    marginBottom: 5
  },

  dvd: {
    marginBottom: 25,
    flexDirection: 'row'
  },

  dvdTitle: {
    fontSize: 22,
    color: '#ECECD1',
    marginRight: 30
  },

  dvdImage: {
    width: 125,
    height: 175
  },

  imageWrapper: {
    padding: 3,
    backgroundColor: '#ECECD1',
  }
});

export default Controls;
