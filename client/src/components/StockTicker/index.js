import React from 'react'
import axios from 'axios'
import './tickerBoard.css'

class StockTicker extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      timeStamp: {},
      companies: ['DJI', 'NDAQ', 'SPX', 'AAPL', 'AMZN'], // stock company symbols
      stocks: [],
    }
  }

  componentDidMount(){
    let promises = this.state.companies.map(company =>   // map that sends array of companies through axios to invoke external API
      axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${company}&interval=5min&apikey=MRYZL6KHH9MMJYIF`));
    this.fetchStocks(promises)
  }

  fetchStocks = (promises) => {  // Receives array of companies and returns values of the stock symbols from the api 
    let stocks = []
    let timeStamp
    axios
      .all(promises)
      .then(results => {
        results.forEach(result => {  // loops through keys to access targeted values of stock(s)
        
          if (result.data.Note) {
            throw new Error()
          }

          let data = result.data['Time Series (5min)'] //Accesses correct object within API
          let timeStamps = Object.keys(data)
          let current = data[timeStamps[0]]
          timeStamp = timeStamps[0]  

          stocks.push({
            company: result.data['Meta Data']['2. Symbol'], // Collects stock symbol
            values: current
          })
        });

        this.setState({
          stocks,
          timeStamp
        });
      })
      .catch(error => {
        console.error('There was an error with the network requests', error)
      });
  }

  change = (close, start) => {  // function for calculating the change of a stocks gain/loss by %
    let deduct = close - start
    let divide = deduct / start
    let solution = divide * 100
      return solution.toFixed(3)
  }

  render() {
    if(!this.state.stocks.length) {  // returns loading sign while data is being retrieved from API
      return <div className="page-loading">Loading...</div>
    }

    let rows = [];

    const open = '1. open'
    const high = '2. high'
    const low = '3. low'
    const close = '4. close'

    this.state.stocks.forEach( (stock, index) => {  // Loops through array of stock values and creates a table
      console.log(stock)
      rows.push(
        <tr>     
          <td>{ stock.company }</td> 
          <td>{ stock.values[open] }</td>
          <td>{ stock.values[high] }</td>
          <td>{ stock.values[low] }</td>
          <td>{ stock.values[close] }</td>
          <td>{ `${this.change(stock.values[close], stock.values[open])}%` }</td>
        </tr>
      )
    });

    return (
      <div>  
        <div className='table'>
        <table className="container">
	        <thead>
		        <tr>
			        <th><h1>Company</h1></th>
			        <th><h1>Start</h1></th>
			        <th><h1>High</h1></th>
			        <th><h1>Low</h1></th>
              <th><h1>Close</h1></th>
              <th><h1>Change</h1></th> 
		        </tr>
	        </thead>
	        <tbody>
		        { rows }  
	        </tbody>
        </table>
        </div> 
      </div> 
    )
  }
}

export default StockTicker