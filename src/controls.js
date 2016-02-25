import React, { Component, View, Text, StyleSheet } from 'react-native';
import ControlButton from './components/control_button';
import Button from './components/button';

class Controls extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>DVD Pila! Remote</Text>

        <View style={styles.row}>
          <ControlButton src={require('./img/previous-white-icon.png')} buttonStyle={styles.smallerButton} />

          <ControlButton src={require('./img/play-white-icon.png')} />

          <ControlButton src={require('./img/next-white-icon.png')} buttonStyle={styles.smallerButton} />
        </View>

        <View style={styles.divider} />
        <Button text={'Settings'} src={require('./img/gear-white-icon.png')} />
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

  row: {
    flexDirection: 'row',
  },

  smallerButton: {
    marginBottom: 15,
    marginTop: 15
  },

  title: {
    fontSize: 38,
    color: 'white',
    marginBottom: 100,
  },

  divider: {
    borderBottomWidth: 1,
    padding: 1,
    width: 300,
    borderColor: '#9F4115',
    marginTop: 140,
    marginBottom: 5
  }
});

export default Controls;
