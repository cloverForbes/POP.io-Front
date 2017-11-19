import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList'
import request from 'request';
import Lot from "./Lot";

export default class LotList extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            lots : [],
        };

    }


    componentDidMount = () => {
        setTimeout(() => {
            this.getLots();
        }, 100)
    };

    getLots = () => {
        let promise = new Promise((resolve, reject) => {
                request.get(`http://popio.herokuapp.com/lots/all/${this.props.coords.latitude}/${this.props.coords.longitude}`, (err, res, body) => {
                    if(err){reject(err)}
                    resolve(body);
                })
        });

        promise.then(data => {
            console.log(JSON.parse(data));
            this.setState({
                lots: JSON.parse(data)
            })
        })
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
                textAlign: 'Center',
            },
        };


        return (
            <div style={{display: this.props.visible ? '' : 'none'}} className="LotList">
                <GridList cellHeight={180} cols={1} padding={80} style={styles.gridList}>
                    {this.state.lots.map(lot => {
                        return (
                            <div>
                                <Lot getLot={this.props.getLot} lot={lot}/>
                            </div>
                        );
                    })}
                </GridList>
            </div>
        );
    }
}