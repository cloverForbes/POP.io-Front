import React from 'react';
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/RaisedButton';
export default class Modal extends React.Component{
    render(){
        const actions = [
            <FlatButton primary={true} label="Reserve"/>
        ];
        return (
            <div className="Modal">
                <Dialog actions={actions} onRequestClose={this.handleClose} title={`Parking Spot ${this.props.spot.spot}`} modal={true} open={this.props.open}>
                    <div style={{margin: 'auto', backgroundColor: 'red', width: '30%', height: '200px', textAlign: 'center', fontSize: '125px', color: 'white'}}>
                        <h2 style={{marginTop: '30px'}}>{this.props.spot.spot}</h2>
                    </div>
                </Dialog>
            </div>
        );
    }
}