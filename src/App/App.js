import React, { Component } from 'react';
import logo from '../logo.svg';
import MultiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import SpotList from '../SpotList/SpotList'
import './App.css';
import Modal from "../Modal/Modal";

class App extends Component {
  
  render() {
    return (
      <MultiThemeProvider>
        <AppBar iconElementLeft={<div></div>} title="PopCorn"/>
        {/*<SpotList/>*/}
        <Modal open={true} spot={{spot: 1, taken: false}}/>
      </MultiThemeProvider>
    );
  }
}

export default App;
