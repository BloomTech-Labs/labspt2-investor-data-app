import React from 'react'
import axios from 'axios'
import { PageLoading } from '../Styles/StockTicker/TickerBoard'
import '../Styles/KeyIndicators/LiveTicker.css'


class LiveTicker extends React.Component{
    constructor(){
        super();
        this.state = {
            timeStamp: {},
            companies: ['DJI', 'NDAQ', 'SPX', 'AAPL', 'AMZN'], // stock company symbols
            stocks: [],
        }
    }
      
    componentDidMount(){
        let promises = this.state.companies.map(company =>   // map that sends array of companies through axios to invoke external API
            axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${company}&interval=5min&apikey=ZV7Y9QKGXRHCY0A4`));
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
      
                    let data = result.data['Time Series (Daily)'] //Accesses correct object within API
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
      
    
    changePercent = (close, start) => {  // function for calculating the change of a stocks gain/loss by %
        let deduct = close - start
        let divide = deduct / start 
        let solution = divide * 100
            return solution.toFixed(2)
    }
    changePoints = (close, start) => {  // calculates the change of a stocks gain/loss by points
        let solution = close - start;
            if(solution > 0){
                return "+" + solution.toFixed(1)
            }
            return solution.toFixed(1)
    }

    decimalToFixed = ( input ) => {  // truncates the numbers following the decimal to two digits 
        input = parseFloat(input).toFixed(2)
            return input
    }

    shortenVolume = (num) => {  // Crunches the length of the volume into a smaller number while inserting a decimal point and character representing the amount
        let str,
            suffix = '';
        
        let decimalPlaces = 2 || 0;

        num = +num;
        
        let factor = Math.pow(10, decimalPlaces);
        
        if (num < 1000) {
            str = num;
        } else if (num < 1000000) {
            str = Math.floor(num / (1000 / factor)) / factor;
            suffix = 'K';
        } else if (num < 1000000000) {
            str = Math.floor(num / (1000000 / factor)) / factor;
            suffix = 'M';
        } else if (num < 1000000000000) {
            str = Math.floor(num / (1000000000 / factor)) / factor;
            suffix = 'B';
        } 
        return str + suffix;
        }
    

    render() {
        if(!this.state.stocks.length) {  // returns loading sign while data is being retrieved from API
            return <PageLoading>Loading Stocks...</PageLoading>
        }
    
        let rows = [];
        
        const open = '1. open'
        const close = '4. close'
        const volume = '5. volume'
    
        this.state.stocks.forEach( (stock, index) => {  // Loops through array of stock values and creates a table
            console.log(stock)
            rows.push(
                <div className='live-ticker-container' key={index}>    
                    <div className='stock-header'> 
                        <p>{stock.company}</p> 
                    </div> 
                    <br /> 
                    <div className='live-ticker-table'> 
                        <div className='table-column'> 
                            <p>Price: ${`${this.decimalToFixed(stock.values[close])}`}</p>
                            <p>volume: {`${this.shortenVolume(stock.values[volume])}`}</p> 
                        </div> 
                        <div className='table-column'> 
                            <p>Change: {`${this.changePoints(stock.values[close], stock.values[open])}`}</p>
                            <p>Change %: {`${this.changePercent(stock.values[close], stock.values[open])}`}</p>
                        </div> 
                    </div> 
                    <br />
                    <hr/> 
                </div>
            )
        });
    
        return (
            <div>  
                <div className='live-ticker-table'>
                    { rows }   
                </div>  
            </div> 
        )
    }
}

export default LiveTicker