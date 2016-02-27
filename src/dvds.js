import React, { Component, StyleSheet, View, Text, Image, ListView, TouchableHighlight } from 'react-native';
var store = require('react-native-simple-store');
import Button from './components/button';
import WebSocketRails from './lib/websocket_rails';

class Dvds extends Component {
  constructor(props) {
    super(props);
    this.props = props;

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {settings: {host: ''}, dataSource: ds.cloneWithRows([])};

    store.get('settings').then((data) => {
      if (data === null) {
        data = {};
      }

      var dispatcher = new WebSocketRails(data.host + '/websocket');

      this.setState({ settings: data, dispatcher: dispatcher, dataSource: ds.cloneWithRows(this.props.navigator.dvds) });
    });
  }

  goBack() {
    this.props.navigator.pop();
  }

  selectDvd(rowId) {
    console.log('dvd:', this.props.navigator.dvds[rowId]);
    // this.props.navigator.dvd = this.props.navigator.dvds[rowId];
    this.state.dispatcher.trigger('new_now', {id: this.props.navigator.dvds[rowId].id, type: 'dvd'});

    this.props.navigator.immediatelyResetRouteStack([{name: 'controls'}]);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.nav}>
          <Button src={require('./img/left-arrow-white.png')} onPress={this.goBack.bind(this)} buttonStyle={styles.backButton} />
        </View>
        <View style={styles.divider} />

        <View style={styles.wrapper}>
          <Text style={styles.title}>DVDs</Text>
        </View>


        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData, sectionId, rowId) => <TouchableHighlight onPress={() => this.selectDvd(rowId)}>
              <View style={styles.dvd}>
                <Text style={styles.dvdTitle}>{rowData.title}</Text>

                <Image source={{uri: 'http://' + this.state.settings.host + rowData.image_web_url}} style={styles.dvdImage}/>
              </View>
            </TouchableHighlight>
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#475333',
  },

  nav: {
    flexDirection: 'row',
    marginTop: 20,
    marginLeft: 5
  },

  wrapper: {
    justifyContent: 'center',
    alignItems: 'center'
  },

  title: {
    fontSize: 38,
    color: 'white',
    marginBottom: 50,
  },

  input: {
    padding: 4,
    height: 40,
    borderWidth: 1,
    borderColor: '#424242',
    borderRadius: 3,
    margin: 5,
    width: 200,
    alignSelf: 'flex-end',
    color: '#424242'
  },

  formElement: {
    backgroundColor: '#ECECD1',
    margin: 5,
    flexDirection : 'row',
    padding: 5
  },

  label: {
    alignSelf: 'center',
    justifyContent: 'center',
    fontSize: 18,
    width: 90
  },

  backButton: {
    paddingBottom: 0
  },

  saveText: {
    fontSize: 35,
    paddingRight: 40,
    paddingLeft: 10
  },

  saveImage: {
    marginLeft: 40,
    marginTop: 5
  },

  row: {
    flexDirection: 'row'
  },

  divider: {
    borderBottomWidth: 1,
    padding: 1,
    width: 400,
    borderColor: '#9F4115',
    marginBottom: 20,
    marginTop: 5
  },

  dvd: {
    marginBottom: 5,
    flexDirection: 'row',
    backgroundColor: '#ECECD1',
    padding: 8
  },

  dvdTitle: {
    fontSize: 18,
    color: '#424242',
    marginRight: 30,
    width: 100
  },

  dvdImage: {
    width: 125,
    height: 175
  },

  imageWrapper: {
    padding: 3,
    backgroundColor: '#475333',
  },
});


export default Dvds;
