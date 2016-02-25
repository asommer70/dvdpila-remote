var React = require('react-native');
var {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Image
} = React;

module.exports = React.createClass({
  render: function() {
    return (
      <TouchableHighlight
        style={[styles.button, this.props.buttonStyle]}
        underlayColor={'#eeeeee'}
        onPress={this.props.onPress}
        >
        <View>
          <Image source={this.props.src} style={styles.image} />
          <Text style={[styles.buttonText, this.props.textStyle]}>{this.props.text}</Text>
        </View>
      </TouchableHighlight>
    );
  }
});

var styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    borderColor: '#9F4115',
    marginTop: 10,
    backgroundColor: '#9F4115',
  },

  buttonText: {
    flex: 1,
    alignSelf: 'center',
    fontSize: 10,
    color: 'white'
  },

  image: {
    alignSelf: 'center',
    marginBottom: 5
  }
});
