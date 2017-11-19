import React from 'react';
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/RaisedButton';
import request from 'request';
export default class Modal extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            open : this.props.open,
            confirmOpen : false
        }
    }

    handleClose = () => {
        this.setState({
            confirmOpen: false
        });
        this.props.getClose();
    };

    handleReserve = () => {
        this.setState({
            confirmOpen: true
        });

    };

    handleConfirm = () => {
        this.setState({
            confirmOpen: false
        });
        request.put(`http://popio.herokuapp.com/spots/${this.props.spot.lot}/${this.props.spot.spot}`, (err, res, body) => {
            console.log(err);
            console.log(body);
            this.props.getClose();
        });
    };

    render(){
        const actions = [
            <FlatButton disabled={this.props.spot.taken} onClick={this.handleReserve} primary={true} label="Reserve"/>,
            <FlatButton secondary={true} onClick={this.handleClose} label="Cancel" />
        ];

        const secondActions = [
            <FlatButton disabled={this.props.spot.taken} primary={true} onClick={this.handleConfirm} label="Reserve"/>,
            <FlatButton secondary={true} onClick={this.handleClose} label="Cancel" />
        ];
        return (
            <div className="Modal">
                <Dialog actions={actions} onRequestClose={this.handleClose} title={`Parking Spot ${this.props.spot.spot}`} modal={true} open={this.props.open}>
                    <div className={this.props.spot.taken === false ? "taken" : 'notTaken'} style={{margin: 'auto', width: '30%', height: '200px', textAlign: 'center', fontSize: '125px', color: 'white'}}>
                        <h2 style={{marginTop: '30px'}}>{this.props.spot.spot}</h2>
                    </div>
                    <Dialog title='Reserve' open={this.state.confirmOpen} actions={secondActions}>
                        <h4>Reserving this spot will cost you an extra $5, would you like to Continue? If Not Claimed in 60 Minutes it will reset</h4>
                    </Dialog>
                </Dialog>
            </div>
        );
    }
}