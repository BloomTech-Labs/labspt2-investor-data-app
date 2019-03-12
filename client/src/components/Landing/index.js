import React from 'react'
import Navigation from '../Navigation/index'
import StockTicker from '../StockTicker/index.js'


class Landing extends React.Component {
  constructor(){
  super();
    }
    
    render(){
        return(
            <div>
                <Navigation /> 
                <StockTicker />   
            </div>
        )
    }
}


export default Landing