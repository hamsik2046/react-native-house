'use strict';

import React ,{Component} from 'react';
import {AppRegistry, StyleSheet, Text, NavigatorIOS} from 'react-native';

// var React = require('react-native');
var SearchPage = require('./SearchPage');

var styles = StyleSheet.create({
  text: {
    color: 'black',
    backgroundColor: 'white',
    fontSize: 30,
    margin: 80
  },
  container: {
    flex: 1
  }
});



class PropertyFinderApp extends React.Component {
  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: '巴乐兔租房',
          component: SearchPage,
        }}/>
    );
  }
}


AppRegistry.registerComponent('PropertyFinder', function() { return PropertyFinderApp });
