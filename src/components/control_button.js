import React, { Component, View, Text, TouchableHighlight, Image, StyleSheet } from 'react-native';

class ControlButton extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <TouchableHighlight
        style={[styles.button, this.props.buttonStyle]}
        underlayColor={'#ECECD1'}
        onPress={this.props.onPress}
        >
        <Image source={this.props.src} />
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    padding: 20,
    margin: 5,
    borderColor: '#9F4115',
    backgroundColor: '#9F4115',
  },
  buttonText: {
    flex: 1,
    alignSelf: 'center',
    fontSize: 20,
    color: '#222324'
  }
});

export default ControlButton;
