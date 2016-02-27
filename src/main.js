import React, { Component, StyleSheet, Navigator } from 'react-native';

import Settings from './settings';
import Controls from './controls';

var ROUTES = {
  controls: Controls,
  settings: Settings
};


class Main extends Component {
  constructor(props) {
    super(props);
  }

  renderScene(route, navigator) {
    var Component = ROUTES[route.name];
    return <Component route={route} navigator={navigator} />;
  }

  render() {
    return (
      <Navigator
        style={styles.container}
        initialRoute={{name: 'controls'}}
        renderScene={this.renderScene}
        configureScene={() => { return Navigator.SceneConfigs.FloatFromRight; }}
        />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default Main;
