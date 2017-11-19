import React, { Component } from 'react';
import logo from '../logo.svg';
import MultiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import SpotList from '../SpotList/SpotList'
import './App.css';
import Modal from "../Modal/Modal";
import Dialog from 'material-ui/Dialog'
import Button from 'material-ui/RaisedButton'
import EnterAddress from "../EnterAddress/EnterAddress";
import LotList from "../LotList/LotList";
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import {yellow200, red700} from 'material-ui/styles/colors'

class App extends Component {
  constructor(props){
      super(props);

      this.state = {
          modalSpot : {},
          showModal : false,
          nearDestination : '',
          showWhere: true,
          originAddr: {},
          originCoords: {},
          addrConfrim: false,
          lot: null,
          lotVisible : false,
          spotVisible : false
      };

  }
    getSpot = spot => {
        this.setState({
            modalSpot : spot,
            showModal: true
        });
    };

  getClose = () => {
    this.setState({
        modal: {},
        showModal: false
    })
  };

  handleNearMe = () => {
    navigator.geolocation.getCurrentPosition((position) => {
        this.setState({
            nearDestination: false,
            showWhere: false,
            originCoords: position.coords,
            lotVisible: true,
        });
    })
  };

  handleNearDest = () => {
      this.setState({
          nearDestination: true,
          showWhere: false
      })
  };

  getAddr = () => {
      this.setState({
          addrConfrim: true,
          nearDestination: false
      })
  };

  confirmAddr = () => {
      this.setState({
          addrConfrim: false,
          lotVisible: true,

      });
  };

  getData = data => {
      let lat = (data.geometry.location.lat);
      let lon = (data.geometry.location.lng);
      this.setState({
          originAddr: data,
          originCoords: {latitude: lat, longitude: lon},
      });
  };

  getLot = lot => {
      this.setState({
          lot: lot,
          lotVisible: false,
          spotVisible: true
      });
  };

    render() {
    const whereActions = [
        <Button primary={true} onClick={this.handleNearDest} label="Nearest Destination" />,
        <Button secondary={false} style={{color: yellow200}} onClick={this.handleNearMe} label="Nearest Me" />
    ];

    const addrActions = [
      <Button primary={true} onClick={this.getAddr} label="Enter"/>
    ];

    const confirmAddr = [
      <Button primary={true} onClick={this.confirmAddr} label="Confirm"/>
    ];

    const muiTheme = getMuiTheme({
       palette: {
           primary1Color: red700,
           accent1Color: yellow200
       }
    });
    return (
      <MultiThemeProvider muiTheme={muiTheme}>
        <AppBar iconElementLeft={<div/>} title="PopCorn"/>
        <Dialog actions={whereActions} open={this.state.showWhere} title="Where"><h3>Where would you like to park?</h3></Dialog>
          <Dialog actions={addrActions} open={this.state.nearDestination} title="Enter an Address"><EnterAddress getData={this.getData}/></Dialog>
          <Dialog actions={confirmAddr} title="Address Confirm" open={this.state.addrConfrim}><h3>Is this the address of your destination?</h3><p>{this.state.originAddr.formatted_address}</p></Dialog>
          {this.state.lotVisible && <LotList coords={this.state.originCoords} visible={this.state.lotVisible} getLot={this.getLot}/>}
          {this.state.spotVisible && <SpotList visible={this.state.spotVisible} getSpot={this.getSpot} start={this.state.spotVisible} lot={this.state.lot}/>}
        <Modal getClose={this.getClose} open={this.state.showModal} spot={this.state.modalSpot}/>
      </MultiThemeProvider>
    );
  }
}

export default App;
