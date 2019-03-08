import React from 'react'
import Navigation from '../Navigation/index'
import axios from 'axios'
import StockTicker from '../StockTicker/index.js'
import TickerBoard from '../StockTicker/tickerBoard'


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