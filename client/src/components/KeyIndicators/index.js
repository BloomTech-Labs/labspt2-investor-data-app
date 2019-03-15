import React from 'react'; 
import KeyIndicators from './KeyIndicators'
import LiveTicker from './LiveTicker'
import YourFavorites from './YourFavorites'
import '../Styles/KeyIndicators/index.css'
import Dashboard from '../Dashboard/index'

class KeyIndicatorPage extends React.Component{
    constructor(){
        super();
    }
    render(){
        return(
            <div className="page-container">
                <div className='dash'>
                   test a<br /> test b<br />test c<br /> 
                </div>
                <div className="fav-indicators"> 
                    <YourFavorites />
                    <KeyIndicators /> 
                </div> 
                <div className="live-ticker">  
                    <LiveTicker />
                </div> 
            </div> 
        )
    }
}

export default KeyIndicatorPage