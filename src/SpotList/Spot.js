import React from 'react';
import {GridTile} from 'material-ui/GridList'

export default class Spot extends React.Component{

    handleClick = () => {
      this.props.getSpot(this.props.spot);
    };

    render(){

        const styles = {
            root: {
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
            },
            gridList: {
                width: 500,
                margin: 'auto',
            },

            gridTile :{
                color: 'white',
                fontSize: '44px',
                textAlign: 'Center'
            },
        };

        return (
            <GridTile onClick={this.handleClick} className={this.props.spot.taken === false ? "taken" : 'notTaken'} cols={1} style={styles.gridTile}>
                <h2>{`${this.props.spot.spot}`}</h2>
            </GridTile>
        );
    }
}