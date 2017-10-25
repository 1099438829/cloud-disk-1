import React from 'react';
import {Popup, Axios} from 'Public'

export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sta: false,
            index: 0,
            indexUrl: [],
            catalog: []
        }
    }

    componentWillMount() {
        const {index} = this.state;
        this.getCatalog(index)
    }

    getCatalog = (index, name) => {
        Axios.post('/api/catalog', {name: name}).then(ret => {
            this.setState({catalog: ret})
        })
    }

    open = (dat) => {
        let {index, indexUrl} = this.state;
        index++;
        indexUrl[index] = dat;
        this.setState({indexUrl: indexUrl, index: index})
        console.log(indexUrl.length);

        if (indexUrl.length) {
            dat = indexUrl.join("/");
            console.log(dat);
        }

        this.getCatalog(index, dat)
    }

    colse = () => {
        console.log('a')
        this.setState({sta: false})
    }

    render() {
        const {sta, catalog} = this.state;
        console.log();
        return <div>

            <ul>
                {catalog.map((item, i) => {
                    return <li onClick={this.open.bind(this, item)} key={i}>{item}</li>
                })}
            </ul>

            <button onClick={() => {
                this.setState({sta: true})
            }}>open
            </button>


            <Popup size={[200, 200]} sta={sta} title={'A'} close={this.colse}>

            </Popup>
        </div>;
    }
}