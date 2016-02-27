import React, { Component, StyleSheet, View, Text, TextInput } from 'react-native';
var store = require('react-native-simple-store');
import Button from './components/button';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.state = {settings: {host: ''}};
    store.get('settings').then((data) => {
      if (data === null) {
        data = {};
      }
      this.setState({settings: data});
    });
  }

  goBack() {
    this.props.navigator.pop();
  }

  save() {
    store.save('settings', this.state.settings);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.nav}>
          <Button src={require('./img/left-arrow-white.png')} onPress={this.goBack.bind(this)} buttonStyle={styles.backButton} />
        </View>
        <View style={styles.divider} />

        <View style={styles.wrapper}>
          <Text style={styles.title}>Setttings</Text>

          <View style={styles.formElement}>
            <Text style={styles.label}>DVD Pila! Host:</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => this.setState({settings: {host: text}})}
              value={this.state.settings.host ? this.state.settings.host : ''} />
          </View>
          <Button text={'Save'} src={require('./img/save-icon.png')}
            onPress={this.save.bind(this)}
            viewStyle={styles.row}
            textStyle={styles.saveText}
            imageStyle={styles.saveImage} />
        </View>
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
    // marginBottom: 100,
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
    marginBottom: 100,
    marginTop: 5
  }
});

export default Settings;
