import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList'
import request from 'request'
import './SpotList.css'

export default class SpotList extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            spots : [],
            currentCount: 10
        }
    }

    timer() {
        this.getSpots();
    }
    componentDidMount() {
        this.intervalId = setInterval(this.timer.bind(this), 1000);
    }
    componentWillUnmount(){
        clearInterval(this.intervalId);
    }

    getSpots = () => {
        let promise = new Promise((resolve, reject) => {
            request.get('http://popio.herokuapp.com/spots/all', (err, res, body) => {
                if(err){reject(err)}
                resolve(body);
            })
        });

        promise.then(data => {
            this.setState({
                spots: JSON.parse(data)
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
                textAlign: 'Center'
            },
        };


        return (
            <div className="SpotList">
                <GridList cellHeight={180} cols={5} padding={20} style={styles.gridList}>
                    {this.state.spots.map(spot => {
                        console.log(spot.taken);
                        return (
                            <GridTile className={spot.taken === false ? "taken" : 'notTaken'} cols={1} style={styles.gridTile}  key={spot.spot}>
                                <h2>{`${spot.spot}`}</h2>
                            </GridTile>);
                    })}
                </GridList>

            </div>
        );
    }
}