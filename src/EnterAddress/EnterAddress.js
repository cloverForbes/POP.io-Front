import React from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import request from 'request';
const maps = require('@google/maps').createClient({
    key: 'AIzaSyADlOlEVyM4hPBDk61ckO4fRhcgnmaMOok'
});


const states = ['AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT', 'WA', 'WI', 'WV', 'WY'];

export default class EnterAddress extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            AdOne : '',
            AdTwo : '',
            City  : '',
            State : '',
            StateAd : '',
            Zip   : '',
        }
    }


    handleChangeAdOne  = (e,value) => {
      this.setState({AdOne: value})
    };


    handleChangeCity = (e,value) => {
        this.setState({City: value})
    };

    handleChangeState = (e,index, value) => {
        this.setState({State: value, StateAd: states[index]});
        this.getAddress();
    };



    getAddress = () => {
        maps.geocode({
            address: `${this.state.AdOne}, ${this.state.City}, ${this.state.State}`,
        }, (err, results) =>{
            if(err){console.log(err)}
            else{
                let addrObj = (results.json.results[0]);
                this.props.getData(addrObj);
            }
        })
    };

    render(){
        return(
            <div className="AddressField">
                <TextField onChange={this.handleChangeAdOne} floatingLabelText="Address Line One"/>
                <TextField onChange={this.handleChangeCity}  floatingLabelText="City"/>
                <SelectField
                    floatingLabelText="State"
                    value={this.state.State}
                    onChange={this.handleChangeState}
                >
                    {states.map( (item, key) => {
                        return <MenuItem key={key} value={key+1} primaryText={item} />
                    })}
                </SelectField>
            </div>
        );
    }
}