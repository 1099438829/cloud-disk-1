import React from 'react';
import {Popup} from 'Public'

export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sta: false
        }
    }

    colse = () => {
        console.log('a')
        this.setState({sta: false})
    }

    render() {
        const {sta} = this.state;
        return <div>
            this home

            <button onClick={()=>{this.setState({sta: true})}}>open</button>

            <h1>Home</h1>
            <h1>Home</h1>
            <h1>Home</h1>
            <h1>Home</h1>
            <h1>Home</h1>
            <h1>Home</h1>
            <h1>Home</h1>
            <h1>Home</h1>
            <h1>Home</h1>
            <h1>Home</h1>
            <h1>Home</h1>
            <h1>Home</h1>
            <h1>Home</h1>
            <h1>Home</h1>
            <h1>Home</h1>
            <h1>Home</h1>
            <h1>Home</h1>
            <h1>Home</h1>
            <h1>Home</h1>
            <h1>Home</h1>
            <h1>Home</h1>
            <h1>Home</h1>
            <h1>Home</h1>
            <h1>Home</h1>
            <h1>Home</h1>
            <h1>Home</h1>
            <h1>Home</h1>
            <h1>Home</h1>
            <h1>Home</h1>
            <h1>Home</h1>
            <h1>Home</h1>
            <h1>Home</h1>
            <h1>Home</h1>

            <Popup size={[200, 200]} sta={sta} title={'A'} close={this.colse}>

            </Popup>
        </div>;
    }
}