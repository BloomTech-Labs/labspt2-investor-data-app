import React from 'react'; 
import KeyIndicators from './KeyIndicators'
import LiveTicker from './LiveTicker'
import YourFavorites from './YourFavorites'
import Dashboard from '../Dashboard/index'

class KeyIndicatorPage extends React.Component{
    constructor(){
        super();
    }
    render(){
        return(
            <div>
                <KeyIndicators />
                <LiveTicker />
                <YourFavorites /> 
            </div> 
        )
    }
}

export default KeyIndicatorPage