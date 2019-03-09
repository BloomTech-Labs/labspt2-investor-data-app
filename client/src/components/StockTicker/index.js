import React from 'react';
import TickerBoard from './tickerBoard'
import axios from 'axios'

class StockTicker extends React.Component {
  constructor(props){
    super(props)
    this.state = {
         stocks: [],
         arr: []
    }
  }

  componentDidMount(){
    this.fetchStocks()
  }

  fetchStocks = () => {
    const item = 'AMZN'
    axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${item}&interval=5min&apikey=MRYZL6KHH9MMJYIF`)
      .then( response => {
         this.setState({
           stocks: response.data['Time Series (5min)']
         })
         console.log(this.state.stocks)
      })
      .catch( error => { console.log ( "we've encountered an error")})
  }

  //changeObj = (obj) => {
//
  //  const result = Object.keys(obj).map(function(key) {
  //    return [key, obj[key]];
  //  });
  //  
  //  let temp = result[0];  //this turns the big object into an array
  //  let a = temp[1];    // the second item of the array has the four values we need
  //  let b = a[ '1. open' ];   //just grabbing the first value, since the key has spaces we
  //  console.log("1. open:", b)      // have to use bracket notation
  //  let c = a[ '2. high' ];
  //  console.log("2. high:", c);
  //}
 
   
  render() { 
    const timestamp = Object.keys(this.state.stocks)[0]
    let cube = this.state.stocks[timestamp]
  
    setTimeout(() => {console.log(cube['1. open'])}, 6000)
    //this.changeObj(this.state.stocks)
    
    return (
      <div>  
        <div> 
          
          </div> 
        <TickerBoard  />
      </div> 
    );
  }
}

export default StockTicker
